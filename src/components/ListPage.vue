<template>
    <section class="flex justify-center items-center py-4">
        <!-- cái nút quay lại nè -->
        <router-link 
            :class="{
                'opacity-50 pointer-events-none': !previousPage
            }"
            class="dark:text-slate-800 text-white bg-slate-800 flex items-center dark:bg-white
            lg:mx-2 mx-1 lg:py-2 lg:px-4 p-2 hover:bg-slate-700 transistion-all duration-300 rounded-l" 
            :to="`/categories/${route.params.slug}?page=${previousPage}`

            ">
            <svg class="w-6 h-6 text-white dark:text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
            </svg>
        </router-link>
        <ul class="flex">
            <li v-for="(page, index) in listPages"
                :key="index"
                :class="{
                    'bg-orange-700 text-white': page === currentPage,
                    'dark:bg-white dark:text-slate-800': page !== currentPage  
                }"
                class="lg:mx-2 mx-1 flex items-center hover:bg-slate-700 transistion-all duration-300 rounded" >
                <router-link class="block w-full h-full lg:py-2 lg:px-4 p-2 px-3" :to="`/categories/${route.params.slug}?page=${page}`">{{ page }}</router-link>
            </li>
        </ul>
        <!-- cái nút đi tiếp nè -->
        <router-link 
            :class="{
                'opacity-50 pointer-events-none': !nextPage
            }"
            class="dark:text-slate-800 text-white bg-slate-800 flex items-center dark:bg-white
            lg:mx-2 mx-1 lg:py-2 lg:px-4 p-2 hover:bg-slate-700 transistion-all duration-300 rounded-r" 
            :to="`/categories/${route.params.slug}?page=${nextPage}`

            ">
            <svg class="w-6 h-6 text-white dark:text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
            </svg>
        </router-link>
    </section>
</template>

<script setup>
import { ref, onMounted, watch, toRefs, computed } from 'vue';
import { useRoute } from 'vue-router';
// Khai báo props trước
const props = defineProps({
    pagination: {
        type: Object,
        required: true
    }
});

const MAX_PAGES                 = 5;
const route                     = useRoute();

const totalPages                = ref(0);
const currentPage               = ref(1);
const nextPage                  = ref(0);
const previousPage              = ref(0);
const listPages                 = ref([]);

onMounted(() => {
    totalPages.value            = Math.ceil(props.pagination.totalItems / props.pagination.totalItemsPerPage);
    currentPage.value           = props.pagination.currentPage;
    loadPageControl(currentPage.value, totalPages.value);
    listPages.value             = renderListPages(currentPage.value, totalPages.value);
});

//tải dữ liệu cho các nút tiến và lùi
const loadPageControl           = (currentPage, totalPage) => {
    if(currentPage > 1) previousPage.value = currentPage - 1;
    else previousPage.value     = 0;

    if(currentPage < totalPage) nextPage.value = currentPage + 1;
    else nextPage.value         = 0;
}

//render ra danh sách các trang
const renderListPages           = (currentPage, totalPage) => {
    const pages                 = [];
    let countPages              = MAX_PAGES;
    const startPage             = Math.floor(countPages / 2);

    //các trang trước
    for(let i = currentPage - startPage; i <= currentPage - 1; i++) {
        if(i > 0) {
            pages.push(i);
            countPages--;
        }
    }

    //thêm trang hiện tịa vào giữa
    pages.push(currentPage);
    countPages--;

    //các trang sau
    for(let i = currentPage + 1; countPages > 0 && i <= totalPage; i++) {
        pages.push(i);
        countPages--;
    }
    return pages;
}


</script>

<style lang="css" scoped>

</style>