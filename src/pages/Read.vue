<template>
    <Loader v-if="showLoader"/>
    <div class="container mx-auto min-h-screen py-4 px-2 lg:px-8 bg-white dark:bg-slate-950" v-else>   
        <!-- Hình ảnh chapter -->
        <div class="flex flex-col items-center my-4">
            <div v-if="chapterData.chapter_image && chapterData.chapter_image.length > 0" class="w-full max-w-4xl mx-auto">
                <img 
                    v-for="(img, index) in chapterData.chapter_image" 
                    :key="index"
                    :src="`${DOMAIN}/${chapterData.chapter_path}/${img.image_file}`" 
                    :alt="`${comicData.name} - ${chapterData.chapter_name} - Trang ${index + 1}`"
                    class="mb-2 w-full h-auto"
                    loading="lazy"
                />
            </div>
            <div v-else class="text-center text-xl text-gray-600 dark:text-gray-300 my-8">
                Không có dữ liệu hình ảnh cho chapter này.
            </div>
        </div>
        
        <div class="fixed left-0 right-0 bottom-0 flex items-center justify-center w-full
         dark:bg-slate-700 dark:text-white">
            <h1 class="text-2xl">test</h1>
        </div>
        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';
import axios from 'axios';

// API
const READ_API = import.meta.env.VITE_READ_API;
const COMIC_API = import.meta.env.VITE_COMIC_API;
const DOMAIN = import.meta.env.VITE_DOMAIN;

// Refs
const showLoader = ref(true);
const comicData = ref({});
const chapterData = ref({});
const route = useRoute();

onMounted(async () => {
    try {
        showLoader.value = true;
        const slug = route.params.slug;
        const chapterId = route.params.id;
        
        // Lấy thông tin comic
        const comicResponse = await axios.get(`${COMIC_API}/${slug}`);
        comicData.value = comicResponse.data.data.item;
        
        // Lấy thông tin chapter
        const chapterResponse = await axios.get(`${READ_API}/${chapterId}`);
        chapterData.value = chapterResponse.data.data.item;
        
        // Cập nhật tiêu đề trang
        document.title = `${comicData.value.name} - Chapter ${chapterData.value.chapter_name} | Rury Comics`;
        
        showLoader.value = false;
    } catch (error) {
        console.error('Error loading chapter:', error);
        showLoader.value = false;
    }
});
</script>

<style lang="css" scoped>
/* Custom styles cho trang đọc */
img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
}
</style>