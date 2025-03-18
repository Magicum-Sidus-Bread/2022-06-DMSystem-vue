<template>
  <div>
    <div :innerHTML="content.html"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";

import WangEditor from "wangeditor";
const editor = ref();
const content = reactive({
  html: "",
  text: "",
});
let instance;
const syncHTML = () => {
  content.html = instance.txt.html();
};
const syncHTML = () => {
  content.html = instance.txt.html();
};
onBeforeUnmount(() => {
  instance.destroy();
  instance = null;
});
</script>

<style scoped></style>
