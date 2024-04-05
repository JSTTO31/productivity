

export type TimeSpentType = {
    _id: string,
    user: string,
    spent: number
}

export const useTimeSpentStore = defineStore('time-spent', () => {
    const timestamp = ref(new Date())
    const todayTimeSpent = ref<TimeSpentType | null>(null)
    const total = ref(0)
    const hours = computed(() => Math.floor(total.value / (1000 * 60 * 60)))
    const minutes = computed(() => Math.floor(total.value / (1000 * 60) % 60))
    
    async function getTimeSpent(){
        return await useApiFetch('/time-spents', {
            onResponse(e){
                const {total:total_data, todayTimeSpent: todayTimeSpent_data} = e.response._data
                total.value = total_data
                todayTimeSpent.value = todayTimeSpent_data
            }
        })
    }

    async function update(){
        if(!todayTimeSpent.value) return
        const currentDate = new Date()
        //@ts-ignore
        const difference = currentDate - timestamp.value
        todayTimeSpent.value.spent += difference
        total.value += difference
        timestamp.value = currentDate
        return await useApiFetch('/time-spents/' + todayTimeSpent.value._id, {
            method: "PUT",
            body: {
                spent: todayTimeSpent.value.spent,
            },
            onResponse(){

            }
        })
    }

    

    return {todayTimeSpent, total, hours, minutes, getTimeSpent, update}
})