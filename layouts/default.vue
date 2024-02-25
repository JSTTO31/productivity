<template>
    <v-app-bar style="padding-inline: 100px;" height="80" flat class=" bg-background" absolute>
      <!-- <v-avatar size="225">
        <v-img  src="/logo.png"></v-img>
      </v-avatar> -->
      <!-- <h1 class="font-weight-black text-decoration-underline"><span class="text-primary text-decoration-underline">Go</span>getters</h1> -->
      <AppLogo style="font-size: 28px;"></AppLogo>
      <v-spacer></v-spacer>
      <v-btn variant="plain" class="mx-1 text-capitalize" :to="{name: 'index'}">Home</v-btn>
      <v-btn variant="plain" class="mx-1 text-capitalize" :to="{name: 'features'}">Features</v-btn>
      <v-btn variant="plain" class="mx-1 text-capitalize" :to="{name: 'pricing'}">Pricing</v-btn>
      <v-btn variant="plain" class="mx-1 text-capitalize" :to="{name: 'testimonial'}">Testemonial</v-btn>
      <v-btn variant="plain" class="mx-1 text-capitalize" :to="{name: 'testimonial'}">FAQ</v-btn>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-weather-night" class="mr-10" @click="setColorMode"></v-btn>
      <client-only>
        <div v-if="!user">
          <v-btn class="text-capitalize mr-3 rounded-lg font-weight-bold" rounded="5" variant="elevated" @click="$router.push({name: 'auth-login'})" color="grey-darken-3">Login</v-btn>
          <v-btn class="text-capitalize mr-3 rounded-lg font-weight-bold" rounded="5" variant="elevated" @click="$router.push({name: 'auth-login'})" color="primary">Sign up</v-btn>
        </div>
        <div v-else>
          <v-btn color="primary" variant="elevated" class="text-capitalize rounded-lg font-weight-bold" @click="$router.push({name: 'r-new-member', params: {
            //@ts-ignore
            email: user.email
          }})">Let's go to work</v-btn>
          <v-btn color="grey-darken-3" variant="elevated" class="ml-2 text-capitalize rounded-lg font-weight-bold" @click="$user.logout">Logout</v-btn>
        </div>
      </client-only>
  </v-app-bar>
  <v-main style="padding-inline: 100px;">
      <slot></slot>
  </v-main>
  <span id="contact-staff" class="d-flex flex-column">
    <v-tooltip>
      <template #activator="{props}">
        <v-btn v-bind="props" color="info" icon="mdi-frequently-asked-questions" class="mb-5" size="large"></v-btn>
      </template>
      Frequent asked questions
    </v-tooltip>
    <v-btn color="secondary" icon="mdi-chat" size="large"></v-btn>
  </span>
</template>

<script setup lang="ts">
const $color = useColorStore()
const {name} = useTheme()
const $user = useUserStore()
const {user} = storeToRefs(useUserStore())
const app = ref(false)

function setColorMode(){
  if((name.value == 'system' || name.value == 'dark')){
    $color.setBackgroundColor('light')
  }else{
    $color.setBackgroundColor('dark')

  }
}

</script> 

<style scoped>
#contact-staff{
  position: fixed;
  bottom: 25px;
  right: 25px
}
</style>