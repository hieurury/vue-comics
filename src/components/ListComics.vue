<template>
    <ul class="flex flex-wrap justify-around">
        <li v-for="item in list" :key="item.id"
        class="lg:w-1/4 w-1/2 p-2 flex flex-col justify-center items-center">
            <router-link 
            :to="`/comics/${item.slug}`"
            class="w-full h-full flex justify-center items-center
            flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
                    <div class="w-full lg:h-72 h-54">
                        <img 
                        class="w-full h-full object-cover rounded-t-lg"
                        :src="`${IMAGE_API}/${item.thumb_url}`" alt="">
                    </div>                    
                    <div class="w-full py-4 overflow-hidden">
                        <h1 class="px-4 max-h-72 truncate text-lg font-medium">{{ item.name }}</h1>
                        <div class="w-full px-4 pt-2 mt-2 flex lg:text-sm text-xs justify-between border-t-1 border-slate-500">
                            <span class="text-slate-500">
                                {{ item.chaptersLatest ? checkLatestChapter(item.chaptersLatest) : "Chưa có chương nào" }}
                            </span>
                            <span v-if="item.status === 'ongoing'" class="text-sm text-gray-500">
                                <svg class="w-6 h-6 text-orange-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                                </svg>
                                
                            </span>
                            <span v-if="item.status === 'completed'" class="text-sm text-gray-500">
                                <svg class="w-6 h-6 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                                </svg>
                            </span>
                            <span v-if="item.status === 'coming_soon'" class="text-sm text-gray-500">
                                <svg class="w-6 h-6 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                    
            </router-link>
        </li>
    </ul>
</template>

<script setup>
    import {
            ref, onMounted,
            defineProps,
        }                       from    'vue';


    //API
    const IMAGE_API             =       import.meta.env.VITE_IMAGE_API;
    //handler function
    const checkLatestChapter    =       (listServer) => {
        let message             =       "";
        let lastChapter         =       0;
        listServer.forEach((item, index) => {
            if (item.chapter_name > lastChapter) {
                lastChapter     =       item.chapter_name;
            }
            message             =       `${item.chapter_name} chapters #${index + 1}`;
        });
        return message;
    }
    defineProps({
        list: {
            type: Array,
            default: () => []
        }
    });
</script>

<style lang="scss" scoped>

</style>