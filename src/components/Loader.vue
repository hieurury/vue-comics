<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-slate-800 z-50"
  >
    <span class="loader bg-slate-700"></span>
    <h1 class="text-slate-100 text-xl italic">Đang lót, chờ xí....</h1>
  </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    defineProps({
        loading: {
            type: Boolean,
            default: false
        }
    });
</script>

<style lang="css" scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  animation: pulse 1s linear infinite;
}
.loader:after {
  content: "";
  position: absolute;
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: scaleUp 1s linear infinite;
}

@keyframes scaleUp {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  60%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes pulse {
  0%,
  60%,
  100% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.2);
  }
}
</style>
