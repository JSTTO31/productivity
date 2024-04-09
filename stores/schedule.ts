import type { TagType } from "./tag";
import type { userType } from "./user";


export type ScheduleData = {
    _id: string,
    title: String,
    user: userType,
    // description: String,
    location: String,
    // attendees: String[],
    // pinned: boolean,
    recurrence: String,
    tags: TagType[],
    link: string,
    reminder: String,
    finished: boolean
    // visibility: String,
    startAt: Date,
    endAt: Date,
    assignee?: userType,
}

export type ScheduleForm = {
    title: String,
    // description: String,
    location: String,
    // attendees: String[],
    // pinned: boolean,
    recurrence: String,
    tags: String[],
    link: string,
    reminder: String,
    finished?: boolean,
    // visibility: String,
    startAt: Date,
    endAt: Date,
}

export const useScheduleStore = defineStore('schedule', () => {
    const schedules  = ref<ScheduleData[]>([]);
    const schedule  = ref<ScheduleData | null>(null);
    const $notification = useNotificationStore()

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
                    const notification = {
                        title: "Schedule Created",
                        message: "Your schedule has been successfully created! 🎉📅",
                        type: "success"
                      };
                      
                      
                    $notification.add(notification.title, notification.message, 'success')
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
                    const notification = {
                        title: "Schedule Updated",
                        message: "Your schedule has been successfully updated! 🔄📅",
                        type: "success"
                      };
                      
                      
                    $notification.add(notification.title, notification.message, 'success')
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
                    const notification = {
                        title: "Schedule Deleted",
                        message: "The schedule has been successfully deleted. 🗓️",
                        type: "success"
                      };
                     $notification.add(notification.title, notification.message, 'success')
                    
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
                    //@ts-ignore
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

    async function toggleFinished(id: string){
        const findSchedule = schedules.value.find(item => item._id == id)
        if(!findSchedule) return
        try {
            const response = await useApiFetch('/schedules/' + id, {
                method: 'PUT',
                body: {
                    ...findSchedule, finished: !findSchedule.finished
                },
                onResponse(e){
                    let notification = null
                    if(e.response._data.schedule.finished){
                         notification = {
                            title: "Schedule Completed",
                            message: "Your schedule has been successfully completed! ✅📅",
                            type: "success"
                        };

                        useConfetti()
                    }
                        notification = {
                        title: "Schedule Updated",
                        message: "Your schedule has been successfully updated! ✅📅",
                        type: "success"

                    };

                    $notification.add(notification.title, notification.message, 'success')
                    schedules.value = schedules.value.map(item => item._id == id ? e.response._data.schedule : item)

                    
                }
            })

            return response
        } catch (error) {
            console.log(error)
        }
    }

    async function recommendation(selected: number[]){
        return await useApiFetch('/schedules/recommendation', {
            method: 'POST',
            body: {
                selected
            },
        })
    }

    return {schedules, schedule, getAll, create, update, togglePinned, destroy, toggleFinished, recommendation}
})