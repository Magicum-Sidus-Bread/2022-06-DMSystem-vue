<template>
  <el-container class="container">
    <el-aside class="aside" width="200px">
      <el-scrollbar>
        <div :class="[{ logoCollapse: isCollapse }, { logoNoCollapse: !isCollapse }]">
          <el-avatar
              src="https://xzj-pic-1306183757.cos.ap-nanjing.myqcloud.com/picgo/摘月白底.jpg"
              :size="38"
              alt="HY-12小组"
          >
          </el-avatar>

          <h1 v-show="!isCollapse">HY-12小组</h1>
        </div>
        <el-menu
            :default-active="active"
            unique-opened
            text-color="#fff"
            active-text-color="#fff"
            router
            mode="vertical"
            :collapse="isCollapse"
        >
          <!-- <el-menu
          :default-active="active"
          unique-opened
          router
          mode="vertical"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
        > -->

          <el-menu-item index="personal_module" route="/fileShow">
            <el-icon>
              <Tickets/>
            </el-icon>
            <template #title>个人模块</template>
          </el-menu-item>
		  
		  
		  <el-menu-item index="team_module" route="/TeamList">
		   <el-icon>
		     <user/>
		   </el-icon>
		    <template #title>团队模块</template>
		  </el-menu-item>
		  
          <!-- <el-sub-menu index="team_management">
            <template #title>
              <el-icon>
                <user/>
              </el-icon>
              <span>团队模块</span>
            </template>
            <el-menu-item index="teamdocuments" route="/TeamDocuments">创建团队</el-menu-item>
            <el-menu-item index="teamlist" route="/TeamList"><el-icon>
                <user/>
              </el-icon>团队列表</el-menu-item>

          </el-sub-menu> -->

		  <el-menu-item index="personalInfo" route="/personalInfo">
		    <el-icon>
		      <odometer/>
		    </el-icon>
		    <template #title>个人信息</template>
		  </el-menu-item>


          <!-- <el-menu-item index="dashboard" route="/dashboard">
            <el-icon><odometer /></el-icon>
            <template #title>仪表盘</template>
          </el-menu-item>
          <el-menu-item index="orderManage" route="/orderManage">
            <el-icon><tickets /></el-icon>
            <template #title>订单管理</template>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><wallet /></el-icon>
              <span>存款秒杀</span>
            </template>
            <el-menu-item index="depositList" route="/depositList">存款列表</el-menu-item>
            <el-menu-item index="depositRelease" route="/depositRelease"
              >存款发布</el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu style="sub-menu" index="4">
            <template #title>
              <el-icon><credit-card /></el-icon>
              <span>贷款产品</span>
            </template>
            <el-menu-item index="loanList" route="/loanList">贷款列表</el-menu-item>
            <el-menu-item index="loanRelease" route="/loanRelease">贷款发布</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><finished /></el-icon>
              <span>决策引擎</span>
            </template>
            <el-menu-item index="ruleList" route="/ruleList">规则列表</el-menu-item>
            <el-menu-item index="ruleGroup" route="/ruleGroup">规则组合</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="6">
            <template #title>
              <el-icon><user /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="customerList" route="/customerList"
              >客户列表</el-menu-item
            >
            <el-menu-item index="adminList" route="/adminList">管理员列表</el-menu-item>
          </el-sub-menu> -->
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <el-header>
        <div class="left">
          <el-icon color="#fff" v-show="!isCollapse" @click="isCollapse = true"
          >
            <fold
            />
          </el-icon>
          <el-icon color="#fff" v-show="isCollapse" @click="isCollapse = false"
          >
            <expand
            />
          </el-icon>
          <h2>{{ routeMetaName }}</h2>
        </div>
        <div class="right">
          <el-dropdown>
            <div class="usr">
              <el-icon @click="handleRefresh">
                <refresh/>
              </el-icon>
              <el-avatar :size="31" :src="userInfo.avatar"></el-avatar>
              <span>{{ userInfo.username }}</span>
              <el-icon color="#6a748b" :size="14">
                <arrow-down/>
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="loginout"
                >
                  <el-icon>
                    <switch-button/>
                  </el-icon
                  >
                  <span>退出登录</span></el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <div class="routerView">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
var test=localStorage.getItem("userid")
if(test==null){
  window.location.href = "http://10.131.167.11:8082/login"
}

