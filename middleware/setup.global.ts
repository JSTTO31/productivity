

export default defineNuxtRouteMiddleware((to, from) => {
    if(process.client){
        const {user} = storeToRefs(useUserStore())
        if(user.value && !user.value.setup && !to.name?.toString().includes('setting-up')){
            return navigateTo('/setting-up')
        }

        if(user.value && user.value.setup && to.name?.toString().includes('setting-up')){
            return navigateTo('/r/access/home')
        }

        if(!user.value && to.name?.toString().includes('setting-up')){
            return navigateTo('/')
        }   
    }
})