import type { TagType } from "./tag";
import type { userType } from "./user";


export type ScheduleData = {
    _id: string,
    title: String,
    description: String,
    location: String,
    attendees: String[],
    pinned: boolean,
    recurrence: String,
    tags: TagType[],
    reminder: String,
    visibility: String,
    startAt: Date,
    endAt: Date,
    assignee?: userType,
}

export type ScheduleForm = {
    title: String,
    description: String,
    location: String,
    attendees: String[],
    pinned: boolean,
    recurrence: String,
    tags: String[],
    reminder: String,
    visibility: String,
    startAt: Date,
    endAt: Date,
}

export const useScheduleStore = defineStore('schedule', () => {
    const schedules  = ref<ScheduleData[]>([]);
    const schedule  = ref<ScheduleData | null>(null);

    async function getAll(){
        try {
            const {data} = await useApiFetch('/schedules', {})

            if(data.value){
                //@ts-ignore
                const {schedules: schedulesData} = data.value 
                schedules.value = schedulesData
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function create(info: ScheduleForm){
        try {
            const response = await useApiFetch('/schedules', {
                method: 'POST',
                body: {
                    ...info
                },
                onResponse(e){
                    schedules.value.push(e.response._data.schedule)
                }
            })

            return response
        } catch (error) {
            console.log(error)
        }
    }

    async function update(id: string, info: ScheduleForm){
        try {
            const response = await useApiFetch('/schedules/' + id, {
                method: 'PUT',
                body: {
                    ...info
                },
                onResponse(e){
                    schedules.value = schedules.value.map(item => item._id == id ? e.response._data.schedule : item)
                    
                }
            })

            return response
        } catch (error) {
            console.log(error)
        }
    }

    async function destroy(id: string){
        try {
            const response = await useApiFetch('/schedules/' + id, {
                method: 'DELETE',
                onResponse(e){
                    schedules.value = schedules.value.filter(item => item._id == id ? e.response._data.schedule : item)
                }
            })

            return response
        } catch (error) {
            console.log(error)
        }
    }

    async function togglePinned(id: string){
        const schedule = schedules.value.find(item => item._id == id)
        try {
            const response = await useApiFetch('/schedules/' + id, {
                method: 'PUT',
                body: {
                    ...schedule,
                    pinned: !schedule?.pinned
                },
                onResponse(e){
                    schedules.value = schedules.value.map(item => item._id == id ? e.response._data.schedule : item)
                    
                }
            })

            return response
        } catch (error) {
            console.log(error)
        }
    }

    return {schedules, schedule, getAll, create, update, togglePinned, destroy}
})