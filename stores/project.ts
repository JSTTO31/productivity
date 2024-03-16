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
    _id: string,
    text: string,
    from: string,
    unsent: boolean,
    removeBy: string[],
    createdAt: string,
    updatedAt: string,
}

export type ProjectType = {
    _id: string,
    title: string, 
    icon: string,
    starred: boolean,
    tasks: Object[],
    members: MemberType[],
    messages: MessageType[],
    createdAt: string,
    updatedAt: string,
}

export const useProjectStore = defineStore('project', () => {
    const projects = ref<ProjectType[]>([])
    const project = ref<ProjectType | null>(null)
    const {user} = storeToRefs(useUserStore())
    const role = computed(() => !project.value ? null : project.value.members.find(item => item.user._id == user.value?._id)?.role)

    const $notification = useNotificationStore()

    async function getAll(){
        return await useApiFetch('/projects', {
            onRequestError: () => {
                console.log('get all projects error')
                const title = 'Request Error'
                const message = 'Oops! Something went wrong with your request. Please try again later.'
                $notification.add(title, message, 'error')
            },
            onResponse: (event) => {
                projects.value = event.response._data.projects
                if(projects.value.length > 0){
                    project.value = projects.value[0]
                }
            }
        })
    }

    async function store(){
        return await useApiFetch('/projects', {
            method: 'POST',
            body: {title: 'New Project'},
            onResponseError: (event) => {
                const title = 'Request Error'
                const message = 'Oops! Something went wrong with your request. Please try again later.'
                $notification.add(title, message, 'error')
            },
            onResponse(event){
                if(event.response.status != 200) return
                projects.value.unshift(event.response._data.project)
                $notification.addSnackbar('Project successfully added!')
            }
        })
    }

    async function findById(id: string){
        return await useApiFetch('/projects/' + id, {
            onResponseError(event){
                console.log("Error in find by id")
                console.log(event.error)
                const title = 'Request Error'
                const message = 'Oops! Something went wrong with your request. Please try again later.'
                $notification.add(title, message, 'error')
            },
            onResponse(event){
                if(event.response.status != 200) return

                if(event.response._data.project){
                    project.value = event.response._data.project
                }
            }
        })
    }

    async function update(project_id: string, title: string){
        return await useApiFetch('/projects/' + project_id, {
            method: 'PUT',
            body: {title},
            onResponseError(event) {
                if(event.response.status == 401){
                    const title = 'Unauthorize Action'
                    const message = 'You are not authorized to perform this action. Please contact your administrator for assistance.'
                    $notification.add(title, message, 'error')
                }else{
                    const title = 'Request Error'
                    const message = 'Oops! Something went wrong with your request. Please try again later.'
                    $notification.add(title, message, 'error')
                }
            }, 
            onResponse(event){
                if(event.response.status != 200) return
                if(event.response._data && event.response._data.project){
                    projects.value = projects.value.map(item => item._id == project_id ? event.response._data.project : item)
                    if(event.response._data.project._id == project.value?._id){
                        project.value = event.response._data.project
                    }
                }

                $notification.addSnackbar("Project succesfully update!")

            }
        })
    }

    async function remove(project_id: string){
        return await useApiFetch('/projects/' + project_id, {
            method: 'DELETE',
            onResponseError(event){
                if(event.response.status == 401){
                    const title = 'Unauthorize Action'
                    const message = 'You are not authorized to perform this action. Please contact your administrator for assistance.'
                    $notification.add(title, message, 'error')
                }else{
                    const title = 'Request Error'
                    const message = 'Oops! Something went wrong with your request. Please try again later.'
                    $notification.add(title, message, 'error')
                }
            },
            onResponse(event){
                if(event.response.status != 200) return
                projects.value = projects.value.filter(item => item._id != project_id)
                $notification.addSnackbar('Project successfully removed!')

            }
        })
    }

    async function leave(project_id: string){
        return await useApiFetch('/projects/' + project_id + '/leave', {
            method: 'delete',
            onResponseError(){
                const title = 'Request Error'
                const message = 'Oops! Something went wrong with your request. Please try again later.'
                $notification.add(title, message, 'error')
            },
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

    async function addMembers(project_id:string, members: {email: string, role: 'admin' | 'member'}[]){
        return await useApiFetch(`/projects/${project_id}/members`, {
            method: 'POST',
            body: {members},
            onRequestError(){
                const title = 'Request Error'
                const message = 'Oops! Something went wrong with your request. Please try again later.'
                $notification.add(title, message, 'error')
            },
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

    async function updateRoles(project_id: string, members: MemberType){
        return await useApiFetch(`/projects/${project_id}/members/edit/roles`, {
            method: 'PUT',
            body: {members},
            onRequestError(){
                const title = 'Request Error'
                const message = 'Oops! Something went wrong with your request. Please try again later.'
                $notification.add(title, message, 'error')
            },
            onResponse(event){
                if(event.response.status != 200) return
                const projectData = event.response._data.project
                projects.value = projects.value.map(item => item._id == projectData._id ? projectData : item)
                if(project.value && projectData._id == project.value._id){
                    project.value = projectData
                }

                $notification.addSnackbar("Member succesfully update!")

            }
        })
    }

    async function findMembers(project_id: string, email: string){
        return await useApiFetch(`/projects/${project_id}/find/members?email=` + email, {})
    }

    return {projects, project, role, getAll, store, findById, update, addMembers, findMembers, updateRoles, remove, leave}
})


