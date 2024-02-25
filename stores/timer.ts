

export const useTimerStore = defineStore('timer', () => {
    const showBreakNotification = ref(false)
    const number_of_session = ref(1)
    const remaining_session = ref(0)
    const duration = ref(30)
    const start_session = ref(false)
    const is_break = ref(false)
    const progress = computed(() => (number_of_session.value - remaining_session.value) / number_of_session.value * 100) 
    const showAlert = ref(false)
    
    let interval : NodeJS.Timeout | null = null
    let timeout : NodeJS.Timeout | null = null


    function setAlert(){
        showAlert.value = false
        if(timeout) clearTimeout(timeout)
        // 5 minutes before it buzz
        timeout = setTimeout(() => showAlert.value = true, 1000 * 20)
    }

    function unsetAlert(){
        if(timeout) clearTimeout(timeout)
        showAlert.value = false
    }

    const timer = () => {
        duration.value -= 1
        if(duration.value < 1){
            if(!is_break.value){
                breakfn()
            }else{
                afterBreak()
            }
        }
    }

    const start = () => {
        start_session.value = true
        duration.value = 25
        remaining_session.value = number_of_session.value
        interval = setInterval(timer, 1000)
        setAlert()
    }

    const stop = () => {
        duration.value = 30
        start_session.value = false
        remaining_session.value = 0
        if(interval){
            clearInterval(interval)
        }
        unsetAlert()
    }

    const afterBreak = () => {
        is_break.value = false
        duration.value = 25
        remaining_session.value -= 1
        if(remaining_session.value < 1){
            stop()
            return
        }
        
        if(Notification.permission === 'granted' && document.visibilityState == 'hidden'){
            const body = "Break time's up! ⏰ Take a deep breath, stretch a little, and get ready to dive back into productivity. You got this!"
            const icon = '/logo1.png'
            const notification = new Notification("End of 5-Minute break", {
              body, icon
            })
        }
        setAlert()
    }

    const breakfn = () => {
        is_break.value = true;
        duration.value = 5;
        showBreakNotification.value = true
        unsetAlert()
    }


    return {progress, number_of_session, remaining_session, is_break, timer, start, stop, afterBreak, start_session, duration, showAlert, setAlert}
})