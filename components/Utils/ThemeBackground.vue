<template>
    <v-card flat v-if="selectedTheme.type == 'video'" class="w-100 h-100" style="position: absolute;top: 0;left: 0">
        <div class="w-100" style="z-index: 100;">
          <video :id="'video' + selectedTheme.id.toString()" preload="true" class="w-100"  muted autoplay :src="
          //@ts-ignore
          selectedTheme.backgrounds[0].path" 
          :key="selectedTheme.id"
          loop>
          </video>
        </div>
        <div  v-if="!canStart" class="w-100" style="position: absolute;top: 0;left: 0%;z-index: 200;">
          <v-img class="w-100 h-100" style="filter: blur(2px) brightness(80%)"  :src="selectedTheme.picture"></v-img>
          <v-progress-circular color="white" size="100" indeterminate style="position: absolute;top: 50%;left: 50%;transform:translate(-50%, -50%)"></v-progress-circular>
        </div>
    </v-card>
    <div v-else style="width: 100vw;height: 100%;position: absolute;top: 0;left: 0;filter: brightness(90%)" :style="selectedTheme.backgroundColor">
    </div>
</template>

<script setup lang="ts">
import useThemeAndColor from '~/composables/useThemeAndColor';
const {themes} = useThemeAndColor 
const {preference} = storeToRefs(usePreferenceStore())
const selectedTheme = computed(() => themes[preference.value.theme.background || 0])
const $notification = useNotificationStore()
watch(() => [preference.value.sounds.theme.value, preference.value.sounds.all.value], () => {
  //@ts-ignore
  const video : HTMLVideoElement | null = document.getElementById('video' + selectedTheme.value.id.toString())
  if(!video) return
  const themeSound = preference.value.sounds.theme.value
  const allSoundPercent = preference.value.sounds.all.value / 100
  const reduceThemeSoundByAllSound = themeSound * allSoundPercent
  video.muted = false
  video.volume = (reduceThemeSoundByAllSound / 100)
})

const canStart = ref(false)

onMounted(() => {
  //@ts-ignore
  const video : HTMLVideoElement | null = document.getElementById('video' + selectedTheme.value.id.toString())

  if(video){
    const loaded = sessionStorage.getItem('video.' + selectedTheme.value.id)

    if(loaded && loaded == 'loaded'){
      canStart.value = true
    }


    video.addEventListener("canplay", function() {
      sessionStorage.setItem('video.' + selectedTheme.value.id, 'loaded')
      canStart.value = true
      
    });
    // Video can start playing
    video.addEventListener("loadeddata", function() {
      sessionStorage.setItem('video.' + selectedTheme.value.id, 'loaded')

      canStart.value = true
    });


    setTimeout(() => {
      document.onclick = () => {
        //@ts-ignore
        if(selectedTheme.value.type == 'video' && video){
          const themeSound = preference.value.sounds.theme.value
          const allSoundPercent = preference.value.sounds.all.value / 100
          const reduceThemeSoundByAllSound = themeSound * allSoundPercent
          video.muted = false
          video.volume = reduceThemeSoundByAllSound / 100
          video.play()
          canStart.value = true
        }
        document.onclick = null
      }
    }, 1000);
  }
})
</script>

<style scoped>
</style>