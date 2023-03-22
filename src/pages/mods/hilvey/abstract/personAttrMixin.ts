import { ref } from "vue";

export default (Base) =>
  class extends Base {
    name = ref(this.store.get("abstract", "name") || 'hilvey');
    temperature = ref(this.store.get("abstract", "temperature") || 0);
    hungry = ref(this.store.get("abstract", "hungry") || 0);
    dirty = ref(this.store.get("abstract", "dirty") || 0);
    energy = ref(this.store.get("abstract", "energy") || 100);
  };
