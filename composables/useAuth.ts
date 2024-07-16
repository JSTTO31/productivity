import {required, email} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'

export default function useAuth(){
    const $user = useUserStore()
    const credentials = reactive({
        // email: 'joshuasotto@example.example',
        // password: 'joshuasotto'
        email: 'demo@efficiently.com',
        password: '12345678'
    })
    const loading = ref(false)

    const rules = {
        email: {required, email},
        password: {required}
    }

    const $externalResults = ref({})

    const $v = useVuelidate(rules, credentials, {$externalResults})

    watch(() => [credentials.password, credentials.email], () => {
        $externalResults.value = {}
    })

    async function submit(){
        
        if(!await $v.value.$validate()) return 
        
        try {
            loading.value = true
            const {error, status} = await $user.login(credentials)
            loading.value = false
            
            if(error.value && error.value.data.errors){
                $externalResults.value = error.value.data.errors.reduce((container: any, error: any) => {
                    if(!container[error.path]){
                        container[error.path] = []
                    }

                    container[error.path].push(error.msg)

                    return container
                },[])
            }
            
            if(error.value && error.value.statusCode == 401){
                
                $externalResults.value = {
                    email: ['The credentials is incorrect, please try again!'],
                    password: ['']
                }
            }

            if(status.value == 'success'){
                location.href = "/r/access/home"
            }


        } catch (error) {
            console.log(error);
        }
    }

    return {$v, credentials, submit, loading}
}