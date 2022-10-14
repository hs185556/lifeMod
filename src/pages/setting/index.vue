<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import Checkbox from "components/Checkbox";

const store = inject("store");
const music = inject("music");
const router = useRouter();

// 初始化属性
const bgSoundChecked = store.get("keep", "setting", "bgSound") === false ? false : true;
const soundEffectChecked = store.get("keep", "setting", "soundEffect") === false ? false : true;

// 音乐开关
function changeBgSound(checked) {
  store.set("keep", "setting", "bgSound", checked);
  music.bgSound[checked ? "play" : "pause"]();
}
// 音效开关
function changeSoundEffect(checked) {
  store.set("keep", "setting", "soundEffect", checked);
}
// 跳转页面
function toPage() {
  router.push({ path: "/" });
}
</script>

<template>
  <div class="header">设置</div>
  <div class="content">
    <Checkbox
      label="开启音乐"
      :initialValue="bgSoundChecked"
      @onCheck="changeBgSound"
    ></Checkbox><br>
    <Checkbox
      label="开启音效"
      :initialValue="soundEffectChecked"
      @onCheck="changeSoundEffect"
    ></Checkbox>
  </div>
  <div class="footer">
    <div class="btn" @click="toPage">返回</div>
  </div>
</template>

<style scoped lang="scss">
.header {
  padding: 3em;
  font-weight: 700;
  font-size: 30px;
}
.content {
}
.footer {
  position: absolute;
  bottom: 1em;
  width: 100%;
  padding: 0 calc(50% - 7.5em);
  box-sizing: border-box;
}
</style>
