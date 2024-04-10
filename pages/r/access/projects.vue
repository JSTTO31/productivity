<template>
    <div>
        <project-navigation-drawer :model-value="showNavigation"></project-navigation-drawer>
        <NuxtLoadingIndicator></NuxtLoadingIndicator>
        <suspense v-if="$route.params.project">
            <NuxtPage></NuxtPage>
            <template #fallback>
                <v-main class="h-screen" id="drawer">
                    <v-layout class="h-100 w-100" id="loading-layout">
                        <v-app-bar density="compact" class="border-b" flat style="background-color: rgba(0,0,0,.5);">
                            <v-card color="background" variant="tonal" class="ml-5  rounded-lg" width="40"
                                height="30"></v-card>
                            <v-card color="background" variant="tonal" class="ml-5  rounded-lg" width="250"
                                height="30"></v-card>
                            <v-spacer></v-spacer>
                            <v-card color="background" variant="tonal" class="mr-5  rounded-lg" width="90"
                                height="30"></v-card>
                            <v-card color="background" variant="tonal" class="mr-5  rounded-lg" width="90"
                                height="30"></v-card>

                            <v-card color="background" variant="tonal" class="mr-5  rounded-circle" width="40"
                                height="30"></v-card>
                            <v-card color="background" variant="tonal" class="mr-5  rounded-circle" width="40"
                                height="30"></v-card>
                            <v-card color="background" variant="tonal" class="mr-5  rounded-circle" width="40"
                                height="30"></v-card>
                            <v-card color="background" variant="tonal" class="mr-5  rounded-lg" width="40"
                                height="30"></v-card>
                        </v-app-bar>
                        <v-main class="h-100">
                            <v-card class="w-100 h-100 rounded-0" color="transparent">
                                <v-container class="pa-0 h-100 mr-15 d-flex " fluid>
                                    <v-col cols="3" xl="2" class="h-100 pa-0 rounded-lg" v-for="section in sections"
                                        :key="section.section_name">
                                        <v-card class=" px-5 py-3 pt-10 rounded-0  h-100"
                                            style="background-color: rgba(0,0,0,.2);overflow-y: auto;">
                                            <div class="text-white mb-2 d-flex align-center mb-5">
                                                <v-card width="200" height="25" color="background"
                                                    variant="tonal"></v-card>
                                                <v-spacer></v-spacer>
                                                <v-card class="mr-2" width="25" height="25" color="background"
                                                    variant="tonal"></v-card>
                                                <v-card width="25" height="25" color="background"
                                                    variant="tonal"></v-card>
                                            </div>
                                            <v-card v-for="section in sections" class="mb-5" :key="section.id"
                                                variant="tonal" color="background" height="60"></v-card>
                                            <v-card class="text-capitalize rounded-lg" color="background"
                                                variant="tonal" height="35" block>
                                            </v-card>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="3" xl="2" class="h-100 pa-0 mr-3">
                                        <v-card
                                            class="h-100 px-5 py-3 d-flex text-white rounded-0 align-center justify-center text-subtitle-2 font-weight-bold text-white"
                                            style="background-color: rgba(0,0,0,.5);">
                                            <v-card variant="tonal" width="150" height="35">
                                            </v-card>
                                        </v-card>
                                    </v-col>
                                </v-container>
                            </v-card>
                        </v-main>
                    </v-layout>
                </v-main>
            </template>
        </suspense>
        <v-main v-else class="h-screen">
            <v-card style="background: rgba(0, 0, 0, .2);" class="h-100 w-100 d-flex align-center justify-center">
                <div class="d-flex flex-column">
                    <v-icon style="transform: rotate(25deg);" size="200" color="white">mdi-lightning-bolt</v-icon>
                    <h4 class="text-center text-white my-15 mt-5">No project found</h4>
                    <v-btn class="text-capitalize" @click="newProject">Create new project</v-btn>
                    <h4 class="text-center font-weight-regular text-white mt-5">No available templates</h4>
                </div>
            </v-card>
        </v-main>
    </div>
</template>

<script setup lang="ts">
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
const sections = useSectionsObject
const {user} = storeToRefs(useUserStore())
const { project } = storeToRefs(useProjectStore())
useHead({
    title: 'Projects'
})
definePageMeta({
    layout: 'authenticated',
    middleware: 'auth'
})
const showNavigation = ref(true)
const showChatbox = ref(false)
provide('showChatbox', showChatbox)
provide('showProjectsNavigation', showNavigation)
const $project = useProjectStore()
const router = useRouter()
async function newProject() {
    const { data } = await $project.store()
    if (data.value) {
        //@ts-ignore
        router.push({ name: 'r-access-projects-project', params: { project: data.value.project._id } })

    }
}

