<template>
    <!-- <video  id="video" style="width: 100vw;position: absolute;top: 0;left: 0;filter: brightness(90%)" muted :autoplay="false" :src="selectedTheme.backgrounds[selectedBackground].path" loop>
    </video> -->
    <div style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;filter: brightness(80%);background-color: #A9C9FF;
background-image: linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%);
;
;">
      
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