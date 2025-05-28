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
                    class="mb-3 *:text-md text-gray-500 md:text-xl dark:text-gray-400
                        lg:max-h-52 overflow-y-scroll custom-bar">
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
        <div class="">
            <h3 class="dark:text-white text-slate-700 font-semibold text-xl">Tác giả:
                <span class="italic text-md font-normal" v-if="comicData.author && comicData.author[0]" v-for="author in comicData.author" :key="author.id">
                    {{ author }}
                </span>
                <span class="italic text-md font-normal" v-else>
                    Hổng biết nữa!
                </span>
                
            </h3>
            <h3 class="dark:text-white text-slate-700 font-semibold text-xl">Trạng thái:
                <span class="italic text-md font-normal"
                    :class="{
                        'text-green-500': comicData.status === 'completed',
                        'text-orange-500': comicData.status === 'ongoing',
                        'text-blue-500': comicData.status === 'coming_soon',
                    }">
                    {{ statusComic[comicData.status] }}
                </span>
                
            </h3>
            <!-- server và chương -->
            <section class="my-4 py-2 border-t-2 border-slate-700 dark:border-slate-300">
                <!-- danh sách server -->
                <ul 
                    v-if="comicData.chapters && comicData.chapters.length > 0" 
                    class="flex font-semibold text-xl
                    ">
                    <li class="p-2 cursor-pointer m-1"
                        :class="{'bg-slate-800 dark:bg-slate-50 text-white dark:text-slate-950' : currentServer !== serverChapters.server_name, 
                                'bg-orange-900 text-white': currentServer == serverChapters.server_name}"
                        v-for="serverChapters in comicData.chapters"
                        @click="setCurrentChapters(serverChapters)" 
                        :key="serverChapters.server_name">
                        {{ serverChapters.server_name }}
                    </li>
                </ul>
                <h3 v-else class="text-2xl font-bold my-2 text-slate-800 dark:text-white">Hiện tại chưa có chương nào khả dụng!</h3>
                <!-- danh sách chương -->
                <ul 
                    v-if="currentChapters && currentChapters.length > 0" 
                    class="flex font-semibold text-xl
                    flex-wrap max-h-96 overflow-y-scroll custom-bar">                    <li class="bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white
                    p-2 m-1 cursor-pointer lg:flex-1/12 lg:max-w-1/12 flex-1/6 max-w-1/6 shadow-md"
                        v-for="chapter in currentChapters" 
                        :key="chapter.server_name">
                        <router-link :to="`/comics/${slugcomic}/${getIdComic(chapter.chapter_api_data)}`" class="block w-full h-full">
                            {{ chapter.chapter_name }}
                        </router-link>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script setup>
import {
        ref,
        onMounted,
        watch,  
    }                           from    'vue';
import { useRoute }             from    'vue-router';
import Loader                   from    '../components/Loader.vue';
import axios                    from    'axios';

//API
const IMAGE_API                 =       import.meta.env.VITE_IMAGE_API;
const COMIC_API                 =       import.meta.env.VITE_COMIC_API;
const LIST_API                  =       import.meta.env.VITE_LIST_API;
const READ_API                  =       import.meta.env.VITE_READ_API;

const comicData                 =       ref({});
const slugcomic                 =       ref("");
const showLoader                =       ref(false);
const statusComic               =       ref({
    "ongoing": "Đang tiến hành",
    "completed": "Hoàn thành",
    "coming_soon": "Sắp ra mắt",
});
const currentChapters           =       ref([]);
const currentServer             =       ref(null);
const route                     =       useRoute();

//setCurrentChapters handler
const setCurrentChapters        =       async (serverChapters) => {
    try {
        if(!serverChapters) return;
        currentChapters.value   =       serverChapters.server_data;
        currentServer.value     =       serverChapters.server_name;
    } catch (error) {
        console.error(error);
    }
}
//get id from api
const getIdComic                =       (apiChapter) => {
    try {
        const splitUrl          =       apiChapter.split("/");
        const idComic           =       splitUrl[splitUrl.length - 1];
        return idComic; 
    } catch (error) {
        console.error(error);
    }
}
const setComicData            =       async (slug) => {
    try {
        slugcomic.value         =       slug;
        const comicRs           =       await axios.get(`${COMIC_API}/${slugcomic.value}`)
        comicData.value         =       comicRs.data.data.item;
        showLoader.value        =       false;
        
        console.log(comicData.value);
        //khi trang được tải xong -> đặt server 1 là mặc định.
        setCurrentChapters(comicData.value.chapters[0]);
        document.title          =       `Rury Comics | ${comicData.value.name}`;
    } catch (error) {
        console.error(error);
    }
}
onMounted(async () => {
    setComicData(route.params.slug);
});

watch(() => route.params.slug, (newSlug) => {
    console.log(route);
    if(newSlug) {
        setComicData(newSlug);
    }
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