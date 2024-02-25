import {required, email} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'

export default function useAuth(){
    const $user = useUserStore()
    const credentials = reactive({
        email: 'joshuasotto@example.example',
        password: 'joshuasotto'
    })

    const rules = {
        email: {required, email},
        password: {required}
    }

    const $externalResults = ref({})

    const $v = useVuelidate(rules, credentials, {$externalResults})

    async function submit(){
        
        if(!await $v.value.$validate()) return 
        
        try {
            const {error} = await $user.login(credentials)
            if(error){
                $externalResults.value = error.value?.data.errors || {}
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {$v, credentials, submit}
}