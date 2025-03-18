<template>
  <div class="container">
    <div class="check">
      <h3>启用引擎</h3>
      <el-switch
        v-model="data.isFilter"
        inline-prompt
        active-text="是"
        inactive-text="否"
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
    </div>
    <div class="ruleList">
      <h3>筛选规则</h3>
      <div class="transfer">
        <div style="text-align: center">
          <el-transfer
            v-model="rightValue"
            :data="ruleOptions"
            :props="{
              key: 'id',
              label: 'name',
            }"
            @change="handleTransferChange"
            filterable
            :titles="['规制列表', '已选择']"
            :button-texts="['移除', '添加']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}',
            }"
            style="text-align: left; display: inline-block"
          >
            <template #default="{ option }"
              ><el-popover
                :width="500"
                placement="right"
                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
              >
                <template #reference>{{ option.name }} </template>
                <template #default>
                  <el-descriptions
                    :title="option.name"
                    direction="vertical"
                    :column="3"
                    border
                  >
                    <el-descriptions-item label="决策类型">
                      <span v-if="option.type == 0">等于</span>
                      <span v-else-if="option.type == 1">大于</span>
                      <span v-else-if="option.type == 2">小于</span>
                      <span v-else-if="option.type == 3">大于A，小于B</span>
                      <span v-else>属于</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="决策数值">{{
                      option.value
                    }}</el-descriptions-item>
                    <el-descriptions-item label="驱动变量">{{
                      option.variable
                    }}</el-descriptions-item>
                    <el-descriptions-item label="风险控制">
                      <el-tag v-if="option.control == 0" type="danger">拒绝</el-tag>
                      <el-tag v-else type="success">通过</el-tag></el-descriptions-item
                    >
                    <el-descriptions-item label="规制描述">{{
                      option.description
                    }}</el-descriptions-item>
                  </el-descriptions>
                </template>
              </el-popover>
            </template>
            <template #left-footer>
              <el-select
                v-model="ruleGroupSelect"
                @change="handleGroupChange"
                multiple
                clearable
                filterable
                collapse-tags
                collapse-tags-tooltip
                placeholder="选择规则组合"
              >
                <el-option
                  v-for="item in ruleGroups"
                  :key="item.id"
                  :label="item.name"
                  :value="item.rulesStr"
                >
                  <el-popover
                    :width="100"
                    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
                    placement="right"
                  >
                    <template #reference>
                      <div class="ruleGroupItem">{{ item.name }}</div>
                    </template>
                    <template #default
                      ><ul>
                        <li v-for="(rule, index) in item.ruleList" :key="index">
                          <el-popover
                            :width="500"
                            placement="right"
                            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
                          >
                            <template #reference>{{ rule.name }} </template>
                            <template #default>
                              <el-descriptions
                                :title="rule.name"
                                direction="vertical"
                                :column="3"
                                border
                              >
                                <el-descriptions-item label="决策类型">
                                  <span v-if="rule.type == 0">等于</span>
                                  <span v-else-if="rule.type == 1">大于</span>
                                  <span v-else-if="rule.type == 2">小于</span>
                                  <span v-else-if="rule.type == 3">大于A，小于B</span>
                                  <span v-else>属于</span>
                                </el-descriptions-item>
                                <el-descriptions-item label="决策数值">{{
                                  rule.value
                                }}</el-descriptions-item>
                                <el-descriptions-item label="驱动变量">{{
                                  rule.variable
                                }}</el-descriptions-item>
                                <el-descriptions-item label="风险控制">
                                  <el-tag v-if="rule.control == 0" type="danger"
                                    >拒绝</el-tag
                                  >
                                  <el-tag v-else type="success"
                                    >通过</el-tag
                                  ></el-descriptions-item
                                >
                                <el-descriptions-item label="规制描述">{{
                                  rule.description
                                }}</el-descriptions-item>
                              </el-descriptions>
                            </template>
                          </el-popover>
                        </li>
                      </ul></template
                    >
                  </el-popover>
                </el-option>
              </el-select>

              <el-button class="transfer-footer" size="small">规制组合</el-button>
            </template>
          </el-transfer>
        </div>
      </div>
    </div>
    <div class="btns">
      <el-button @click="back">上一步</el-button>
      <el-button v-if="props.isModify" type="primary" @click="submit">确认修改</el-button>
      <el-button v-else type="primary" @click="submit">发布贷款</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { getRuleList, getRuleGroupList } from "apis/rule.js";

const props = defineProps({
  isModify: {
    type: Boolean,
    default: false,
  },
  isFilter: {
    type: String,
    default: "0",
  },
  ruleList: [],
});

const data = ref({
  isFilter: 0,
  ruleList: [],
});

const ruleOptions = ref([]);
const initRuleOptions = () => {
  getRuleList({
    name: "",
    type: null,
    page: 1,
    size: 100000,
  })
    .then((res) => {
      if (res.code == 200) {
        ruleOptions.value = res.data.ruleList;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const leftValue = ref([]);
const rightValue = ref([]);

const ruleGroups = ref([]);
const ruleGroupSelect = ref([]);

const handleTransferChange = (val) => {
  ruleGroupSelect.value.forEach((rules) => {
    rules = JSON.parse(rules);
    rightValue.value.push(...rules);
  });
  rightValue.value = Array.from(new Set(rightValue.value));
};

const initRuleGroups = () => {
  getRuleGroupList({
    page: 1,
    size: 1000,
  })
    .then((res) => {
      if (res.code == 200) {
        ruleGroups.value = res.data.ruleGroupList;
        ruleGroups.value.forEach((ruleGroup) => {
          let ruleArr = [];
          ruleGroup?.ruleList.forEach((rule) => ruleArr.push(rule.id));
          ruleGroup["rulesStr"] = JSON.stringify(ruleArr);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleGroupChange = (rulesArr) => {
  rulesArr.forEach((rules) => {
    rules = JSON.parse(rules);
    rightValue.value.push(...rules);
  });
  rightValue.value = Array.from(new Set(rightValue.value));
};

const emit = defineEmits(["emitRule", "prev"]);
const submit = () => {
  data.value.ruleList = [];
  if (data.value.isFilter == 1) {
    data.value.ruleList = rightValue.value;
  }
  emit("emitRule", data.value);
};
const back = () => {
  emit("prev");
};

onBeforeMount(() => {
  initRuleOptions();
  initRuleGroups();
  data.value.isFilter = props.isFilter;
  data.value.ruleList = props.ruleList;
});

defineExpose({
  resetForm() {
    data.value.isFilter = 0;
    data.value.ruleList = [];
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  text-align: center;
}
.container h3 {
  margin: 0 10px 10px 0;
  font-size: 18px;
  font-weight: 500;
}
.check {
  display: flex;
  align-items: center;
}
.ruleList {
  display: flex;
  align-items: flex-start;
}
.btns {
  margin: 15px auto 10px auto;
}
:deep(.el-transfer-panel .el-transfer-panel__footer) {
  padding-left: 10px;
}
:deep(.el-transfer-panel__footer) {
  padding: 0 4px !important;
  border-top: 0px;
}
ul {
  list-style: none;
}
</style>
