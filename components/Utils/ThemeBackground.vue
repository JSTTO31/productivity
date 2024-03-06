<template>
    <video  id="video" style="width: 100vw;position: absolute;top: 0;left: 0;filter: brightness(80%)" muted :autoplay="true" v-if="selectedTheme.type == 'video'" :src="
    //@ts-ignore
    selectedTheme.backgrounds[selectedBackground].path" 
    loop>
    </video>
    <div v-else style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;filter: brightness(80%);" :style="selectedTheme.backgroundColor">
      
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app';

const {selectedTheme, selectedBackground} = storeToRefs(useThemeStore())
const {sounds} = storeToRefs(useAppStore())

watch(sounds.value.theme, () => {
  //@ts-ignore
  const video : HTMLVideoElement | null = document.getElementById('video')
  if(!video)return
  video.volume = sounds.value.theme.value / 100
})


onMounted(() => {
  //@ts-ignore
  const video : HTMLVideoElement | null = document.getElementById('video')
  if(video){
    video.muted = false
    video.volume = sounds.value.theme.value / 100
    // document.addEventListener('visibilitychange', () => {
    //   if(document.visibilityState == 'hidden'){
    //     video.pause()
    //   }else{
    //     video.play()
    //   }
    // })
  }
})
</script>

<style scoped>
#video{
  position: fixed;
}
</style>