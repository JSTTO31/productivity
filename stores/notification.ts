
export type NotificationType ={
    id: number,
    type: "info" | "error" | "success" | "warning" | undefined,
    title: string,
    message: string
}

export type SnackbarType = {
    id: number,
    message: string 
}

let id = 0
let snackid = 0

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref<NotificationType[]>([
    ])

    const snackbars = ref<SnackbarType[]>([])

    function add(title: string, message: string, type: "info" | "error" | "success" | "warning" | undefined){
        id++
        notifications.value.push({id, title, message, type})
    }

    function remove(id: number){
        notifications.value = notifications.value.filter(item => item.id != id)
    }

    function addSnackbar(message: string){
        snackbars.value = []
        snackid++
        snackbars.value.push({id: snackid, message})
    }

    return {notifications, snackbars, remove, add, addSnackbar}
})