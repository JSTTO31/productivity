import { useUserStore, type userType } from "~/stores/user"

export default defineNuxtPlugin(async () => {
    if(process.client){
        const $user = useUserStore()
        const userData = localStorage.getItem('userData')
        if(userData){
            const {token, user} = JSON.parse(userData)
            const {user: userStore, token: tokenStore} = storeToRefs($user)
            userStore.value = user
            tokenStore.value = token
        }
    }
})