import { ref, inject } from "vue";
import { useModStore } from 'store/mod';
import { useRouter } from "vue-router";

export default class {
    store = useModStore();
    mod = this.store.get("mod");
    message = inject("message");
    router = useRouter();

    /* 确认框 */
    confirm = (title, callback) => {
        if (!confirm(title)) {
            return;
        }
        callback();
    }
};
