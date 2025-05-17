<template>
    <Loader v-if="showLoader"/>
    <div class="container mx-auto min-h-screen lg:px-32 lg:py-14 bg-white dark:bg-slate-950">
        <div class="text-4xl uppercase font-semibold flex items-center mb-8 border-b-2 border-slate-300 pb-4">
            <svg class="w-10 h-10 text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z"/>
            </svg>
            <h1 class="lg:text-5xl text-3xl font-extrabold text-slate-700">Comic<small class="ms-2 font-semibold text-gray-500 italic">{{ comicData.name }}</small></h1>
        </div>
        <!-- content -->
        <div class="flex lg:flex-row flex-col lg:items-end items-center">
            <img class="w-58 h-78 object-cover border-4 rounded-md shadow-md
                    dark:border-slate-300 border-slate-950" 
                :src="`${IMAGE_API}/${comicData.thumb_url}`" alt="">
            <div class="px-4 w-full">
                <h1 class="dark:text-white text-black lg:text-3xl text-2xl font-semibold my-2">{{ comicData.name }}</h1>
                <p 
                    v-html="comicData.content" 
                    class="mb-3 *:text-md text-gray-500 md:text-xl dark:text-gray-400">
                </p>
                <ul class="flex flex-wrap">
                    <li class="dark:text-slate-800 text-slate-50 lg:text-lg text-md font-semibold italic
                            dark:bg-slate-50 bg-slate-950 rounded-lg px-2 py-1 mx-1 my-1"
                        v-for="category in comicData.category" :key="category.id">
                        <router-link :to="`/categories/${category.slug}`">{{ category.name }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <h3 class="text-3xl font-bold my-2 text-slate-800 dark:text-white">Thông tin:</h3>
        <div class="flex items-center ">
            <h3 class="dark:text-white text-slate-700 font-semibold text-xl">Tác giả:
                <span class="italic text-md font-normal" v-if="comicData.author && comicData.author[0]" v-for="author in comicData.author" :key="author.id">
                    {{ author }}
                </span>
                <span class="italic text-md font-normal" v-else>
                    Hổng biết nữa!
                </span>
                
            </h3>
        </div>
    </div>
</template>

<script setup>
import { 
        defineProps,
        ref,
        onMounted,  
    }                       from    'vue';
import { useRoute }         from    'vue-router';
import Loader               from    '../components/Loader.vue';
import axios                from    'axios';

//API
const IMAGE_API             =       import.meta.env.VITE_IMAGE_API;
const COMIC_API             =       import.meta.env.VITE_COMIC_API;
const LIST_API              =       import.meta.env.VITE_LIST_API;

const comicData             =       ref({});
const slugcomic             =       ref("");
const showLoader            =       ref(false);

onMounted(async () => {
    try {
        showLoader.value    =       true;
        slugcomic.value     =       useRoute().params.slug;
        const comicRs       =       await axios.get(`${COMIC_API}/${slugcomic.value}`)
        comicData.value     =       comicRs.data.data.item;
        showLoader.value    =       false;

        console.log(comicRs.data);
        console.log(comicData.value);
    } catch (error) {
        console.error(error);
    }
});

</script>

<style lang="css" scoped>

</style>