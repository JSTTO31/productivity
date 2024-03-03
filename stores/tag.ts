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


    return {tags, getAll}
})