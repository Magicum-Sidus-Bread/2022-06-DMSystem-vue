<template>
  <div class="body">
    <!-- #region -->
    <div class="head">
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <h4>销售额</h4>
            <el-tag type="success">昨日</el-tag>
          </div>
        </template>
        <div class="cardBody">
          <span>{{ saleStats.amountDay }}</span>
          <div class="increase">
            日环比 {{ saleStats.amountDayOnDay }} %
            <div class="arrow-up"></div>
          </div>
          <div class="increase">
            周环比 {{ saleStats.amountWeekOnWeek }} %
            <div class="arrow-down"></div>
          </div>
          <el-divider />
          <div class="footer">
            <span>本月销售额</span>
            <span>{{ saleStats.amountMonth }}元</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <h4>用户访问量</h4>
            <el-tag type="success">昨日</el-tag>
          </div>
        </template>
        <div class="cardBody">
          <span>{{ userStats.visitsDay }}</span>
          <div class="increase">
            日环比 {{ userStats.visitsDayOnDay }}%
            <div class="arrow-up"></div>
          </div>
          <div class="increase">
            周环比 {{ userStats.visitsWeekOnWeek }}%
            <div class="arrow-down"></div>
          </div>
          <el-divider />
          <div class="footer">
            <span>本月访问量</span>
            <span>{{ userStats.visitsMonth }}次</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <h4>订单量</h4>
            <el-tag type="success">昨日</el-tag>
          </div>
        </template>
        <div class="cardBody">
          <span>{{ saleStats.orderDay }}</span>
          <div class="increase">
            日环比 {{ saleStats.orderDayOnDay }}%
            <div class="arrow-up"></div>
          </div>
          <div class="increase">
            周环比 {{ saleStats.orderWeekOnWeek }}%
            <div class="arrow-down"></div>
          </div>
          <el-divider />
          <div class="footer">
            <span>本月订单量</span>
            <span>{{ saleStats.orderMonth }}笔</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <h4>新增用户</h4>
            <el-tag type="success">昨日</el-tag>
          </div>
        </template>
        <div class="cardBody">
          <span>{{ userStats.newUserDay }}</span>
          <div class="increase">
            日环比 {{ userStats.newUserDayOnDay }}%
            <div class="arrow-up"></div>
          </div>
          <div class="increase">
            周环比 {{ userStats.newUserWeekOnWeek }}%
            <div class="arrow-down"></div>
          </div>
          <el-divider />
          <div class="footer">
            <span>本月新增用户</span>
            <span>{{ userStats.newUserMonth }}个</span>
          </div>
        </div>
      </el-card>
    </div>
    <!-- #endregion -->
    <div class="sale">
      <el-card shadow="hover"
        ><template #header>
          <div class="card-header">
            <h4>销售走势</h4>
          </div>
        </template>
        <div class="contain">
          <div id="saleChart" class="saleChart"></div>
          <div class="rank">
            <!-- <h4>产品销量排行</h4> -->

            <el-tabs v-model="activeRank" class="demo-tabs">
              <el-tab-pane label="存款排行" name="deposit">
                <el-table
                  :data="saleStats.depositRank"
                  :show-header="false"
                  style="width: 100%"
                >
                  <el-table-column prop="name" width="width"></el-table-column>
                  <el-table-column
                    prop="number"
                    width="width"
                  ></el-table-column> </el-table
              ></el-tab-pane>
              <el-tab-pane label="贷款排行" name="loan">
                <el-table
                  :data="saleStats.loansRank"
                  :show-header="false"
                  style="width: 100%"
                >
                  <el-table-column prop="name" width="width"></el-table-column>
                  <el-table-column
                    prop="number"
                    width="width"
                  ></el-table-column> </el-table
              ></el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-card>
    </div>
    <div class="sale">
      <el-card shadow="hover"
        ><template #header>
          <div class="card-header">
            <h4>访问走势</h4>
          </div>
        </template>
        <div class="contain">
          <div id="visitChart" class="visithart"></div>
          <div id="customerPie" class="customerPie"></div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, toRaw, onUnmounted, onBeforeMount } from "vue";
import * as echarts from "echarts";
import { getUserStats, getSaleStats } from "apis/dashboard.js";

const activeRank = ref("deposit");

const userStats = ref({});
const saleStats = ref({});

let echart = echarts;

