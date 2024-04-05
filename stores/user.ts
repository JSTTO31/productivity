import useApiFetch from "~/composables/useApiFetch";

export type userType = {
    _id: String,
    name: String;
    email: String;
    picture: string;
    createdAt: String;
    updatedAt: String
} 



export const useUserStore = defineStore('user', () => {
    const user = ref<userType | null>(null)
    const token = ref<string | null>(null)

    async function checkUserIfAuthenticated(token: string){
        const headers = {
            Authorization: token
        }
        return await useApiFetch('/user', {
            headers
        })
    }

    async function checkUser(){
        return await useApiFetch('/check', {
            onResponse(event){
                user.value = event.response._data.user
            }
        })
    }

    async function login(credentials: {email: string, password: string}){
        return await useApiFetch('/login', {
            method: 'post',
            body: credentials,
            onResponse: (event) => {
                if(event.response.status == 200){
                    user.value = event.response._data.user
                }
            }
        })
    }

    async function register(information: {name: string, email: string, password: string, password_confirmation: string}){
        return await useApiFetch('/register', {
            method: 'POST',
            body: {...information},
            onResponse: (event) => {
                user.value = event.response._data.user
            }
        })
    }

    async function logout(){
        return await useApiFetch('/logout', {
            method: 'POST',
            onResponse(){
                location.reload()
            }
        })
    }

    async function getAll(query = ""){
        return await useApiFetch('/users?' + query, {})
    }


    return {
        login, checkUserIfAuthenticated, logout, checkUser, register, getAll,
        user, token}
})