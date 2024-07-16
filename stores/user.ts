import useApiFetch from "~/composables/useApiFetch";

export type PreferenceType = {
    theme: {
        background: number,
        color: String
    }
}

export type SessionTYpe = {
    _id: string,
    sessionId: string, 
    browser: {
        name: string,
        version: string,
        major: string,
    },
    engine: {
        name: string,
        version: string
    },
    os: {
        name: string,
        version: string
    },
    cpu: {
        architecture: string
    },
    current: Boolean,
    createdAt: String,
    updatedAt: string
}

export type GuideType = {
    tips: boolean,
    home: boolean,
    project: boolean,
    schedule: boolean,
    performance: boolean,
}

export type userType = {
    _id: String,
    name: String;
    email: String;
    picture: string;
    preference: PreferenceType,
    setup: Boolean,
    guide: GuideType,
    sessions: SessionTYpe[],
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
            headers,
        })
    }

    async function checkUser(){
        return await useApiFetch('/check', {
            onResponse(event){
                user.value = event.response._data.user
                if(!user.value) return
            }
        })
    }

    async function login(credentials: any){
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

    async function setupComplete(){
        return await useApiFetch('/users/setup', {
            method: 'POST',
            onResponse(){
                location.reload()
            }
        })
    }

    async function updatePreference(){
        if(!user.value) return 
        return await useApiFetch(`/users/preference`, {
            method: 'PUT',
            body: {preference: user.value.preference},
        })
    }

    async function updateInfo(name: string, email: string){
        return await useApiFetch(`/users/info`, {
            method: 'PUT',
            body: {
                name, 
                email
            },
            onResponseError(e){
                return e
            },
            onResponse(){
                if(!user.value) return
                user.value.name = name
                user.value.email = email
            }
        })  
    }

    async function changePassword(currentPassword: string, newPassword: string, confirmPassword: string){
        return await useApiFetch('/users/change-password', {
            method: 'PUT',
            body: {
                currentPassword, 
                newPassword,
                confirmPassword
            },
            onResponseError(e){
                return e
            },
            onResponse(){
                location.href = '/auth/login'           
            }
        })
    }

    async function logoutOtherSessions(){
        if(!user.value) return
        const current = user.value.sessions.find(item => item.current)
        if(!current) return
        //@ts-ignore
        return await useApiFetch(`/remove-other-sessions/${current._id}`, {
            method: 'POST',
            onResponse(){
                if(user.value)
                user.value.sessions = [current]
            }
        })
    }

    async function deleteAccount(){
        return await useApiFetch('/delete-account', {
            method: 'DELETE',
            onResponse(){
                location.href = '/auth/login'
            }
        })
    }

    async function updateGuide(){
        return await useApiFetch('/users/guide', {
            method: 'PUT',
            body: {guide: user.value?.guide}
        })
    }


    return {
        login, checkUserIfAuthenticated, logout, checkUser, register, getAll,setupComplete, updatePreference,updateInfo, changePassword, logoutOtherSessions, deleteAccount,updateGuide,
        user, token}
})