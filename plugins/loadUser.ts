import { useUserStore, type userType } from "~/stores/user"

export default defineNuxtPlugin(async () => {
    if(process.client){
        const $user = useUserStore()
        const userData = localStorage.getItem('userData')
        if(userData){
            const {token, user} = JSON.parse(userData)
            $user.checkUserIfAuthenticated(token).then((res) => {
                if(res.error.value && res.error.value.statusCode == 401){
                    localStorage.removeItem('userData')
                }else{
                    const {user: userStore} = storeToRefs($user)
                    userStore.value = user
                }
            })
        }
    }
})