<template>
  <div class="toolbar-right">
    <el-button @click="AddTeamVisible = true" type="primary" plain>新增</el-button>
  </div>
  <div class="table">
    <el-table :data="TeamList" border style="width: 100%">
      <el-table-column align="center" prop="team_id" label="团队编号" width=""/>
      <el-table-column align="center" prop="team_name" label="团队名称" width=""/>
      <el-table-column align="center" prop="team_leader_id" label="团队组长" width=""/>
      <el-table-column align="center" prop="team_administrators" label="团队管理员" width=""/>
      <el-table-column align="center" prop="team_member_num" label="团队组员数" width=""/>
      <el-table-column align="center" label="管理" fixed="right" width="180">
        <template #default="scope">
          <div>
            <el-link
                :href="'home#/TeamManagement?teamid=' + scope.row.team_id"
                type="primary"
                :underline="false"
            >成员管理
            </el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link
                :href="'home#/TeamDocuments?teamid=' + scope.row.team_id"
                type="primary"
                :underline="false"
            >文献管理
            </el-link>
          </div>

        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" fixed="right" width="180">
        <template #default="scope">

          <!-- <el-button size="small" @click="modify(scope.row)">进入团队</el-button> -->
          <el-popconfirm
              v-if="scope.row.owner=='yes'"
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确认删除该团队？"
              @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button v-if="scope.row.owner=='yes'" size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
          <p v-if="scope.row.owner=='no'">暂无权限，无法操作</p>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:currentPage="query.page"
        :page-size="query.size"
        layout="prev, pager, next, jumper"
        :total="count"
        @current-change="getList"
        :hide-on-single-page="true"
    >
    </el-pagination>
    <el-dialog v-model="AddTeamVisible" title="新建团队">
      <el-form :model="AddTeamForm">
        <el-form-item label="团队名称:">
          <el-input v-model="AddTeamForm.TeamName"/>
        </el-form-item>
      </el-form>
      <template #footer>
		  <span class="dialog-footer">
		    <el-button @click="AddTeamVisible = false">取消</el-button>
		    <el-button type="primary" @click="AddTeamVisible = false;AddTeamConfirm()">确认</el-button>
		  </span>
      </template>
    </el-dialog>

  </div>
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
import {ref, reactive, onBeforeMount, computed} from "vue";
import {useRouter} from "vue-router";
import {Search} from "@element-plus/icons-vue";
// import { getToken } from "utils/auth";
// import { getDepositList, deleteDeposit } from "apis/good.js";
import {getTeams,deleteteam,createTeam} from "../apis/team.js";


const userid = localStorage.getItem("userid");
console.log("TeamList", userid)

//消息
const open1 = () => {
  ElMessage({
    showClose: true,
    message: '删除成功！',
    type: 'success',
  })
}

const open2 = () => {
  ElMessage({
    showClose: true,
    message: 'Oops！删除失败',
    type: 'error',
  })
}

const AddTeamVisible = ref(false);
const AddTeamForm = reactive({
  TeamName:"",
})

const AddTeamConfirm = function(){
  // alert("新建团队名称为"+AddTeamForm.TeamName);
  const post_team_confirm ={

    teamName: AddTeamForm.TeamName,
    team_leader_id: userid

  }
  createTeam(post_team_confirm)
      .then((res) => {
        if (res.code == 0) {
          console.log(res.data);
          console.log(res.msg);
          getList();
        }
      })
      .catch((err) => {
            console.log(err);
          }
      );

}


const count = ref(0);
const query = reactive({
  userid: userid,
});
const TeamList = ref([]);
const getList = () => {
  getTeams(query)
      .then((res) => {
        if (res.code == 0) {
          console.log(res.data);
          console.log(res.msg);
          TeamList.value = res.data;
        }
      })
      .catch((err) => {
            console.log(err);
          }
      );
};


const add = () => {
  // router.push("/depositRelease");
};

const router = useRouter();
const modify = (row) => {
  // router.push({
  //   path: "/depositRelease",
  //   query: { isModify: true, id: row.id },
  // });
  alert("进入该团队页面");
};

const handleDelete = (index, row) => {
  const post_delete_team = {
    userid:userid,
    teamid:row.team_id
  };
  deleteteam(post_delete_team)
      .then((res) => {
        if (res.code == 0) {
          TeamList.value.splice(index, 1);
          open1();
        }
      })
      .catch((err) => {
            open2();
          }
      );
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
  margin-bottom: 5px;
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
