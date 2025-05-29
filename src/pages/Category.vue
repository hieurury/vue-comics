<template>
    <div class="container lg:px-32 dark:bg-slate-950">
        <Loader v-if="showLoader"/>
        <div class="text-4xl uppercase font-semibold flex items-center mb-8 py-14 border-b-2 border-slate-300 pb-4">
            <svg class="w-10 h-10 text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z"/>
            </svg>
            <h1 class="lg:text-5xl text-3xl font-extrabold text-slate-700">Rury Comics<small class="ms-2 font-semibold text-gray-500 italic">{{ caterogyData.titlePage }}</small></h1>
        </div>
        <ListPage 
            v-if="caterogyData.params" 
            :pagination="caterogyData.params.pagination"
            :key="paginationKey"/>
        <ListComics 
        :list="caterogyData.items"/>
        <ListPage 
            v-if="caterogyData.params" 
            :pagination="caterogyData.params.pagination"
            :key="paginationKey"/>
    </div>
</template>

<script setup>
import { ref, 
    onMounted, 
    watch, 
    computed }                  from 'vue';
import axios                    from 'axios';
import Loader                   from '../components/Loader.vue';
import ListComics               from '../components/ListComics.vue';
import ListPage                 from '../components/ListPage.vue';
import { useRoute }             from 'vue-router';

const CATEGORY_API              = import.meta.env.VITE_CATEGORIES_API;

const caterogyData              = ref([]);
const paginationKey             = ref(0);
//get router
const showLoader                = ref(false);

const loadDataCategory          = async (slug, query) => {
    try {

        showLoader.value        = true;
        const comicsRs          = await axios.get(`${CATEGORY_API}/${slug}?page=${query || 1}`);
        caterogyData.value      = comicsRs.data.data;
        console.log(caterogyData.value);
        paginationKey.value     = query || 1;
        showLoader.value        = false;

    } catch (error) {
        console.error(error);
        
    }
}
const router                    = useRoute();

onMounted(async () => {
    await loadDataCategory(router.params.slug, router.query.page);
})


watch(() => router.query, (newRouter) => {
    if(newRouter) {
        loadDataCategory(router.params.slug, newRouter.page);
    }

})
    
</script>

<style lang="css" scoped>

</style>