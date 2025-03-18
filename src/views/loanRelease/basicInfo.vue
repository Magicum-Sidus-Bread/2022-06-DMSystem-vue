<template>
  <div class="container">
    <el-form
      ref="basicInfoRef"
      :model="basicInfo"
      :rules="rules"
      label-width="120px"
      label-position="right"
      class="demo-ruleForm"
      size="large"
    >
      <el-form-item v-if="basicInfo.id" label="产品ID" prop="totalPrice">
        <el-input v-model.number="basicInfo.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="basicInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="出售时间" prop="timeRange"
        ><el-date-picker
          v-model="basicInfo.timeRange"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker
      ></el-form-item>
      <el-form-item label="单份价格" prop="price">
        <el-input v-model.number="basicInfo.price"
          ><template #append>元</template></el-input
        >
      </el-form-item>
      <el-form-item label="产品总数" prop="totalNumber">
        <el-input v-model.number="basicInfo.totalNumber"
          ><template #append>份</template></el-input
        >
      </el-form-item>
      <el-form-item label="活动总价" prop="totalPrice">
        <el-input v-model.number="basicInfo.totalPrice" disabled
          ><template #append>元</template></el-input
        >
      </el-form-item>
      <el-form-item label="限购份数" prop="restrictNumber">
        <el-input v-model.number="basicInfo.restrictNumber"
          ><template #append>份</template></el-input
        >
      </el-form-item>
      <el-form-item prop="repeatTimes">
        <template #label>
          <el-tooltip raw-content placement="bottom" effect="light">
            <template #content>
              <span class="tooltipSpan">第一次秒杀结束后，再次自启活动次数</span>
            </template>
            <span>重复次数</span>
          </el-tooltip>
        </template>
        <el-input v-model.number="basicInfo.repeatTimes"
          ><template #append>次</template></el-input
        >
      </el-form-item>
      <el-form-item prop="repeatDelay">
        <template #label>
          <el-tooltip raw-content placement="bottom" effect="light">
            <template #content>
              <span class="tooltipSpan">活动自启距上一次活动结束时间</span>
            </template>
            <span>重复延时</span>
          </el-tooltip>
        </template>
        <el-input v-model.number="basicInfo.repeatDelay"
          ><template #append>天</template></el-input
        > </el-form-item
      ><el-form-item>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm(basicInfoRef)"
          >下一步</el-button
        ></el-form-item
      >
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, watch, getCurrentInstance, onBeforeMount } from "vue";

const props = defineProps({
  info: {},
});

const basicInfo = ref({
  name: "",
  startTime: "",
  endTime: "",
  price: null,
  totalNumber: null,
  totalPrice: null,
  restrictNumber: null,
  timeRange: "",
  repeatTimes: 0,
  repeatDelay: 1,
});

watch(
  () => basicInfo.value.timeRange,
  (value, pre) => {
    basicInfo.value.startTime = value?.[0];
    basicInfo.value.endTime = value?.[1];
  }
);

watch(
  () => [basicInfo.value.price, basicInfo.value.totalNumber],
  ([newPrice, newNumber], [oldPrice, oldNumber]) => {
    basicInfo.value.totalPrice = newPrice * newNumber;
  }
);

const basicInfoRef = ref();

const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入产品名称",
      trigger: "blur",
    },
  ],
  timeRange: [
    {
      required: true,
      type: "array",
      fields: {
        0: { type: "string", required: true, message: "请选择开始日期" },
        1: { type: "string", required: true, message: "请选择结束日期" },
      },
      trigger: "blur",
      message: "请选择日期区间",
    },
  ],
  price: [
    {
      required: true,
      message: "请输入产品单价",
      trigger: "blur",
    },
    { type: "number", message: "单价必须为数字" },
  ],
  totalNumber: [
    {
      required: true,
      message: "请输入秒杀份数",
      trigger: "blur",
    },
    { type: "number", message: "秒杀份数数量必须为数字" },
  ],
  totalPrice: [
    {
      required: true,
      message: "请输入活动总价",
      trigger: "blur",
    },
    { type: "number", message: "活动总价必须为数字" },
  ],
  restrictNumber: [
    {
      required: true,
      message: "请输入限购份数",
      trigger: "blur",
    },
    { type: "number", message: "限购份数必须为数字" },
  ],
  repeatTimes: [
    {
      required: true,
      message: "请输入重复次数",
      trigger: "blur",
    },
    { type: "number", message: "重复次数必须为数字" },
  ],
  repeatDelay: [
    {
      required: true,
      message: "请输入重复延时",
      trigger: "blur",
    },
    {
      type: "number",
      message: "重复延时必须为数字",
    },
    {
      validator: (rule, value, callback) => {
        if (basicInfo.value.repeatTimes === 0) {
          callback();
        }
        // let firstEnd =
        //   Date.parse(basicInfo.value.startTime) + value * 24 * 60 * 60 * 1000;
        // let interval = firstEnd - Date.parse(basicInfo.value.endTime);
        if (value * 24 * 60 * 60 * 1000 < 1000 * 60 * 60 * 2) {
          callback(new Error("秒杀活动间隔至少预留2小时进行活动预处理!"));
        } else {
          callback();
        }
      },
      message: "秒杀活动间隔至少预留2小时进行活动预处理!",
      trigger: "blur",
    },
  ],
});

const emit = defineEmits(["emitBasicInfo"]);

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      emit("emitBasicInfo", basicInfo.value);
    } else {
      return false;
    }
  });
};

const { ctx } = getCurrentInstance();
const resetForm = () => {
  const formEl = ctx.$refs.basicInfoRef;
  if (!formEl) return;
  formEl.resetFields();
};

onBeforeMount(() => {
  basicInfo.value = {
    ...basicInfo.value,
    ...props.info,
  };
  basicInfo.value.timeRange = [basicInfo.value.startTime, basicInfo.value.endTime];
});

defineExpose({
  resetForm,
});
</script>

<style scoped>
.container {
  width: 518px;
  margin: 0 auto;
  text-align: center;
}
.tooltipSpan {
  font-size: 13px;
}
</style>
