<template>
  <Loader v-if="showLoader"/>
  <div class="container lg:px-32 dark:bg-slate-950">
    <div class="text-4xl uppercase font-semibold flex items-center mb-8 py-14 border-b-2 border-slate-300 pb-4">
      <svg class="w-10 h-10 text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z"/>
      </svg>
      <h1 class="lg:text-5xl text-3xl font-extrabold text-slate-700">Rury Comics<small class="ms-2 font-semibold text-gray-500 italic">Truyện mới nhất</small></h1>
    </div>
    <ListComics :list="newComics" />

    <div class="text-4xl uppercase font-semibold flex items-center my-8 border-b-2 border-slate-300 pb-4">
      <svg class="w-10 h-10 text-orange-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
      </svg>
      <h1 class="lg:text-5xl text-3xl font-extrabold text-slate-700">Truyện<small class="ms-2 font-semibold text-gray-500 italic">Đang tiến hành</small></h1>
    </div>
    <ListComics :list="onGoingComics" />

    <div class="text-4xl uppercase font-semibold flex items-center my-8 border-b-2 border-slate-300 pb-4">
      <svg class="w-10 h-10 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
      </svg>
      <h1 class="lg:text-5xl text-3xl font-extrabold text-slate-700">Truyện<small class="ms-2 font-semibold text-gray-500 italic">Đã hoàn thành</small></h1>
    </div>
    <ListComics :list="completedComics" />
  </div>
</template>

<script setup>
document.title = "Rury Comics | Home";
// imports
import axios                from  "axios";
import { ref, onMounted }   from  "vue";
import { defineProps }      from  "vue";
import ListComics           from  "../components/ListComics.vue";
import Loader               from  "../components/Loader.vue";

//API
const HOME_API              =     import.meta.env.VITE_HOME_API;
const ONGOING_MOVIES_API    =     import.meta.env.VITE_LIST_API + "/dang-phat-hanh";
const COMPLETED_MOVIES_API  =     import.meta.env.VITE_LIST_API + "/hoan-thanh";
const IMAGE_API             =     import.meta.env.VITE_IMAGE_API;

// props
const pages                 =     ref(1);
const newComics             =     ref([]);
const onGoingComics         =     ref([]);
const completedComics       =     ref([]);
const showLoader            =     ref(null);

onMounted(async () => {
  try {
    showLoader.value        =     true;
    const newComicsRs       =     await axios.get(HOME_API);
    const onGoingComicsRs   =     await axios.get(ONGOING_MOVIES_API);
    const completedComicsRs =     await axios.get(COMPLETED_MOVIES_API);
    showLoader.value        =     false;
    newComics.value         =     newComicsRs.data.data.items;
    onGoingComics.value     =     onGoingComicsRs.data.data.items;
    completedComics.value   =     completedComicsRs.data.data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style lang="scss" scoped></style>
