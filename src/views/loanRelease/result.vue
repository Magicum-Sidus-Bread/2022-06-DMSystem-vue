<template>
  <div>
    <el-result
      v-if="props.isModify"
      icon="success"
      title="操作成功"
      sub-title="贷款产品修改成功"
    >
      <template #extra>
        <el-button @click="detail" type="primary">查看详情</el-button>
      </template>
    </el-result>
    <el-result v-else icon="success" title="操作成功" sub-title="贷款产品已发布">
      <template #extra>
        <el-button @click="again" type="primary">继续发布</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  isModify: {
    type: Boolean,
    default: false,
  },
  id: null,
});
const detail = () => {
  router.push({
    path: "/loanDetail",
    query: {
      id: props.id,
    },
  });
};
const emit = defineEmits(["emitAgain"]);
const again = () => {
  emit("emitAgain");
};
</script>

<style scoped></style>
