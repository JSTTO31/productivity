

export type list = {
    id: number;
    title: string;
    date: string;
}


export type task = {
    id: number;
    title: string;
    lists: list[];
    show: boolean,
    date: string;
}



export const useTaskStore = defineStore('tasks', () => {
    const tasks  = ref<task[]>([]);

    return {tasks}
})