onMounted(() => {
    // Guide and tips
    if(user.value && !user.value.guide.project){
        setTimeout(() => {
        const driverObj = driver({
            popoverClass: 'driver-theme',
            showProgress: true,
            steps: [
                { element: "#project-container", popover: { title: "Understanding Project Navigation", description: "Project navigation acts as a container for your projects. It organizes and provides access to project-related features, facilitating seamless project management and navigation.", } },
                { element: "#project-list-item", popover: { title: "Project List Item Functionality", description: "Project list items provide quick access to your projects. Click to view project details or tasks. Also, they display options and ownership indicators for easy management." } },
                { element: "#project-list-item-indicator", popover: { title: "Project Member Indicators", description: "Project member indicators distinguish between different roles within a project. They help identify administrators, owners, and regular members, ensuring clarity and efficient collaboration within the project environment." } },
                { element: "#project-list-item-menu", popover: { title: "Project Menu Options", description: "Customize project settings with ease using the menu options. Share access, manage roles, delete, and rename projects effortlessly, putting you in control of project management tasks." } },
                { element: "#project-create-button", popover: { title: "Create Your First Project", description: "Begin your project journey by creating your first project. Click the 'Create Project' button to set goals, plan tasks, and mark milestones, setting the stage for your project success." } },
                {
                    element: "#project-app-bar-title",
                    popover: {
                        title: "Edit Project Title",
                        description: "Easily edit the project title using the text field provided. Simply click on the field, make your desired changes, and save to update the project title effortlessly."
                    }
                },
                {
                    element: "#project-app-bar-save",
                    popover: {
                        title: "Save Changes",
                        description: "The save indicator in the app bar notifies you that changes you made to the project have been successfully saved. It provides reassurance that your updates are now reflected in the project."
                    }
                },
                {
                    element: "#project-app-bar-sort",
                    popover: {
                        title: "Sort Tasks",
                        description: "The sort button allows you to arrange the tasks in your project based on different criteria such as priority, due date, or status. This helps you organize and prioritize your tasks more effectively, making it easier to manage your project."
                    }
                },
                {
                    element: "#project-app-bar-filter",
                    popover: {
                        title: "Filter Tasks",
                        description: "The filter button enables you to narrow down the tasks displayed in your project based on specific criteria such as priority, status, or assignee. By applying filters, you can focus on the tasks that are most relevant to you at any given time, improving your productivity and workflow."
                    }
                },
                {
                    element: "#project-app-bar-members",
                    popover: {
                        title: "Members Actions",
                        description: "The Members Actions menu allows you to manage project access and permissions for team members. You can share the project with others, assign roles such as admin or member, and control who can view and edit project content. This feature enables efficient collaboration and ensures that project resources are appropriately managed."
                    }
                },
                {
                    element: "#project-app-bar-chatbox",
                    popover: {
                        title: "Show Chatbox",
                        description: "The chatbox button provides access to team discussions related to the project. You can use this feature to communicate with other project members, share ideas, ask questions, and collaborate effectively. Engaging in discussions within the chatbox fosters teamwork and enhances project coordination.",
                        onNextClick() {
                            showChatbox.value = true
                            driverObj.moveNext()
                        }
                    }
                },
                {
                    element: "#project-team-chat-box",
                    popover: {
                        title: "Team Chat Box",
                        description: "The Team Chat Box allows you to engage in discussions and collaborate with other members of your team. You can share ideas, ask questions, and coordinate tasks in real-time, fostering effective communication and teamwork. This feature enhances project collaboration and facilitates seamless communication among team members.",
                        onNextClick() {
                            showChatbox.value = false
                            driverObj.moveNext()
                        }
                    },

                },
                {
                    element: ".section:nth-child(1)",
                    popover: {
                        title: "Section Column Card",
                        description: "The Section Column Card provides a visual representation of the status of tasks within a specific section of your project. It allows you to organize tasks based on their progress, such as 'To Do,' 'In Progress,' or 'Completed.' This feature helps you track the status of tasks at a glance, prioritize your work effectively, and manage your project efficiently."
                    }
                },
                {
                    element: ".section:nth-child(1) .task:nth-child(1)",
                    popover: {
                        title: "List Card Item",
                        description: "The List Card Item allows you to interact with individual tasks within a section of your project. You can edit task details such as the title, description, assignee, due date, and more. Additionally, you can move tasks between sections, mark them as complete, or delete them as needed. This feature provides flexibility and control over task management, allowing you to stay organized and productive.",
                        onNextClick(){
                            if(user.value){
                                user.value.guide.project = true
                            }
                            driverObj.destroy();

                        }
                    }
                }
            ],
            onDestroyStarted: () => {
                if (!driverObj.hasNextStep() || confirm("Do you want to skip this all?")) {
                    if(user.value){
                        user.value.guide.project = true
                    }
                    driverObj.destroy();
                    
                }
            },
        });

        driverObj.drive()
        }, 1000);
    }
})
</script>

<style scoped>
#tasks-container::-webkit-scrollbar {
    height: 10px;
    width: 10px;

}

#tasks-container::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.432);
    border-radius: 25px;
}

#loading-layout {
    animation: blinking 2s ease 0s infinite normal forwards;

}

@keyframes blinking {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.2;
    }

    100% {
        opacity: 1;
    }
}
</style>