<template>
    <div class="relative">    
        <form class="max-w-md mx-auto" action="/search">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                name="comic" 
                type="search" 
                id="comic-search" 
                @input="setSearchQuery($event.target.value)"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tên truyện cần tìm." required />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tìm kiếm</button>
            </div>
        </form>
        <div 
        :class="{
            'hidden': dataResponse.length === 0,
            'block': dataResponse.length > 0
        }"
        class="max-w-md max-h-72 w-full mx-auto shadow-md absolute left-0 right-0 z-50 bg-white overflow-y-auto p-2 custom-bar
        dark:bg-slate-700">
            
            <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                <li 
                v-for="(item, index) in dataResponse"
                :key="index"
                class="pb-3 sm:pb-4">
                    <router-link class="block w-full h-full" :to="`/comics/${item.slug}`">
                        <div class="flex items-center space-x-4 rtl:space-x-reverse">
                            <div class="shrink-0">
                                <img 
                                class="w-8 h-8 rounded-full" 
                                :src="`${IMAGE_API}/${item.thumb_url}`" 
                                alt="Neil image">
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {{ item.name }}
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                {{ item.author[0] }}
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <span class="text-xs">{{ checkLatestChapter(item.chaptersLatest) }}</span>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch} from 'vue';
import axios from 'axios';
const SEARCH_API = import.meta.env.VITE_SEARCH_API;
const IMAGE_API = import.meta.env.VITE_IMAGE_API;
const dataResponse = ref([]);
const searchQuery = ref('');
const timeoutState = ref(null);

const setSearchQuery = (data) => {
    if(timeoutState.value) {
        clearTimeout(timeoutState.value);
        console.log("clear");
    }
    timeoutState.value = setTimeout(() => {
        if(!data) searchQuery.value = undefined;
        else searchQuery.value = encodeURIComponent(data);
        getDataAPI(searchQuery.value);
    }, 500);
};

const getDataAPI = async (query) => {
    try {
        const response = await axios.get(`${SEARCH_API}?keyword=${query}`);
        console.log(query);
        console.log(response.data);
        dataResponse.value = response.data.data.items;
        console.log(dataResponse.value);
    } catch (error) {
        console.log(error);
        
    }
}
const checkLatestChapter    =       (listServer) => {
    if(!listServer || listServer.length === 0) {
        return;
    }
    let message             =       "";
    let lastChapter         =       0;
    listServer.forEach((item, index) => {
        if (item.chapter_name > lastChapter) {
            lastChapter     =       item.chapter_name;
            message         =       `${item.chapter_name} chapters #${index + 1}`;
        }
    });
    return message;
}
</script>

<style lang="css" scoped>

</style>