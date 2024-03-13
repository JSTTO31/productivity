
export const colors = [
    {
        label: 'System', 
        value: 'system'
    },
    {
        label: 'Light', 
        value: 'light'
    },
    {
        label: 'Dark', 
        value: 'dark'
    },
    {
        label: 'Twilight Violet', 
        value: 'TwilightViolet'
    },
    {
        label: 'Pastel Serenity', 
        value: 'PastelSerenity'
    },
    {
        label: 'Emerald Shores', 
        value: 'EmeraldShores'
    },
    {
        label: 'Rustic Elegance', 
        value: 'RusticElegance'
    },
    {
        label: 'Moonlit Mist', 
        value: 'MoonlitMist'
    },
    {
        label: 'Ivory Harmony', 
        value: 'IvoryHarmony'
    }
]

export const useColorStore = defineStore('color', () => {
    const selectedBackgroundColor = ref("light")
    const {global} = useTheme()
    const preferredColor = usePreferredColorScheme()

    function setBackgroundColor(value: string){
        switch(value){
            case 'system' : 
                global.name.value = preferredColor.value
            break;
            default: 
                global.name.value = value
        }
    }

    return {selectedBackgroundColor, setBackgroundColor}
})