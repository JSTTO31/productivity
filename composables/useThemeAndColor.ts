 const themes = [ 
    {
        id: 1,
        label: 'Nature',
        type: 'video',
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
        picture: '/screenshots/nature-2.jpg'
    },
    {
        id: 2,
        label: 'Starry Sky Break',
        type: 'video',
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
        picture: '/screenshots/starry-night-2.jpg'
    },
    {
        id: 3,
        label: 'Ocean Pause',
        type: 'video',
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
        picture: '/screenshots/ocean-2.jpg'
    },
    {
        id: 4,
        label: 'Zen Time',
        type: 'video',
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
        picture: '/screenshots/zen-1.jpg'
    },
    {
        id: 6,
        label: 'Gentle Rain Moment',
        type: 'video',
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
        picture: '/screenshots/rain-2.jpg'
    },
    {
        id: 7,
        label: 'Bonfire',
        type: 'video',
        color: 'grey-darken-1',
        icon: '/theme-icon/bonfire.png',
        dark: true,
        backgrounds: [
            {
                path: '/theme-videos/bonfire-1.mp4',
            },
        ],
        picture: '/screenshots/bonfire-1.jpg'
    },
    {
        id: 8,
        label: 'Lofi',
        type: 'video',
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
        picture: '/screenshots/lofi-1.jpg'
    },
    {
        id: 9,
        label: 'Animations',
        type: 'video',
        icon: '/theme-icon/ghost.png',
        dark: true,
        color: 'purple-lighten-3',
        backgrounds: [
            {
                path: '/theme-videos/anime-1.mp4',
            },
        ],
        picture: '/screenshots/anime-1.jpg'
    },
    {
        id: 10,
        label: 'Snow',
        type: 'video',
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
        picture: '/screenshots/snow-1.jpg'
    },
    {
        id: 11,
        type: 'color',
        dark: true,
        backgroundColor: 'background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
        id: 12,
        type: 'color',
        dark: true,
        backgroundColor: 'background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);',
    },
    {
        id: 13,
        type: 'color',
        dark: true,
        backgroundColor: 'background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);',
    },
    {
        id: 14,
        type: 'color',
        dark: true,
        backgroundColor: 'background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);',
    },
    {
        id: 15,
        type: 'color',
        dark: true,
        backgroundColor: 'background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);',
    },
    {
        id: 16,
        type: 'color',
        dark: true,
        backgroundColor: 'background-image: linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%);',
    },
    {
        id: 17,
        type: 'color',
        dark: true,
        backgroundColor: 'background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%);',
    },
    {
        id: 18,
        type: 'color',
        dark: true,
        backgroundColor: 'background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);',
    },
    {
        id: 19,
        type: 'color',
        dark: true,
        backgroundColor: 'background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);',
    },
    {
        id: 20,
        type: 'color',
        dark: true,
        backgroundColor: 'background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);',
    },
    {
        id: 21,
        type: 'color',
        dark: true,
        backgroundColor: 'background-image: linear-gradient( 135deg, #F97794 10%, #623AA2 100%);',
    },
]

 const colors = [
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

export default {colors, themes}