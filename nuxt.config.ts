// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    'vuetify-nuxt-module',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    "@nuxt/image"
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  app: {
    // pageTransition: {name: 'page', mode: 'out-in'}
  },
  routeRules: {
    
  },
  vuetify: {
    vuetifyOptions: {
      theme: { 
        defaultTheme: 'light',
        themes: {
          TwilightViolet: {
            colors: {
              primary: '#2D3250', 
              secondary: '#F6B17A',
              surface: '#424769', 
              background: '#FAFAFA',
            }
          },
          dark: {
            colors: {
              primary: '#6200EE',
              secondary: '#03DAC6',
              surface: '#212121'
            }
          },
          light: {
            colors: {
              // primary: 'purple',
              // background: '192655'
            }
          },
          PastelSerenity: {
            colors: {
              primary: '#92C7CF', 
              secondary: '#E5E1DA',
              surface: '#FBF9F1', 
              background: '#AAD7D9',
            }
          }, 
          EmeraldShores: {
            colors: {
              primary: '#071952', 
              secondary: '#F2F7A1',
              surface: '#35A29F', 
              background: '#088395',
            }
          }, 
          RusticElegance: {
            colors: {
              primary: '#43766C', 
              secondary: '#76453B',
              surface: '#B19470', 
              background: '#F8FAE5',
            }
          },
          MoonlitMist: {
            colors: {
              primary: '#161A30', 
              secondary: '#F0ECE5',
              surface: '#B6BBC4', 
              background: '#31304D',
            }
          }, 
          
          IvoryHarmony: {
            colors: {
              primary: '#C4DFDF', 
              secondary: '#F8F6F4',
              surface: '#E3F4F4', 
              background: '#D2E9E9',
            }
          }, 
        }
      }
    }
  },
})