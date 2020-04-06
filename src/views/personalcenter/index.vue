<template>
  <div class="app-container" id="papp">
    <el-form  :model="user" label-width="80px" style="width: 400px;">
      
      <el-form-item label="新密码">
        <el-input v-model="user.newpassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="user.checkpassword" show-password></el-input>
      </el-form-item>
      <el-button type="primary" @click="this.updatePassword"
        >确认修改</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { updatePassword } from "@/api/user";
import { Message } from "element-ui";
export default {
  data() {
    return {
      user: {
        name: "",
        newpassword: "",
        checkpassword: "",
      },
    };
  },
  created() {
    this.user.name = this.$store.getters.name;
  },
  methods: {
    updatePassword() {
      const _this = this;
      if (this.user.newpassword != this.user.checkpassword) {
        Message.warning("两次输入密码不一致，请重新输入");
      }else{
        updatePassword({
          name: _this.user.name,
          password: _this.user.newpassword,
        }).then((res) => {
          console.log(res.success);
          if (res.success) {
            Message.success("修改密码成功！请重新登录");
          } else {
            Message.error("修改密码失败");
          }
        });
        
      }
    },
  },
};
</script>

<style>
#papp {
  padding-top: 50px;
  text-align: center;
}
#username {
  font: 30px sans-serif;
  line-height: 46px;
}
</style>
