import useApiFetch from "~/composables/useApiFetch";

export type userType = {
    _id: String,
    name: String;
    email: String;
    createdAt: String;
    updatedAt: String
} 



export const useUserStore = defineStore('user', () => {
    const user = ref<userType | null>(null)

    async function checkUserIfAuthenticated(token: string){
        const headers = {
            Authorization: token
        }
        return await useApiFetch('/user', {
            headers
        })
    }

    async function login(credentials: {email: string, password: string}){
        return await useApiFetch('/login', {
            method: 'post',
            body: credentials,
            onResponse: (event) => {
                if(event.response.status == 200){
                    user.value = event.response._data.user
                    const userData = JSON.stringify(event.response._data)
                    localStorage.setItem("userData", userData)
                }
            }
        })
    }

    function logout(){
        localStorage.removeItem('userData')
        window.location.reload()    
    }


    return {
        login, checkUserIfAuthenticated, logout,
        user}
})