

export const useSoundStore = defineStore('sound', () => {
    const sounds = reactive(
        {theme: {
            label: 'Theme sound',
            value: 50
        },
        clock: {
            label: 'Clock sound',
            value: 75
        },
        alarm: {
            label: 'Alarm noise',
            value: 100
        },
        media: {
            label: 'Music sound', 
            value: 100
        }}
    )


    return {sounds}
})