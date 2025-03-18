<template>
  <div class="basicInfo">
    <el-image :src="goodForm.image" fit="contain" alt="产品图片"></el-image>
    <div class="info">
      <el-descriptions :title="goodForm.name">
        <el-descriptions-item label="开始时间">{{
          goodForm.startTime
        }}</el-descriptions-item>
        <el-descriptions-item label="结束时间">{{
          goodForm.endTime
        }}</el-descriptions-item>
        <el-descriptions-item label="活动状态">
          <el-tag v-if="goodForm.status == 0" type="info">未开始</el-tag>
          <el-tag v-else-if="goodForm.status == 1">进行中</el-tag>
          <el-tag v-else type="success">已结束</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="产品单价"
          >{{ goodForm.price }}
        </el-descriptions-item>
        <el-descriptions-item label="活动总价"
          >{{ goodForm.totalPrice }}
        </el-descriptions-item>
        <el-descriptions-item label="限购数量"
          >{{ goodForm.restrictNumber }}
        </el-descriptions-item>
        <el-descriptions-item label="活动总数"
          >{{ goodForm.totalNumber }}
        </el-descriptions-item>
        <el-descriptions-item label="剩余数量"
          >{{ goodForm.remainNumber }}
        </el-descriptions-item>
        <el-descriptions-item label="是否初筛">
          <el-tag v-if="goodForm.isFilter == 0" type="success">否</el-tag>
          <el-tag v-else type="warning">是</el-tag></el-descriptions-item
        >
      </el-descriptions>
    </div>
  </div>
  <div class="contain">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="产品描述" name="richText">
        <div class="richText" :innerHTML="goodForm.description"></div>
      </el-tab-pane>
      <el-tab-pane label="客户初筛" name="filter"
        ><primaryFilter :id="goodForm.id"
      /></el-tab-pane>
      <el-tab-pane label="销售情况" name="sale"> <order :id="goodForm.id" /> </el-tab-pane
    ></el-tabs>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { getDepositDetail } from "apis/good.js";
import primaryFilter from "./primaryFilter.vue";
import order from "./order.vue";

const router = useRouter();
const goodForm = ref({
  id: Number.parseInt(router.currentRoute.value.query["id"]),
  name: "",
  iamge: "",
  startTime: "",
  endTime: "",
  price: null,
  totalNumber: null,
  totalPrice: null,
  remainNumber: null,
  restrictNumber: null,
  description: "",
  isFilter: "0",
  ruleList: [],
  status: null,
});
const activeName = ref("richText");
const handleClick = (tab, event) => {
  //   console.log(tab, event);
};

onMounted(() => {
  getDepositDetail({ id: Number.parseInt(router.currentRoute.value.query["id"]) })
    .then((res) => {
      if (res.code == 200) {
        goodForm.value = { ...res.data };
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style scoped>
.basicInfo {
  display: flex;
}
.info {
  display: inline-block;
}
.header {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
}
.el-image {
  width: 100px;
  height: 100px;
  margin-right: 15px;
}
:deep(.el-descriptions__body) {
  background-color: #f9f9f9;
}
:deep(.el-descriptions__body
    .el-descriptions__table:not(.is-bordered)
    .el-descriptions__cell) {
  padding-right: 20px;
  padding-bottom: 5px;
}
</style>
