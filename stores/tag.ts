import type { userType } from "./user"

export type TagType = {
    _id: string,
    label: string,
    type: String,
    color: string,
    owner: userType,
}

export const useTagStore = defineStore('tag', () => {
    const tags = ref<TagType[]>([])
    const {schedules} = storeToRefs(useScheduleStore()) 
    
    async function getAll(){
        if(tags.value.length > 0){
            return
        }
        try {
            const {data} = await useApiFetch('/tags', {})
            if(data.value){
                console.log(data.value);
                
                //@ts-ignore
                tags.value = data.value
            }
            
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function create(label: string){
        return await useApiFetch('/tags', {
            method: 'POST',
            body: {label,color: useColorGenerator() },
            onResponse(event){
                tags.value.push(event.response._data.tag)
            }
        })
    }

    async function destroy(id: string){
        return await useApiFetch('/tags/' + id, {
            method: 'delete',
            onResponse(){
                tags.value = tags.value.filter(item => item._id != id)
                schedules.value = schedules.value.map(item => ({...item, tags: item.tags.filter(tag => tag._id != id)}))
            }   
        })
    }


    return {tags, getAll, create, destroy}
})