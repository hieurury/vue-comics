<template>
    <router-view>
    </router-view>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';
import { initFlowbite } from 'flowbite';

onMounted(() => {
    nextTick(() => {
        initFlowbite();
    });
});
</script>

<style lang="css" scoped>

</style>