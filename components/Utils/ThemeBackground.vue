<template>
    <video  id="video" style="width: 100vw;position: absolute;top: 0;left: 0;"  muted :autoplay="true" v-if="selectedTheme.type == 'video'" :src="
    //@ts-ignore
    selectedTheme.backgrounds[0].path" 
    loop>
    </video>
    <div v-else style="width: 100vw;height: 100%;position: absolute;top: 0;left: 0;filter: brightness(90%)" :style="selectedTheme.backgroundColor">
    </div>
</template>

<script setup lang="ts">
import useThemeAndColor from '~/composables/useThemeAndColor';
const {themes} = useThemeAndColor 
const {preference} = storeToRefs(usePreferenceStore())
const selectedTheme = computed(() => themes[preference.value.theme.background || 0])

watch(() => [preference.value.sounds.theme.value, preference.value.sounds.all.value], () => {
  //@ts-ignore
  const video : HTMLVideoElement | null = document.getElementById('video')
  if(!video) return
  const themeSound = preference.value.sounds.theme.value
  const allSoundPercent = preference.value.sounds.all.value / 100
  const reduceThemeSoundByAllSound = themeSound * allSoundPercent
  video.muted = false
  video.volume = (reduceThemeSoundByAllSound / 100)
})


onMounted(() => {
  //@ts-ignore
  const video : HTMLVideoElement | null = document.getElementById('video')
  if(video){
    setTimeout(() => {
      document.onclick = () => {
        //@ts-ignore
        if(selectedTheme.type == 'video'){
          const themeSound = preference.value.sounds.theme.value
          const allSoundPercent = preference.value.sounds.all.value / 100
          const reduceThemeSoundByAllSound = themeSound * allSoundPercent
          video.muted = false
          video.volume = reduceThemeSoundByAllSound / 100
          video.play()
        }
        document.onclick = null
      }
    }, 1000);
  }
})
</script>

<style scoped>
#video{
  position: fixed;
}
</style>