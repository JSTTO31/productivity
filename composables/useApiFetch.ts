import type { UseFetchOptions } from "nuxt/dist/app/composables"


export default (url: string, options: UseFetchOptions<ResponseType>) => {
    return useFetch('http://localhost:8000/api' + url, {
        watch: false,
        ...options
    })
}