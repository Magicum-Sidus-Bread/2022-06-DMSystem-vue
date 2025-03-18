<template>
  <div class="container">
    <div class="img">
      <h3>产品主图</h3>
      <el-upload
        :action="baseURL + '/file/image'"
        :headers="headers"
        :on-success="uploadImage"
        :on-remove="removeImage"
        :limit="1"
      >
        <el-button type="primary" plain>点击上传</el-button>
      </el-upload>
    </div>
    <div class="description">
      <h3>产品详情</h3>
      <div ref="editor"></div>
    </div>
    <el-button @click="back">上一步</el-button>
    <el-button type="primary" @click="next">下一步</el-button>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, onBeforeUnmount, ref, reactive, computed } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import WangEditor from "wangeditor";
import { getToken } from "utils/auth.js";
import { baseURL } from "utils/request.js";

const props = defineProps({
  image: {
    type: String,
    default: "https://xzj-pic-1306183757.cos.ap-nanjing.myqcloud.com/picgo/摘月蓝底.jpg",
  },
  description: "",
});

const form = ref({
  image: "",
  description: "",
});

const editor = ref();
const content = reactive({
  html: "",
  text: "",
});
let instance;

const headers = computed(() => {
  return {
    token: getToken(),
  };
});
const uploadImage = (response, file, fileList) => {
  form.value.image = response.data;
};
const removeImage = () => {
  form.value.image =
    "https://xzj-pic-1306183757.cos.ap-nanjing.myqcloud.com/picgo/摘月蓝底.jpg";
};

const syncHTML = () => {
  content.html = instance.txt.html();
};

const emit = defineEmits(["emitDescription", "prev"]);

const next = () => {
  emit("emitDescription", form.value);
};

const back = () => {
  emit("prev");
};

onBeforeMount(() => {
  form.value = {
    ...form.value,
    image: props.image,
    description: props.description,
  };
});

onMounted(() => {
  instance = new WangEditor(editor.value);
  Object.assign(instance.config, {
    onchange() {
      form.value.description = instance.txt.html();
    },
  });
  instance.create();
  instance.txt.html(form.value.description);
});

onBeforeUnmount(() => {
  instance.destroy();
  instance = null;
});

defineExpose({
  resetForm() {
    form.value = {
      image: "",
      description: "",
    };
    instance.txt.clear();
  },
});
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
}
.container h3 {
  margin: 8px auto;
  font-size: 18px;
  font-weight: 500;
}
.img {
  margin-bottom: 10px;
}
.description {
  margin-bottom: 10px;
}
</style>
