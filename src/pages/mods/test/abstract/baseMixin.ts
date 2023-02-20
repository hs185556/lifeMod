import { useModStore } from 'store/mod';

export default class {
    store = useModStore();
    mod = this.store.get("mod");
};
