<template>
     <v-app-bar density="compact" flat class="border-b">
            <v-btn id="bold" class="option-button format py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-undo</v-icon>
            </v-btn>
            <v-btn id="bold" class="option-button format py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-redo</v-icon>
            </v-btn>
            <!-- <div class="mr-2">
                        <span>
                            <select id="select-fontName" hide-details rounded="0" style="border: 1px solid grey;"
                                class="option-select pa-0 text-h5 px-2 rounded">
                                <option v-for="font in fontFamilies">{{ font }}</option>
                            </select>
                        </span>
                        <span>
                            <select id="select-fontName" style="border: 1px solid grey" hide-details rounded="0"
                                class="px-5 ml-1 rounded text-h5 option-select pa-0 ">
                                <option v-for="size in 7">{{ size }}</option>
                            </select>
                        </span>
                    </div>
                    <span class="d-flex align-center">
                        <input ref="textColor" type="color" id="select-fontColor" hide-details rounded="0"
                            class="option-select" style="height: 0px;width: 0px;position: absolute;" single-line
                            variant="underlined" density="compact"
                             />
                        <v-card id="fontColor-activator"
                            class="px-4 justify-center rounded-0 h-100 d-flex align-center flex-column h-100" variant="text"
                            >
                            <v-icon size="20">mdi-format-color-text</v-icon>
                            <v-sheet tile height="3" width="35"></v-sheet>
                        </v-card>
                    </span> -->
            <!-- <span class="d-flex align-center">
                <v-btn id="markerColor-activator" class="py-2 rounded-0" variant="elevated" @click=""
                    @contextmenu.prevent="" flat>
                    <v-icon>mdi-marker</v-icon>
                </v-btn>
                <input ref="markColor" type="color" id="select-markColor" hide-details rounded="0" class="option-select"
                    single-line variant="underlined" density="compact" style="height: 0px;width: 0px;position: absolute;" />
            </span> -->
           
            <v-btn id="bold" class="option-button format py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn id="italic" class="option-button format py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-italic</v-icon>
            </v-btn>
            <v-btn id="underline" class="option-button format py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-underline</v-icon>
            </v-btn>
            <v-btn id="strikethrough" class="option-button format py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-strikethrough</v-icon>
            </v-btn>
            <v-divider vertical class="mx-2"></v-divider>
            <v-btn id="superscript" class="option-button script py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-superscript</v-icon>
            </v-btn>
            <v-btn id="subscript" class="option-button script py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-subscript</v-icon>
            </v-btn>
            <v-divider vertical class="mx-2"></v-divider>
            <v-btn id="insertOrderedList" class="option-button py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-list-numbered</v-icon>
            </v-btn>
            <v-btn id="insertUnorderedList" class="option-button py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
            <v-divider vertical class="mx-2"></v-divider>
            <v-btn id="link" class="option-button-link py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-link</v-icon>
            </v-btn>
            <v-btn id="unlink" class="option-button py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-link-off</v-icon>
            </v-btn>
            <v-divider vertical class="mx-2"></v-divider>
            <v-btn id="justifyLeft" class="option-button align py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-align-left</v-icon>
            </v-btn>
            <!-- <v-btn id="justifyCenter" class="option-button align py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-align-center</v-icon>
            </v-btn>
            <v-btn id="justifyRight" class="option-button align py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-align-right</v-icon>
            </v-btn>
            <v-btn id="justifyFull" class="option-button align py-2 rounded-0 h-100" variant="text">
                <v-icon>mdi-format-align-justify</v-icon>
            </v-btn> -->
            <v-spacer></v-spacer>
            <v-menu>
                <template #activator="{ props }">
                    <v-btn v-bind="props"  class="option-button mr-2 py-2 rounded-lg text-capitalize" variant="flat">
                        <v-icon class="mr-2">mdi-export</v-icon>
                        Export
                    </v-btn>
                </template>
                <v-card width="250" class="rounded-lg mt-1">
                    <v-list>
                        <v-list-item @click="" append-icon="mdi-xml">Code</v-list-item>
                        <v-list-item @click="" append-icon="mdi-undo">Undo</v-list-item>
                        <v-list-item @click="" append-icon="mdi-redo">Redo</v-list-item>
                        <v-list-item @click="" append-icon="mdi-sd">Save as</v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <a download id="hyperlink"></a>
    </v-app-bar>
    <v-navigation-drawer location="right">
        <v-list class="pa-2">
            <!-- <v-list-item prepend-icon="mdi-history" append-icon="mdi-chevron-down" class="pa-2">
                Recent opens
            </v-list-item>
            <v-list-item class="pa-2 mb-2 rounded-lg" prepend-icon="mdi-file-outline" @click="">Chapter 1 - version
                1</v-list-item>
            <v-list-item prepend-icon="mdi-folder-multiple" append-icon="mdi-chevron-down"
                class="pa-2">Folders</v-list-item>
            <v-list-item class="pa-2 mb-2 rounded-lg" prepend-icon="mdi-folder-outline" @click="">Chapter 1</v-list-item>
            <v-list-item class="pa-2 mb-2 rounded-lg" prepend-icon="mdi-folder-outline" @click="">Chapter 2</v-list-item>
            <v-list-item class="pa-2 mb-2 rounded-lg" prepend-icon="mdi-folder-outline" @click="">Chapter 3</v-list-item> -->

            <v-list-item  prepend-icon="mdi-account-tie"  append-icon="mdi-chevron-down"
                class="pa-2">Owner</v-list-item>
            <v-list-item title="Joshua Sotto" subtitle="admin" @click="" class="pa-2 rounded-lg mb-2"
                :prepend-avatar="'https://source.unsplash.com/random/50x50/?human,woman,man&' + 5">
            </v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" append-icon="mdi-chevron-down"
                class="pa-2">Members</v-list-item>
            <v-list-item :title="member.name" :subtitle="member.role" @click="" class="pa-2 rounded-lg mb-2"
                v-for="member, n in members" :key="member.name"
                :prepend-avatar="'https://source.unsplash.com/random/50x50/?human,woman,man&' + n">
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
    <v-main  style="overflow-y: scroll;">
        <v-container class="d-flex justify-center py-10" >
            <v-card contenteditable="true" style="height: 12in;width: 8.5in;transform: scale(1);padding: 55px 55px;outline: none"  class="rounded-lg">

            </v-card>
        </v-container>
    </v-main>
    <!-- <v-navigation-drawer>
        <v-list>
            <div class="d-flex align-center pa-2">
                <h4 class="font-weight-regular d-flex align-center">
                    <v-icon class="mr-2">mdi-note</v-icon>
                    Pages
                </h4>
                <v-spacer></v-spacer>
                <v-icon class="mr-2">mdi-magnify</v-icon>
                <v-icon>mdi-plus</v-icon>
            </div>
        </v-list>
    </v-navigation-drawer> -->
    <v-footer app>
        <span>Page 1 / 10</span>
        <v-spacer></v-spacer>
        <div style="width: 25%">
            <v-range-slider hide-details></v-range-slider>
        </div>
    </v-footer>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false,
    layoutTransition: false,

})
const members = [
    { name: "John Doe", email: "john@example.com", role: "Editor" },
    { name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { name: "Bob Johnson", email: "bob@example.com", role: "Viewer" }
]
</script>

<style scoped></style>