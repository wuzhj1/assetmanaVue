<template>
  <div id="buttongroup">
    <el-button v-show="this.edit_on" type="primary" icon="el-icon-plus"
      >新增</el-button
    >
    <el-button
      v-show="this.update_on"
      type="primary"
      icon="el-icon-delete"
      @click="edit_click"
      >编辑</el-button
    >
    <el-button v-show="this.delete_on" type="primary" icon="el-icon-delete"
      >删除</el-button
    >
    <el-button v-show="this.upload_on" type="primary" icon="el-icon-upload2"
      >导入</el-button
    >
  </div>
</template>

<script>
export default {
  name: "ButtonGroup",
  props: {
    edit_on: false,
    update_on: false,
    delete_on: false,
    upload_on: false,
    edit_click: Function
  }
};
</script>

<style scrope>
#buttongroup {
  margin-bottom: 5px;
}
</style>