const initChart = () => {
  let saleChart = echart.init(document.getElementById("saleChart"));
  saleChart.setOption({
    legend: {},
    tooltip: {},
    dataset: {
      source: toRaw(saleStats.value.saleChart || []),
    },
    xAxis: { type: "category" },
    yAxis: { name: "销售额/元" },
    series: [{ type: "bar" }, { type: "bar" }],
  });

  let visitChart = echart.init(document.getElementById("visitChart"));
  visitChart.setOption({
    legend: {},
    tooltip: {},
    dataset: {
      source: toRaw(userStats.value.visitChart || []),
    },
    xAxis: { type: "category" },
    yAxis: { name: "访问量/次" },
    series: [
      {
        type: "line",
        smooth: true,
        areaStyle: {
          color: "#d0eafb",
        },
      },
    ],
  });

  let customerChart = echart.init(document.getElementById("customerPie"));
  customerChart.setOption({
    title: {
      text: "客户组成",
      left: "center",
      top: "center",
    },
    series: [
      {
        type: "pie",
        data: toRaw(saleStats.value.customerChart || []),
        radius: ["30%", "60%"],
        minAngle: 5,
        avoidLabeloverlap: true,
      },
    ],
    color: ["#ffdc60", "#5470c6", "#91cc75"],
  });
  window.onresize = function () {
    saleChart.resize();
    visitChart.resize();
    customerChart.resize();
  };
};
onBeforeMount(() => {
  Promise.all([getUserStats(), getSaleStats()])
    .then((res) => {
      if (res[0].code == 200) {
        userStats.value = res[0].data;
        userStats.value.visitChart = res[0].data.visitChart.reduce(
          (accumulation, value) => {
            const { date, number } = value;
            return [...accumulation, [date, number]];
          },
          []
        );
      }
      if (res[1].code == 200) {
        saleStats.value = res[1].data;
        saleStats.value.saleChart = res[1].data.saleChart.reduce(
          (accumulation, value) => {
            const { date, deposit, loans } = value;
            return [...accumulation, [date, deposit, loans]];
          },
          []
        );
        saleStats.value.customerChart = res[1].data.customerChart.reduce(
          (accumulation, val) => {
            return [...accumulation, { value: val.number, name: val.type }];
          },
          []
        );
        saleStats.value.saleChart.unshift(["product", "存款", "贷款"]);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => initChart());
});

onUnmounted(() => {
  echart.dispose;
});
</script>

<style scoped>
/* #region */
.body {
  display: flex;
  flex-direction: column;
  /* height: 100%; */
}
.head {
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;
  justify-content: space-between;
}
:deep(.el-card__header) {
  padding: 8px 18px !important;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
:deep(.el-card__body) {
  padding: 10px 10px 6px 10px;
}
.box-card {
  flex: 0 0 25%;
  box-sizing: border-box;
  max-width: 24%;
}
.cardBody {
  color: #515a6e;
}
.cardBody > span:first-child {
  display: block;
  margin-bottom: 10px;
  font-size: 30px;
}
.increase {
  display: inline-block;
  font-size: 13px;
  margin: 12px 2px 6px 2px;
}
.arrow-up {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 5px solid #67c23a;
}
.arrow-down {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 5px solid #f56c6c;
}
.el-divider--horizontal {
  margin: 6px 0;
}
.head .footer {
  display: flex;
  justify-content: space-between;
  margin: 0px 4px;
}
.head .footer span {
  font-size: 14px;
  line-height: 22px;
}
/* #endregion */
.sale {
  flex: 1;
  margin: 15px 0 10px 0;
}
.sale .el-card {
  height: 100%;
}
.sale .contain {
  display: flex;
  width: 100%;
  min-height: 310px;
  max-height: 600px;
  margin-top: 4px;
  margin-bottom: -29px;
}
.saleChart {
  display: block;
  flex: 1 0 74%;
  min-width: 74%;
  max-width: 74%;
  margin-right: 10px;
  background-color: #fff;
}
.rank {
  display: block;
  flex: 0 0 23%;
  min-width: 23%;
  max-width: 23%;
  background-color: #fff;
}
.rank h4 {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 12px 12px;
}
.visithart {
  display: block;
  flex: 1 0 70%;
  min-width: 70%;
  max-width: 70%;
  margin-right: 5px;
  background-color: #fff;
}
.customerPie {
  display: block;
  flex: 1 1 30%;
  min-width: 30%;
  max-width: 30%;
  margin-top: -14px;
  margin-right: 10px;
}
ul {
  list-style: none;
}
</style>
