<template>
  <div class="toolbar">
    <div class="toolbar-right">
      <el-button @click="dialogFormVisible2 = true" type="primary" plain>添加成员</el-button>
    </div>
  </div>

  <div class="table">
    <el-table :data="allTeamers" border style="width: 100%">
      <!-- <el-table-column prop="avatar" label="图片" width="65">
        <template #default="scope">
          <el-avatar :src="scope.row.image"></el-avatar></template
      ></el-table-column> -->
      <el-table-column align="center" prop="team_id" label="团队编号" width="" />
      <el-table-column align="center" prop="team_name" label="团队名称" width="" />
      <el-table-column align="center" prop="member_id" label="团队成员ID" width="" />
      <el-table-column align="center" prop="member_name" label="团队成员昵称" width="" />
      <el-table-column align="center" prop="member_permission" label="成员权限" width="" />
      <el-table-column align="center" key = "1" label="操作" fixed="right" width="180"
      ><template #default="scope">
        <el-button v-if="scope.row.type==1" size="small" @click="modify_per(scope.row)">修改权限</el-button>
        <el-divider v-if="scope.row.type==1" direction="vertical"></el-divider>
        <el-popconfirm
            v-if="scope.row.type==1"
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确认删除该成员？"
            @confirm="handleDelete(scope.$index, scope.row)"
        >
          <template #reference>
            <el-button v-if="scope.row.type==1" size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
        <p v-if="scope.row.type==0">暂无权限，无法操作</p>
      </template>
      </el-table-column>



    </el-table>
  </div>

  <el-dialog v-model="dialogFormVisible" title="更改成员权限">
    <el-form :model="p_form">
      <el-form-item label="请选择更改权限方式" :label-width="formLabelWidth">
        <el-select v-model="p_form.permisson" placeholder="请选择要修改权限的方式">
          <el-option label="设为管理员" value="管理员" />
          <el-option label="设为组员" value="组员" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handle_set_per()"
          >确认</el-button
          >
        </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogFormVisible2" title="添加成员">
    <el-form :model="cmember">
      <el-form-item label="请输入新成员id:" :label-width="formLabelWidth">
        <el-input v-model="cmember.id" autocomplete="off" />
      </el-form-item>

    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取消</el-button>
          <el-button type="primary" @click="create_member()"
          >确认</el-button
          >
        </span>
    </template>
  </el-dialog>

</template>

<script setup>
import {makelib} from "@/apis/teamdocuments";

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
import { ref, reactive, onBeforeMount, computed} from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
// import { getToken } from "utils/auth";
// import { getDepositList, deleteDeposit } from "apis/good.js";
import {getAllTeamers,deleteTeamer,addAdminister,addteamer} from "apis/team.js"
import { ElMessage } from 'element-plus'

const userid = localStorage.getItem("userid");
console.log("TeamManage", userid)
const dialogFormVisible1 = ref(false);
const cmember = reactive({
  id:'',
})

//消息通知
const open1 = () => {
  ElMessage({
    showClose: true,
    message: '修改权限成功！',
    type: 'success',
  })
}

const open2 = () => {
  ElMessage({
    showClose: true,
    message: '删除成功！',
    type: 'success',
  })
}

const open3 = () => {
  ElMessage({
    showClose: true,
    message: 'Oops！删除失败',
    type: 'error',
  })
}

const open4 = () => {
  ElMessage({
    showClose: true,
    message: 'Oops！修改权限失败',
    type: 'error',
  })
}

const open121 = () => {
  ElMessage({
    showClose: true,
    message: '您已成功邀请该用户假如您的团队,请等待对方同意',
    type: 'success',
  })
}

const open122 = () => {
  ElMessage({
    showClose: true,
    message: 'Oops！邀请失败',
    type: 'error',
  })
}



const formLabelWidth = '140px'
const dialogFormVisible = ref(false);

const dialogFormVisible2 = ref(false);

const p_form = reactive({
  permisson:'管理员',
})

var targetid = "";


var type = ref(0);
const router = useRouter();
console.log("teamid为：",router.currentRoute.value)

const count = ref(0);
const query = reactive({
  teamid: router.currentRoute.value.query["teamid"],
  userid: userid
});
const allTeamers = ref([]);


const handle_set_per = () =>{
  dialogFormVisible.value = false;
  const post_set_per = {
    teamid:router.currentRoute.value.query["teamid"],
    userid:userid,
    targetid:targetid.toString(),
    targetPermission:p_form.permisson,
  };


  console.log("修改权限",post_set_per)
  addAdminister(post_set_per)
      .then((res) => {
        getList()
        if (res.code == 0) {
          open1();

        }
      })
      .catch((err) => {
        open4();
      });





};

const create_member = () => {
  dialogFormVisible.value = false;
  const post_create_mem = {
    userid:userid,
    teamid:router.currentRoute.value.query["teamid"],
    targetid:cmember.id,
  };
  addteamer(post_create_mem)
      .then((res) => {
        getList()
        if (res.code == 0) {
          open121();

        }
      })
      .catch((err) => {
        open122();

      });

};



const getList = () => {
  getAllTeamers(query)
      .then((res) => {
        if (res.code == 0) {
          allTeamers.value = res.data;

          console.log("获取到的数据为",allTeamers.value)
          type = res.data[0].type;
          console.log("type的值为：",type);

        }
      })
      .catch((err) => {
        console.log(err);
      });
};

//
// const add = () => {
//   // router.push("/depositRelease");
// };


const modify_per = (row) => {
  targetid = row.member_id;
  dialogFormVisible.value = true;
};

const handleDelete = (index, row) => {

  const post_delete_user = {
    teamid:row.team_id,
    userid:userid,
    targetid:row.member_id,
  };

  console.log("&&&&",post_delete_user)

  deleteTeamer(post_delete_user)
      .then((res) => {
        if (res.code == 0) {
          allTeamers.value.splice(index, 1);
          open2();
        }
      })
      .catch((err) => {
        open3();
      });
};

onBeforeMount(() => {
  getList();
});




</script>

<style scoped>
.toolbar {
  display: flex;
  position: relative;
  justify-content: space-between;
}
.toolbar-left {
  flex: 0 0 auto;
}
.input {
  display: inline-block;
  margin-right: 15px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border-radius: 6px;
}
.toolbar input {
  width: calc(100% - 70px);
  height: 36px;
  margin-right: 10px;
  padding: 0.1rem 0.65rem;
  border: none;
  outline: none;
  font-size: 15px;
  background: transparent;
  box-shadow: none;
}
.toolbar-right {
  margin-top: 5px;
  margin-left: 20px;
  text-align: left;
  margin-right: 30px;
}
.table {
  margin-top: 20px;
  margin-right: 20px;
  text-align: center !important;
}
.el-pagination {
  justify-content: center;
}
</style>
