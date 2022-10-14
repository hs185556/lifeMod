<script setup lang="ts">
import { ref, inject, onMounted } from "vue";

const store = inject("store");

const bgSound = ref(null);
const soundEffect = ref(null);

onMounted(() => {
  // 重写play方法
  bgSound.value.myPlay = function () {
    // 非false即true
    const bgSoundChecked = store.get("keep", "setting", "bgSound") === false ? false : true;
    bgSoundChecked && bgSound.value.play();
  };
  soundEffect.value.myPlay = function () {
    const soundEffectChecked = store.get("keep", "setting", "soundEffect") === false ? false : true;
    soundEffectChecked && soundEffect.value.play();
  };

  // 初始化播放
  bgSound.value.myPlay();
  // 用户点击后初始化播放
  const bodyDom = document.querySelector("body");
  bodyDom.onclick = () => {
    bgSound.value.myPlay();
    soundEffect.value.myPlay();
    // 点击音效
    bodyDom.onclick = soundEffect.value.myPlay;
  };
});

// 提供对象
defineExpose({
  bgSound,
  soundEffect,
});
</script>

<template>
  <!-- 这里路径别名不生效的 -->
  <audio
    ref="bgSound"
    src="src/assets/music/松田彬人 (まつだ あきと) - 明るく楽しい喫茶店.mp3"
    loop
  ></audio>
  <audio ref="soundEffect" src="src/assets/music/嘟.mp3"></audio>
</template>

<style scoped lang="scss"></style>
