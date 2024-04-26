import useTempID from "~/composables/useTempID"
import { useNotificationStore } from "./notification"
import type { userType } from "./user"


export type MemberType = {
    _id: string,
    user: userType,
    role: 'admin' | 'member' | 'owner',
    createdAt?: string,
    updatedAt?: string,
}

export type MessageType = {
    _id?: string,
    text: string,
    from: userType,
    unsent: boolean,
    removedBy: userType[] | string[],
    createdAt: string,
    updatedAt: string,
}

export type NoteType = {
    _id?: string,
    tempId?: string,
    text: string,
    from: userType,
    createdAt?: string,
    updatedAt?: string,
}

export type AttachmentType = {
    _id: string,
    fieldname: string,
    originalname:  string,
    encoding: string,
    mimetype:  string,
    destination:  string,
    filename:  string,
    path: string,
    size:  number,
    link:  string,
    author: string
}

export type TaskType = {
    _id?: string,
    tempId?: string,
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    assignees: userType[],
    watchBy: string[],
    notes: NoteType[],
    attachments: AttachmentType[]
    completed: boolean,
    createdAt?: string,
    updatedAt?: string,
}

export type SectionType = {
    _id?: string,
    tempId?: string,
    title: string,
    tasks: TaskType[],
    order: number,
    createdAt?: string,
    updatedAt?: string,
}

export type ProjectType = {
    _id: string,
    title: string, 
    icon: string,
    starred: boolean,
    members: MemberType[],
    messages: MessageType[],
    sections: SectionType[],
    createdAt: string,
    updatedAt: string,
    dontUpdate?: boolean
}

