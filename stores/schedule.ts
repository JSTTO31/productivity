import type { TagType } from "./tag";
import type { userType } from "./user";


export type schedule = {
    _id?: string,
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

export type scheduleedit = {
    _id?: string,
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
    const schedules  = ref<schedule[]>([]);

    async function getAll(){
        try {
            const {data} = await useApiFetch('/schedules', {})

            if(data.value){
                //@ts-ignore
                const {schedules: schedulesData} = data.value 
                console.log(data.value);
                
                schedules.value = schedulesData
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function create(info: scheduleedit){
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

    return {schedules, getAll, create}
})