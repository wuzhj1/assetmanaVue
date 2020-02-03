<template>
<div class="app-container">
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card style="padding:8px">
        <div id="user_avatar_div">
          <el-avatar class="user_avatar"  shape="circle" :size="65" fit="fit" src="http://img.wxcha.com/file/201912/14/7d2d8f5cb3.jpg"></el-avatar>
          <span>用户名</span>
          
        </div>
        <ul style="list-style:none;border:1px solid black">
          <li style="padding:3px">用户:</li>
          <li style="padding:3px">手机号</li>
          <li style="padding:3px">邮箱</li>
          <li style="padding:3px">地址</li>
          <li style="padding:3px">状态</li>
          <li style="padding:3px">角色</li>
          <li style="padding:3px">备注</li>
        </ul>
      </el-card>
    </el-col>

  </el-row>
</div>
  
</template>

<script >
 
</script>

<style scoped>

 #user_avatar_div{
   text-align: center;
 }
</style>