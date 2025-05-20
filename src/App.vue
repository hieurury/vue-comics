<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script setup>
import { onMounted, nextTick, computed, markRaw } from 'vue';
import { initFlowbite } from 'flowbite';
import { useRoute } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';

// Theo dõi route để xác định layout
const route = useRoute();

// Dynamic layout dựa trên route meta
const layout = computed(() => {
    // Sử dụng markRaw để tránh performance issues với Vue 3 Reactivity
    return markRaw(route.meta.layout || MainLayout);
});

onMounted(() => {
    nextTick(() => {
        initFlowbite();
    });
});
</script>

<style lang="css" scoped>

</style>