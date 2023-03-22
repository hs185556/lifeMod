import { effectScope, markRaw, ref } from "vue";
import { SymbolPinia } from "@/symbol";

export function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  const pinia = markRaw({
    install(app) {
      pinia._a = app;
      app.provide(SymbolPinia, pinia);
      app.config.globalProperties.$pinia = pinia;
    },
    _a: null,
    state,
    // 管理整个应用
    _e: scope,
    // 记录所有的store
    _s: new Map(),
  });

  return pinia;
}
