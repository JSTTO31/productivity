<template>
    <div id="fire">

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
#fire{
    background-image: url('/fire/fire1.png');
    background-size: cover;
    opacity: .7;
    background-position: bottom;
    height: 25px;
    width: 35px;
    animation: animation 1s ease-in both infinite;
}

@keyframes animation {
    0%{
        background-image: url('/fire/fire1.png');
    }
    28.57%{
        background-image: url('/fire/fire2.png');
    }
    42.85%{
        background-image: url('/fire/fire3.png');
    }
    57.13%{
        background-image: url('/fire/fire4.png');
    }
    71.41%{
        background-image: url('/fire/fire5.png');
    }
    71.41%{
        background-image: url('/fire/fire6.png');
    }
    100%{
        background-image: url('/fire/fire7.png');
    }
}
</style>