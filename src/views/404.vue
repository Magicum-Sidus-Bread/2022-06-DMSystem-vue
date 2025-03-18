<template>
  <el-result title="未找到页面">
    <template #icon>
      <el-image
        src="https://xzj-pic-1306183757.cos.ap-nanjing.myqcloud.com/picgo/404.png"
      />
    </template>
    <template #extra>
      <el-button type="primary" @click="back">回到首页</el-button>
    </template>
  </el-result>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const back = () => {
  router.push("/");
};
</script>

<style scoped>
.el-result {
  margin-top: 100px;
}
</style>