window.alert = function(msg, callback) {
  var div = document.createElement("div");
  div.innerHTML = "<style type=\"text/css\">"
      + ".nbaMask { position: fixed; z-index: 1000; top: 0; right: 0; left: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); }                                                                                                                                                                       "
      + ".nbaMaskTransparent { position: fixed; z-index: 1000; top: 0; right: 0; left: 0; bottom: 0; }                                                                                                                                                                                            "
      + ".nbaDialog { position: fixed; z-index: 5000; width: 80%; max-width: 300px; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); background-color: #fff; text-align: center; border-radius: 8px; overflow: hidden; opacity: 1; color: white; }"
      + ".nbaDialog .nbaDialogHd { padding: .2rem .27rem .08rem .27rem; }                                                                                                                                                                                                                         "
      + ".nbaDialog .nbaDialogHd .nbaDialogTitle { font-size: 17px; font-weight: 400; }                                                                                                                                                                                                           "
      + ".nbaDialog .nbaDialogBd { padding: 0 .27rem; font-size: 15px; line-height: 1.3; word-wrap: break-word; word-break: break-all; color: #000000; }                                                                                                                                          "
      + ".nbaDialog .nbaDialogFt { position: relative; line-height: 48px; font-size: 17px; display: -webkit-box; display: -webkit-flex; display: flex; }                                                                                                                                          "
      + ".nbaDialog .nbaDialogFt:after { content: \" \"; position: absolute; left: 0; top: 0; right: 0; height: 1px; border-top: 1px solid #e6e6e6; color: #e6e6e6; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleY(0.5); transform: scaleY(0.5); }               "
      + ".nbaDialog .nbaDialogBtn { display: block; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; color: #09BB07; text-decoration: none; -webkit-tap-highlight-color: transparent; position: relative; margin-bottom: 0; }                                                                       "
      + ".nbaDialog .nbaDialogBtn:after { content: \" \"; position: absolute; left: 0; top: 0; width: 1px; bottom: 0; border-left: 1px solid #e6e6e6; color: #e6e6e6; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleX(0.5); transform: scaleX(0.5); }             "
      + ".nbaDialog a { text-decoration: none; -webkit-tap-highlight-color: transparent; }"
      + "</style>"
      + "<div id=\"dialogs2\" style=\"display: none\">"
      + "<div class=\"nbaMask\"></div>"
      + "<div class=\"nbaDialog\">"
      + "	<div class=\"nbaDialogHd\">"
      + "		<strong class=\"nbaDialogTitle\"></strong>"
      + "	</div>"
      + "	<div class=\"nbaDialogBd\" id=\"dialog_msg2\">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>"
      + "	<div class=\"nbaDialogHd\">"
      + "		<strong class=\"nbaDialogTitle\"></strong>"
      + "	</div>"
      + "	<div class=\"nbaDialogFt\">"
      + "		<a href=\"javascript:;\" class=\"nbaDialogBtn nbaDialogBtnPrimary\" id=\"dialog_ok2\">确定</a>"
      + "	</div></div></div>";
  document.body.appendChild(div);

  var dialogs2 = document.getElementById("dialogs2");
  dialogs2.style.display = 'block';

  var dialog_msg2 = document.getElementById("dialog_msg2");
  dialog_msg2.innerHTML = msg;

  // var dialog_cancel = document.getElementById("dialog_cancel");
  // dialog_cancel.onclick = function() {
  // dialogs2.style.display = 'none';
  // };
  var dialog_ok2 = document.getElementById("dialog_ok2");
  dialog_ok2.onclick = function() {
    dialogs2.style.display = 'none';
    callback();
  };
};

import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

import {
  Odometer,
  Tickets,
  Wallet,
  CreditCard,
  Finished,
  User,
  Fold,
  Refresh,
  Expand,
  ArrowDown,
  SwitchButton,
} from "@element-plus/icons-vue";
// import {getAdminInfo} from "apis/admin.js";
// import {removeToken} from "utils/auth.js";


const route = useRoute();
const router = useRouter();

const active = ref("dashboard");
const routeMetaName = ref("个人文件层级页面");

watch(route, () => {
  active.value = route.name;
  routeMetaName.value = route.meta.title;
});

const isCollapse = ref(false);
const userInfo = ref({
  name: "",
  idCard: "",
  username: "管理员",
  avatar: "https://xzj-pic-1306183757.cos.ap-nanjing.myqcloud.com/picgo/摘月蓝底.jpg",
  phone: "",
});

const loginout = () => {
  localStorage.clear()
  window.location.href="http://10.131.167.11:8082/login"
};
const handleRefresh = () => {
  router.go();
};

// onMounted(() => {
//   active.value = route.name;
//   getAdminInfo()
//       .then((res) => {
//         if (res.code == 200) {
//           userInfo.value = res.data;
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// });
</script>

<style scoped>
.container {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  display: none;
}

.aside {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  background-color: #001529;
}

aside.el-aside.aside {
  width: auto;
}

.logoCollapse {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 0px 10px 0;
}

.logoNoCollapse {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 0px 10px 16px;
}

.logoNoCollapse h1 {
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  margin: 20px 27px 20px 13px;
}

.el-main {
  background-color: #f9f9f9;
}

.avatar-container {
  margin-bottom: 20px;
  text-align: center;
}

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
}

i.el-icon {
  margin-right: 10px;
}

.user i {
  font-size: 14px;
  cursor: pointer;
}

.el-menu {
  border-right: 0;
  height: 100%;
  background-color: #001529;
}

.el-menu-item {
  background-color: #001529;
}

.el-menu-item:hover,
:deep(.el-menu-item:active) {
  background-color: #0960bd !important;
}

:deep(.el-sub-menu:hover) {
  background-color: #0c2135 !important;
}

:deep(.el-sub-menu__title:hover) {
  background-color: #0c2135 !important;
}

.el-menu-item.is-active {
  background-color: #0960bd !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

main.el-main {
  padding: 0px 0px;
}

:deep(header.el-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 42px;
  margin-bottom: 15px;
}

header.el-header .left {
  display: flex;
  align-items: center;
}

header.el-header i.el-icon[data-v-8a54e678] {
  cursor: pointer;
}

header.el-header .right {
  display: flex;
  align-items: center;
}

header.el-header .right .usr {
  display: flex;
  align-items: center;
  margin-right: 4px;
}

span.el-avatar.el-avatar--circle {
  margin: 0 6px;
  font-size: 16px;
}

header.el-header .right .usr span {
  margin: 0 6px;
  font-size: 16px;
}

header.el-header i.el-icon {
  color: #6a748b;
  font-size: 21px;
}

header.el-header h2 {
  font-size: 16px;
  font-weight: 500;
  color: #6a748b;
  margin-left: 10px;
}

.routerView {
  padding: 0px 15px;
}
</style>
