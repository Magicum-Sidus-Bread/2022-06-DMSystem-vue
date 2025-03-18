<template>
  <el-card class="box-card" shadow="hover">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="基本信息" :icon="Document"></el-step>
      <el-step title="产品描述" :icon="EditPen"></el-step>
      <el-step title="规则配置" :icon="SetUp"></el-step>
    </el-steps>
    <div class="contain">
      <basicInfo
        :info="goodForm"
        v-if="!isModify || goodForm.name"
        ref="basicInfoRef"
        @emitBasicInfo="emitBasicInfo"
        v-show="active == 0"
      />
      <description
        v-if="!isModify || goodForm.name"
        :image="goodForm.image"
        :description="goodForm.description"
        ref="descriptionRef"
        @emitDescription="emitDescription"
        @prev="prev"
        v-show="active == 1"
      ></description>
      <rule
        v-if="!isModify || goodForm.name"
        :isModify="isModify"
        :isFilter="goodForm.isFilter"
        :ruleList="goodForm.ruleList"
        ref="ruleRef"
        @emitRule="emitRule"
        @prev="prev"
        v-show="active == 2"
      />
      <result
        v-if="!isModify || goodForm.name"
        :id="goodForm.id"
        :isModify="isModify"
        @emitAgain="again"
        v-show="active == 3"
      />
    </div>
  </el-card>
</template>

<script setup>
import { ref, getCurrentInstance, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { Document, EditPen, SetUp } from "@element-plus/icons-vue";
import { addDeposit, getDepositDetail, updateDeposit } from "apis/good.js";
import basicInfo from "./basicInfo.vue";
import description from "./description.vue";
import rule from "./rule.vue";
import result from "./result.vue";

const router = useRouter();
const isModify = router.currentRoute.value.query["isModify"] ? true : false;
const id = router.currentRoute.value.query["id"] || undefined;

const active = ref(0);

const goodForm = ref({
  id: null,
  name: "",
  startTime: "",
  endTime: "",
  price: null,
  totalNumber: null,
  totalPrice: null,
  restrictNumber: null,
  image: "",
  description: "",
  isFilter: "0",
  ruleList: [],
  repeatDelay: 1,
  repeatTimes: 0,
});

const emitBasicInfo = (val) => {
  goodForm.value = { ...goodForm.value, ...val };
  delete goodForm.value["timeRange"];
  active.value = 1;
};

const emitDescription = (val) => {
  goodForm.value = { ...goodForm.value, ...val };
  active.value = 2;
};

const emitRule = (val) => {
  goodForm.value = { ...goodForm.value, ...val };
  if (isModify) {
    updateDeposit(goodForm.value)
      .then((res) => {
        if (res.code == 200) {
          ElMessage.success(res.msg);
          active.value = 3;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addDeposit(goodForm.value)
      .then((res) => {
        if (res.code == 200) {
          ElMessage.success(res.msg);
          active.value = 3;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const prev = () => {
  active.value = active.value - 1;
};

const { ctx } = getCurrentInstance();
const basicInfoRef = ref();
const descriptionRef = ref();
const ruleRef = ref();
const again = () => {
  basicInfoRef.value.resetForm();
  descriptionRef.value.resetForm();
  ruleRef.value.resetForm();
  active.value = 0;
};

onBeforeMount(() => {
  if (isModify && id) {
    getDepositDetail({ id: id })
      .then((res) => {
        if (res.code == 200) {
          console.log(goodForm);
          goodForm.value = {
            ...goodForm.value,
            ...res.data,
          };
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
</script>

<style scoped>
.contain {
  margin-top: 40px;
}
.box-card {
  max-width: 1280;
  margin: 0 auto;
}
</style>
