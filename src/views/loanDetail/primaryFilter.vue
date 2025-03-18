<template>
  <div class="ruleList">
    <el-card class="box-card">
      <template #header>
        <h2>初筛规则</h2>
      </template>
      <el-table :data="ruleList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="" />
        <el-table-column prop="name" label="规则名称" width="" />
        <el-table-column prop="description" label="描述" width="" />
        <el-table-column label="决策类型" width="">
          <template #default="scope">
            <span v-if="scope.row.type == 0">等于</span>
            <span v-else-if="scope.row.type == 1">大于</span>
            <span v-else-if="scope.row.type == 2">小于</span>
            <span v-else-if="scope.row.type == 3">大于A，小于B</span>
            <span v-else>属于</span></template
          >
        </el-table-column>
        <el-table-column prop="value" label="决策数值" width="" />
        <el-table-column prop="variable" label="驱动变量" width="" />
        <el-table-column label="风险控制" width="">
          <template #default="scope">
            <el-tag v-if="scope.row.control == 0" type="danger">拒绝</el-tag>
            <el-tag v-else type="success">通过</el-tag></template
          >
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <div class="filterResult">
    <el-card class="box-card">
      <template #header>
        <h2>初筛结果</h2>
      </template>
      <el-table :data="resultList" border style="width: 100%">
        <el-table-column prop="userId" label="用户ID" width="" />
        <el-table-column prop="avatar" label="头像" width="65">
          <template #default="scope">
            <el-avatar :src="scope.row.avatar"></el-avatar></template
        ></el-table-column>
        <el-table-column prop="username" label="用户名" width="" />
        <el-table-column prop="phone" label="手机号" width="" />
        <el-table-column prop="result" label="初筛结果" width="">
          <template #default="scope">
            <el-tag v-if="scope.row.result == 0" type="danger">拒绝</el-tag>
            <el-tag v-else-if="scope.row.result == 1" type="success">通过</el-tag>
            <el-tag v-else-if="scope.row.result == 2" type="wanning">初筛未完成</el-tag>
            <el-tag v-else type="wanning">初筛数据不存在</el-tag></template
          ></el-table-column
        >
        <el-table-column label="未通过规则" width="">
          <template #default="scope">
            <ul>
              <li v-for="(item, index) in scope.row.reason" :key="index">
                {{ item.name }}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" width="" />
      </el-table>
      <el-pagination
        v-model:currentPage="query.page"
        :page-size="query.size"
        layout="prev, pager, next, jumper"
        :total="count"
        @current-change="getResultList"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
``

<script setup>
import { ref, onBeforeMount } from "vue";
import { getLoanRuleList } from "apis/rule.js";
import { getLoanFilterResult } from "apis/customer.js";
const props = defineProps({
  id: {
    type: Number,
  },
});
const ruleList = ref([]);
const query = ref({
  id: props.id,
  page: 1,
  size: 10,
  username: "",
  startTime: "",
  endTime: "",
});
const count = ref(0);
const resultList = ref([]);
const getResultList = () => {
  getLoanFilterResult(query.value)
    .then((res) => {
      if (res.code == 200) {
        count.value = res.data.count;
        resultList.value = res.data.resultList;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
onBeforeMount(() => {
  getLoanRuleList({
    id: props.id,
  })
    .then((res) => {
      if (res.code == 200) {
        ruleList.value = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  getResultList();
});
</script>

<style scoped>
.ruleList {
  margin-bottom: 10px;
}
.ruleList h2 {
  font-weight: 400;
  font-size: 15px;
}
.filterResult h2 {
  font-weight: 400;
  font-size: 15px;
}
.el-pagination {
  justify-content: center;
  margin-top: 5px;
}
</style>
