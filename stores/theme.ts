
export const themes = [
    {
        id: 1,
        label: 'Nature',
        color: 'white',
        icon: '/theme-icon/planet-earth.png',
        dark: false,
        backgrounds: [
            {
                path: '/theme-videos/nature-2.mp4',
            },
            {
                path: '/theme-videos/nature-2.mp4',
            },
            {
                path: '/theme-videos/nature-3.mp4',
            },
        ],
    },
    {
        id: 2,
        label: 'Starry Sky Break',
        color: 'green',
        icon: '/theme-icon/starry-night.png',
        dark: true,
        backgrounds: [
            {
                path: '/theme-videos/starry-night-2.mp4',
            },
            {
                path: '/theme-videos/starry-night-2.mp4',
            },
            {
                path: '/theme-videos/starry-night-3.mp4',
            },
        ],
    },
    {
        id: 3,
        label: 'Ocean Pause',
        color: 'blue',
        icon: '/theme-icon/water.png',
        dark: true,
        backgrounds: [
            {
                path: '/theme-videos/ocean-2.mp4',
            },
            {
                path: '/theme-videos/ocean-2.mp4',
            },
            {
                path: '/theme-videos/ocean-3.mp4',
            },
        ],
    },
    {
        id: 4,
        label: 'Zen Time',
        color: 'grey',
        icon: '/theme-icon/zen.png',
        dark: false,
        backgrounds: [
            {
                path: '/theme-videos/zen-1.mp4',
            },
            {
                path: '/theme-videos/zen-2.mp4',
            },
        ],
    },
    {
        id: 6,
        label: 'Gentle Rain Moment',
        color: 'blue-lighten-1',
        icon: '/theme-icon/storm.png',
        dark: true,
        backgrounds: [
            {
                path: '/theme-videos/rain-2.mp4',
            },
            {
                path: '/theme-videos/rain-2.mp4',
            },
            {
                path: '/theme-videos/rain-3.mp4',
            },
        ],
    },
    {
        id: 7,
        label: 'Bonfire',
        color: 'grey-darken-1',
        icon: '/theme-icon/bonfire.png',
        dark: true,
        backgrounds: [
            {
                path: '/theme-videos/bonfire-1.mp4',
            },
        ],
    },
    {
        id: 8,
        label: 'Lofi',
        color: 'orange',
        icon: '/theme-icon/tea-cup.png',
        dark: true,
        backgrounds: [
            {
                path: '/theme-videos/lofi-1.mp4',
            },
            {
                path: '/theme-videos/lofi-2.mp4',
            },
            {
                path: '/theme-videos/lofi-3.mp4',
            },
        ],
    },
    {
        id: 9,
        label: 'Animations',
        icon: '/theme-icon/ghost.png',
        dark: true,
        color: 'purple-lighten-3',
        backgrounds: [
            {
                path: '/theme-videos/anime-1.mp4',
            },
        ],
    },
    {
        id: 10,
        label: 'Snow',
        color: 'green',
        icon: '/theme-icon/snowman.png',
        dark: true,
        backgrounds: [
            {
                path: '/theme-videos/snow-1.mp4',
            },
            {
                path: '/theme-videos/snow-2.mp4',
            },
        ],
    },
]

export const useThemeStore = defineStore('theme', () => {
    const selectedTheme = ref(themes[0])
    const selectedBackground = ref(0)
    const selectedThemeDark = computed(() => selectedTheme.value?.dark || false)
    console.log(selectedThemeDark.value);
    
    return {selectedTheme, selectedBackground, selectedThemeDark}
})  


