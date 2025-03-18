<template>
  <div class="orderList">
    <el-card class="box-card">
      <template #header>
        <h2>成交订单</h2>
      </template>
      <el-table :data="orderList" border style="width: 100%">
        <el-table-column prop="id" label="订单ID" width="" />
        <el-table-column prop="username" label="用户名" width="" />
        <el-table-column prop="userId" label="用户ID" width="" />
        <el-table-column prop="number" label="购买数量" width="" />
        <el-table-column prop="totalPrice" label="成交金额" width="" />
        <el-table-column prop="createTime" label="成交时间" width="" />
        <el-table-column prop="status" label="订单状态" width="">
          <template #default="scope">
            <el-tag v-if="scope.row.status == 0" type="warning">待支付</el-tag>
            <el-tag v-else-if="scope.row.status == 1" type="success">已完成</el-tag
            ><el-tag v-else type="danger">已退款</el-tag></template
          ></el-table-column
        >
      </el-table>
      <el-pagination
        v-model:currentPage="query.page"
        :page-size="query.size"
        layout="prev, pager, next, jumper"
        :total="count"
        @current-change="getOrderList"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { getDepositOrderList } from "apis/good.js";
const props = defineProps({
  id: {
    type: Number,
  },
});
const query = reactive({
  id: props.id,
  page: 1,
  size: 10,
  orderId: null,
  username: "",
  startTime: "",
  endTime: "",
});
const count = ref(0);
const orderList = ref([]);
const getOrderList = () => {
  getDepositOrderList(query)
    .then((res) => {
      if (res.code == 200) {
        count.value = res.data.count;
        orderList.value = res.data.orderList;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
onBeforeMount(() => {
  getOrderList();
});
</script>

<style scoped>
.orderList {
  margin-bottom: 10px;
}
.orderList h2 {
  font-weight: 400;
  font-size: 15px;
}
.el-pagination {
  justify-content: center;
  margin-top: 5px;
}
</style>
