<script setup lang="ts">
import { reactive, provide } from "vue";

interface Config {
  type: "success" | "error" | "warning";
  content: string;
  duration?: number;
  onClose?: () => {};
  liveTime?: number;
}

// 因为vue3的Proxy尿性，不得不用一个data集合
const data = reactive<{ msgList: Config[] }>({ msgList: [] });

// 添加消息
const addMsg = (config: Config) => {
  const durationTime = config.duration * 1000;
  data.msgList.push({
    ...config,
    liveTime: Date.now() + durationTime,
  });
  // 定时销毁过期消息
  setTimeout(() => {
    data.msgList = data.msgList.filter((v) => v.liveTime > Date.now());
  }, durationTime);
};

// 提供操作方法
defineExpose({
  success: (content, duration?, onClose?) => {
    addMsg({ content, duration: duration || 3, onClose, type: "success" });
  },
  error: (content, duration?, onClose?) => {
    addMsg({ content, duration: duration || 3, onClose, type: "error" });
  },
  warning: (content, duration?, onClose?) => {
    addMsg({ content, duration: duration || 3, onClose, type: "warning" });
  },
});
</script>

<template>
  <div class="message">
    <div v-for="item of data.msgList" :key="item.liveTime">
      <div class="message-notice">
        <div class="message-notice-content">
          <div :class="['message-custom-content', 'message-' + item.type]">
            <!-- 图标 -->
            <span
              role="img"
              aria-label="check-circle"
              class="anticon anticon-check-circle"
              v-if="item.type === 'success'"
              ><svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="check-circle"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                ></path></svg
            ></span>
            <span
              role="img"
              aria-label="exclamation-circle"
              class="anticon anticon-exclamation-circle"
              v-if="item.type === 'warning'"
              ><svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="exclamation-circle"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
                ></path></svg
            ></span>
            <span
              role="img"
              aria-label="close-circle"
              class="anticon anticon-close-circle"
              v-if="item.type === 'error'"
              ><svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="close-circle"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
                ></path></svg
            ></span>
            <!-- 内容 -->
            <span>{{ item.content }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: $color-reverse;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: fixed;
  top: 8px;
  left: 0;
  z-index: 1010;
  width: 100%;
  pointer-events: none;
  .message-notice {
    padding: 8px;
    text-align: center;
  }
  .message-notice-content {
    display: inline-block;
    padding: 10px 16px;
    background: -webkit-gradient(linear, left top, right bottom, from($bg-color-deep), to($bg-color));
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
      0 9px 28px 8px rgb(0 0 0 / 5%);
    pointer-events: all;
    .anticon {
      display: inline-block;
      color: inherit;
      font-style: normal;
      line-height: 0;
      text-align: center;
      text-transform: none;
      vertical-align: -0.125em;
      text-rendering: optimizelegibility;
      -webkit-font-smoothing: antialiased;
      position: relative;
      top: 1px;
      margin-right: 8px;
      font-size: 16px;
    }
  }

  .message-success .anticon {
    color: #52c41a;
  }
  .message-warning .anticon {
    color: #faad14;
  }
  .ant-message-error .anticon {
    color: #ff4d4f;
  }
}
</style>
