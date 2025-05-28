<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script setup>
import { onMounted, 
    nextTick, 
    computed, 
    markRaw }                   from    'vue';
import { initFlowbite }         from    'flowbite';
import { useRoute }             from    'vue-router';
import MainLayout               from    './layouts/MainLayout.vue';

// Theo dõi route để xác định layout
const route                     =       useRoute();

// Dynamic layout dựa trên route meta
const layout                    =       computed(() => {
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
    .custom-bar::-webkit-scrollbar {
        width: 2px;
    }
    .custom-bar::-webkit-scrollbar-thumb {
        background-color: #5b5959;
        border-radius: 5px;
    }
    .custom-bar::-webkit-scrollbar-thumb:hover {
        background-color: #5b5959;
    }
</style>