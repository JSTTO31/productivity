import type { UseFetchOptions } from "nuxt/dist/app/composables"


export default (url: string, options: UseFetchOptions<ResponseType>) => {
    let mainOptions = Object.assign({}, options)
    const userData = localStorage.getItem('userData')
    
    if(userData){
        const {token} = JSON.parse(userData)
        mainOptions = {...mainOptions, headers: {
            ...mainOptions.headers,
            Authorization: token
        }}
    }

    
    return useFetch('http://localhost:8000/api' + url, {
        watch: false,
        ...mainOptions,
    })
}