export const useProjectStore = defineStore('project', () => {
    const projects = ref<ProjectType[]>([])
    const project = ref<ProjectType | null>(null)
    const {user} = storeToRefs(useUserStore())
    const role = computed(() => !project.value ? null : project.value.members.find(item => item.user._id == user.value?._id)?.role)
    const {project: projectRemoveReactive} = useRemoveReactivity
    const $notification = useNotificationStore()
    const sectionSort = ref<null | 'desc' | 'asc'>(null)
    const sectionFilter = reactive({
        search: '',
        priority: ['low', 'medium', 'high'],
        watch: ['watching', 'unwatching'],
        complete: ['completed', 'incomplete'],
        sections: project.value?.sections.map(item => item._id || item.tempId) || []
    })

    watch(() => project.value?._id || null, (current) => {
        sectionFilter.sections = project.value?.sections.map(item => item._id || item.tempId) || []
    })


    async function getAll(){
        return await useApiFetch('/projects', {
            onResponse: (event) => {
                projects.value = event.response._data.projects
            }
        })
    }

    async function store(name = 'New Project'){
        return await useApiFetch('/projects', {
            method: 'POST',
            body: {title: name},
            onResponse(event){
                if(event.response.status != 200) return
                projects.value.unshift(event.response._data.project)
                $notification.addSnackbar('Project successfully added!')
                return event
            }
        })
    }

    async function findById(id: string){
        const findProject = projects.value.find(item => item._id == id)
        if(findProject) return new Promise((resolve) : void=> {
            project.value = projectRemoveReactive(findProject)
            //@ts-ignore
            resolve()
        })


        return await useApiFetch('/projects/' + id, {
            onResponse(event){
                if(event.response.status != 200) return

                if(event.response._data.project){
                    project.value = event.response._data.project
                }
            }
        })
    }

    async function update(){
        const findOldProject = projects.value.find(item => item._id == project.value?._id) as ProjectType
        const oldProject = projectRemoveReactive(findOldProject)
        const newProject = projectRemoveReactive(project.value as ProjectType)
        
        if(!oldProject._id || !newProject?._id || JSON.stringify(oldProject) == JSON.stringify(newProject)){
            return
        }

    
        return await useApiFetch('/projects/' + newProject._id, {
            method: 'PUT',
            body: {...project.value},
            onResponseError(event){
                const $notification = useNotificationStore()
                if(event.response.status == 401){
                    const title = 'Unauthorize Action'
                    const message = 'You are not authorized to perform this action. Please contact your administrator for assistance.'
                    $notification.add(title, message, 'error')
                }else{
                    const title = 'Request Error'
                    const message = 'Oops! Something went wrong with your request. Please try again later.'
                    $notification.add(title, message, 'error')
                }

                projects.value = projects.value.map(item => item._id == oldProject._id ? oldProject : item)
                project.value = projectRemoveReactive(oldProject)
            },
            onResponse(event){
                if(event.response.status != 200) return
                const projectData = event.response._data.project
                projects.value = projects.value.map(item => item._id == projectData._id ? projectRemoveReactive(projectData) : item)
                project.value = projectRemoveReactive(projectData)

            }
        })
    }

    async function updateById(project_id: string, body: {title: string}){
        if(project.value?._id == project_id){
            project.value.title = body.title
            return
        }

        const findProject = projects.value.find(item => item._id == project_id)
        if(!findProject) return
        findProject.title = body.title
        return await useApiFetch('/projects/' + project_id, {
            body: {...findProject},
            method: 'PUT',
            onResponse(event){
                if(event.response.status == 401) return;
                const projectData = event.response._data.project
                projects.value = projects.value.map(item => item._id == project_id ? projectData : item)
                if(project.value?._id == project_id) project.value = projectData
            }
        })
    }

    async function remove(project_id: string){
        return await useApiFetch('/projects/' + project_id, {
            method: 'DELETE',
            onResponse(event){
                if(event.response.status != 200) return
                projects.value = projects.value.filter(item => item._id != project_id)
                $notification.addSnackbar('Project successfully removed!')
                if(project.value?._id == project_id) project.value = null

            }
        })
    }

    async function leave(project_id: string){
        return await useApiFetch('/projects/' + project_id + '/leave', {
            method: 'delete',

            onResponse(event){
                if(event.response.status != 200) return
                projects.value = projects.value.filter(item => item._id != project_id)
                if(project.value?._id == project_id){
                    project.value = null
                }
                $notification.addSnackbar('Project leave successfully') 
            }
        })
    }

    async function addMembers(project_id:string, members: MemberType[]){
        return await useApiFetch(`/projects/${project_id}/members`, {
            method: 'POST',
            body: {members: members.map(item => ({email: item.user.email, role: item.role, }))},
            onResponse(event){
                if(event.response.status != 200) return
                const projectData = event.response._data.project
                if(projectData){
                    projects.value = projects.value.map(item => item._id == projectData._id ? projectData : item)
                    if(project.value?._id == projectData._id){
                        project.value = projectData
                    }
                    if(members.length > 1){
                        $notification.addSnackbar('Members Added Successfully')
                    }else{
                        $notification.addSnackbar('Member Added Successfully')
                    }
                    
                }
            }
        })
    }

    async function updateMembers(project_id: string, members: MemberType){
        const findProject = projects.value.find(item => item._id == project_id)

        if(!findProject)return

        return await useApiFetch(`/projects/${project_id}`, {
            method: 'PUT',
            body: {...findProject, members},
            onResponse(event){
                if(event.response.status != 200) return
                const projectData = event.response._data.project
                projects.value = projects.value.map(item => item._id == projectData._id ? projectData : item)
                if(project.value && projectData._id == project.value._id){
                    project.value = projectRemoveReactive(projectData)
                }

                $notification.addSnackbar("Member succesfully update!")

            }
        })
    }

    async function findMembers(project_id: string, email: string){
        return await useApiFetch(`/projects/${project_id}/find/members?email=` + email, {})
    }

    async function sendMessage(project_id: string, text: string){
        return await useApiFetch(`/projects/${project_id}/messages`, {
            method: 'POST',
            body: {text},
            onResponse(event){
                if(event.response.status == 401 || event.response.status == 500) return
                const message = event.response._data.message
                projects.value = projects.value.map(item => item._id == project_id ? {...item, messages: [...item.messages, message]} : item)
                
                if(project_id == project.value?._id){
                    project.value.messages.push(message)
                }
            }
        })
    }

    async function removeMessage(project_id: string, message_id: string){
        return await useApiFetch(`/projects/${project_id}/messages/${message_id}/remove`, {
            method: 'PUT',
            onResponse(event){
                if(event.response.status == 401 || event.response.status == 500) return
                //@ts-ignore
                projects.value = projects.value.map(item => item._id == project_id ? {...item, messages: item.messages.filter(item => item._id != message_id)} : item )
                
                if(project_id == project.value?._id){
                    //@ts-ignore
                    project.value.messages  = project.value.messages.filter(item => item._id != message_id)
                }
            }
        })
    }

    async function unsentMessage(project_id: string, message_id: string){
        return await useApiFetch(`/projects/${project_id}/messages/${message_id}/unsent`, {
            method: 'PUT',
            onResponse(event){
                if(event.response.status == 401 || event.response.status == 500) return
                //@ts-ignore
                projects.value = projects.value.map(item => item._id == project_id ? {...item, messages: item.messages.map(item => item._id == message_id ? {...item, unsent: true} : item)} : item )
                
                if(project_id == project.value?._id){
                    //@ts-ignore
                    project.value.messages  = project.value.messages.map(item => item._id == message_id ? {...item, unsent: true} : item)
                }
            }
        })
    }

    async function getMessages(project_id: string){
        return await useApiFetch(`/projects/${project_id}/messages`, {
            onResponse(event){
                if(event.response.status == 401) return
                const messages = event.response._data.messages;
                projects.value = projects.value.map(item => item._id == project_id ? {...item, messages} : item)
                if(project_id == project.value?._id){
                    project.value.messages = messages
                }
            }
        })
    }

    async function addAttachment(project_id: string, section_id: string, task_id: string, file: Blob){
        const form = new FormData()
        form.append('attachment', file)
        return useApiFetch(`/projects/${project_id}/sections/${section_id}/tasks/${task_id}/attachments`, {
            method: 'post',
            body: form,
            onResponse(event){
                const projectData = event.response._data.project
                console.log(projectData);
                
                if(projectData){
                    projects.value = projects.value.map(item => item._id == projectData._id ? projectData : item)
                    project.value = projectRemoveReactive(projectData)
                }
                return event
            }   
        })
    }

    return {projects, project, role, sectionFilter, sectionSort, getAll, store, findById, update, addMembers, findMembers, updateMembers, remove, leave, sendMessage, getMessages, removeMessage, unsentMessage, updateById, addAttachment}
})


