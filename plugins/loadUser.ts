

export default defineNuxtPlugin(async () => {
    if(process.server) return
    
    await useApiFetch('/check', {
        onResponse: (event) => {
            const {user} = storeToRefs(useUserStore())
            user.value = event.response._data.user
        }
    })
})