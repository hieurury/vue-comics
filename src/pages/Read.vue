<template>
    <Loader v-if="showLoader"/>
    <div class="container mx-auto min-h-screen bg-white dark:bg-slate-950" v-else>   
        <!-- chi tiết truyện -->
         <div>
            <div class="text-4xl uppercase font-semibold flex items-center mb-8 border-b-2 border-slate-300 py-4">
                <svg class="w-10 h-10 text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z"/>
                </svg>
                <h1 class="lg:text-5xl text-3xl font-extrabold text-slate-700">Truyện<small class="ms-2 font-semibold text-gray-500 italic">{{ comicData.name }}</small></h1>
            </div>
         </div>
        <!-- Hình ảnh chapter -->
        <div class="flex flex-col items-center">
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
          <!-- Navigation Controls -->
        <div class="fixed left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between px-2 pointer-events-none">
            <router-link 
                :disabled="!prevChapter"
                :to="`/comics/${comicData.slug}/${getIdComic(prevChapter)}`"
                class="bg-black bg-opacity-50 text-white p-2 rounded-r-lg hover:bg-opacity-70 pointer-events-auto"
                :class="{'opacity-50 pointer-events-none': !prevChapter}">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </router-link>
            <router-link 
                :disabled="!nextChapter"
                :to="`/comics/${comicData.slug}/${getIdComic(nextChapter)}`"
                class="bg-black bg-opacity-50 text-white p-2 rounded-l-lg hover:bg-opacity-70 pointer-events-auto"
                :class="{'opacity-50 pointer-events-none': !nextChapter}">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </router-link>
        </div>

        <div class="sticky left-0 right-0 bottom-0 flex items-center justify-between w-full
         dark:bg-slate-700 dark:text-white p-4">
            <div class="flex items-center dark:text-white text-gray-800 font-semibold
            dark:bg-slate-950 bg-white px-4 py-2">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                </svg>
                <router-link to="/">Trang chủ</router-link>
            </div>

            <button id="dropdownTopButton" data-dropdown-toggle="dropdownTop" data-dropdown-placement="top"
            class="flex items-center px-6 py-2 dark:bg-orange-600 font-semibold
            " >Danh sách chương<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                </svg>
            </button>
            <div id="dropdownTop" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm lg:w-3/12 w-8/12 dark:bg-gray-700">                <ul class="flex">
                    <li v-for="server in listServer"
                        :key="server.id"
                        @click="switchServer(server)"
                        class="p-2 font-semibold cursor-pointer"
                        :class="{ 
                            'bg-orange-700 text-white': currentServer === server,
                            'text-gray-900 dark:text-white': currentServer !== server
                        }">
                        {{ server }}
                    </li>
                </ul>
                <ul 
                class="py-2 text-sm text-gray-700 dark:text-gray-200
                flex flex-wrap max-h-72 overflow-y-scroll custom-bar" 
                aria-labelledby="dropdownTopButton">                    
                <li v-for="chapter in listChapters"
                    class="p-2 font-semibold cursor-pointer 
                    lg:flex-1/6 flex-1/3 lg:max-w-1/6 max-w-1/3 text-center"
                    :class="{
                        'bg-orange-700 text-white': currentChapter === chapter.chapter_name,
                        'text-gray-900 dark:text-white': currentChapter !== chapter.chapter_name
                    }">
                        <router-link class="block w-full h-full" 
                            :to="{
                                name: 'DynamicChapter',
                                params: {
                                    slug: comicData.slug,
                                    id: getIdComic(chapter.chapter_api_data)
                                }
                            }">
                            {{ chapter.chapter_name }}
                        </router-link>
                    </li>
                </ul>
            </div>


        </div>
        
    </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, watch } from    'vue';
import { useRoute }                 from    'vue-router';
import Loader                       from    '../components/Loader.vue';
import axios                        from    'axios';
import { initFlowbite }             from    'flowbite';

// API
const READ_API                      =       import.meta.env.VITE_READ_API;
const COMIC_API                     =       import.meta.env.VITE_COMIC_API;
const DOMAIN                        =       import.meta.env.VITE_DOMAIN;

// Refs
const showLoader                    =       ref(true);
const comicData                     =       ref({});
const chapterData                   =       ref({});
const route                         =       useRoute();

const listServer                    =       ref([]);
const listChapters                  =       ref([]);
const currentServer                 =       ref("");
const currentChapter                =       ref("");
const prevChapter                   =       ref(null);
const nextChapter                   =       ref(null);


//setCurrentChapters handler
const setCurrentChapters            =       async (serverChapters) => {
    try {
        listChapters.value          =       serverChapters.server_data;
        currentServer.value         =       serverChapters.server_name;
    } catch (error) {
        console.error(error);
    }
}

//get id from api
const getIdComic                    =        (apiChapter) => {
    try {
        if(!apiChapter) return null;
        const splitUrl = apiChapter.split("/");
        const idComic = splitUrl[splitUrl.length - 1];
        return idComic; 
    } catch (error) {
        console.error(error);
    }
}

//find adjacent chapters
const findAdjacentChapters          =       (chapters, currentChapter) => {
    const currentIndex              =       chapters.findIndex(chapter => chapter.chapter_name === currentChapter);
    prevChapter.value               =       currentIndex > 0 ? chapters[currentIndex - 1].chapter_api_data : null;
    nextChapter.value               =       currentIndex < chapters.length - 1 ? chapters[currentIndex + 1].chapter_api_data : null;
};

// Hàm tải dữ liệu chapter
const loadChapterData = async (slug, chapterId) => {
    try {
        showLoader.value            =       true;
        
        // Lấy dữ liệu truyện và chapter
        const comicResponse         =       await axios.get(`${COMIC_API}/${slug}`);
        const chapterResponse       =       await axios.get(`${READ_API}/${chapterId}`);
        
        comicData.value             =       comicResponse.data.data.item;
        chapterData.value           =       chapterResponse.data.data.item;
        
        // Cập nhật tiêu đề trang
        document.title              =       `${comicData.value.name} - Chapter ${chapterData.value.chapter_name} | Rury Comics`;

        //cập nhật danh sách server
        listServer.value            =       comicData.value.chapters.map(server => server.server_name);
        setCurrentChapters(comicData.value.chapters[0]);
        currentChapter.value        =       chapterData.value.chapter_name;
      
        // Cuộn trang lên đầu khi chuyển chapter
        window.scrollTo({ top: 0, behavior: 'smooth' });
        findAdjacentChapters(listChapters.value, currentChapter.value);
        showLoader.value            =       false;
        // Khởi tạo Flowbite
        initFlowbite();
    } catch (error) {
        console.error('Error loading chapter:', error);
        showLoader.value            =       false;
    }
};

// Khi component được mount
onMounted(async () => {
    // Tải dữ liệu ban đầu
    await loadChapterData(route.params.slug, route.params.id);
});

// Theo dõi thay đổi route params
watch(() => route.params,
    async (newParams) => {
        if (newParams.id && newParams.slug) {
            await loadChapterData(newParams.slug, newParams.id);
        }
    },
    { deep: true }
);

//cập nhật flowbite
onUpdated(() => {
    initFlowbite();
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