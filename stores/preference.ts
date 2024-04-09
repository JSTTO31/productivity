export const usePreferenceStore = defineStore('preference', () => {
    const preference = ref({
        theme: {
            background: 0,
            color: 'light'
        },
        hideBar: false,
        sounds: {
            all: {
                label: 'All sound',
                value: 100
            },
            theme: {
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
            celebration: {
                label: 'Celebration sound',
                value: 100
            },
        },
        notifications: {
            all: {
                label: 'Do not disturb',
                value: false
            },
            dailySpend: {
                label: 'Daily Spend Reminder',
                value: true
            },
            timeBreak: {
                label: 'Time Break Reminder',
                value: true
            },
            projectTaskNotification: {
                label: 'Project Task Notification',
                value: true
            },
            scheduleUpdates: {
                label: 'Schedule Updates',
                value: true
            },
        }
    })

    const {global} = useTheme()


    function setBackgroundColor(){
        switch(preference.value.theme.color){
            case 'system' : 
                const isDark = usePreferredDark()
                global.name.value = isDark ? 'dark' : 'light'
            break;
            default: 
                global.name.value = preference.value.theme.color
        }
    }



    
    return {preference, setBackgroundColor}
})