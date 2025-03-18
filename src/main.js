import { createApp } from "vue";
// import Vue from 'vue';
import App from "./App.vue";
import router from "@/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {userid,setUserId,noticeNum} from './utils/common.js';

// createApp(App).prototype.common.userid = userid;
// createApp(App).prototype.common.setUserId = setUserId;

const app = createApp(App);
app.config.globalProperties.$userid = userid;
app.config.globalProperties.$noticeNum = noticeNum;
app.use(router);
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount("#app");

