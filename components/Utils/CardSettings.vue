<template>
    <utils-card ref="el" :show-card="showSettings" title="Settings" :width="width" :height="height" icon="mdi-cog"
        key="media" @close="emits('update:showSettings', false)" @minimize="emits('update:showSettings', false)">
        <template #default="props">
            <v-layout class="h-100 pa-0" fluid>
                <v-navigation-drawer :rail="rail" width="300">
                    <v-list class="h-100" nav>
                        <v-list-item @click="selected = 0" :active="selected == 0" class="text-capitalize " prepend-icon="mdi-account-outline">
                            <span v-if="!rail">Profile
                                </span>
                        </v-list-item>
                        <v-list-item @click="selected = 1" :active="selected == 1" class="text-capitalize " prepend-icon="mdi-palette-outline">
                            <span v-if="!rail">Theme & Appearance
                                </span>
                        </v-list-item>
                        <v-list-item @click="selected = 2" :active="selected == 2" class="text-capitalize " prepend-icon="mdi-tune-vertical">
                            <span v-if="!rail">Sound settings
                                </span>
                        </v-list-item>
                        <v-list-item @click="selected = 3" :active="selected == 3" class="text-capitalize " prepend-icon="mdi-bell">
                            <span v-if="!rail">Notification Preferences
                                </span>
                        </v-list-item>
                        <v-list-item  @click="selected = 4" :active="selected == 4" class="text-capitalize " prepend-icon="mdi-lock-outline">
                            <span v-if="!rail">Privacy & Security
                                </span>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
                <v-main style="overflow-y: auto;" id="profile-main">
                    <utils-settings-profile-information v-if="selected == 0"></utils-settings-profile-information>
                    <utils-settings-preference v-else-if="selected == 1"></utils-settings-preference>
                    <utils-settings-sound v-else-if="selected == 2"></utils-settings-sound>
                    <utils-settings-notification v-else-if="selected == 3"></utils-settings-notification>
                    <utils-settings-security v-else></utils-settings-security>
                </v-main>
            </v-layout>
        </template>
    </utils-card>
</template> 
<script setup lang="ts">
const props = defineProps(['showSettings'])
const emits = defineEmits(['update:showSettings',])
const selected = ref(0)
const el = ref()
const width = 900;
const height = 550;
const rail = ref(false)

onMounted(() => {
    const container = document.getElementById('Settings-container')
    if (container) {
        container.style.position = 'fixed';
        container.style.top = '18%';
        container.style.left = '20%';

        const observer = new ResizeObserver((rs) => {
            if(rs[0].contentRect.width <= 700){
                rail.value = true
            }else{
                rail.value = false
            }
            
        })

        observer.observe(container)
    }
})

</script>
 
<style scoped>
#profile-main::-webkit-scrollbar {
    width: 7px;
}

#profile-main::-webkit-scrollbar-thumb {

    margin-right: 5px;
    border-radius: 5px;
}

#profile-main:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .2);
}



</style>