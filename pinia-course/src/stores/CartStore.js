import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "@/stores/AuthUserStore";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
        }
    },
    actions: {
        addItems(count, item) {
            count = parseInt(count);
            for (let index = 0; index < count; index++) {
                this.items.push({ ...item });
            }
        },
        clearItem(itemName) {
            this.items = this.items.filter((item) => item.name !== itemName);
        },
        setItemCount(item, count) {
            this.clearItem(item.name);
            this.addItems(count, item);
        },
        checkout() {
            const authUserStore = useAuthUserStore();

            alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`)
        },

    },
    getters: {
        /* count(){
            return this.items.length;
        },
        isEmpty(){
            return this.count===0
        } */
        // Arrow function
        count: (state) => state.items.length,
        isEmpty: (state) => state.items.length === 0,

        grouped: state => groupBy(state.items, item => item.name),
        groupCount: (state) => (name) => state.grouped[name].length,
        // getter per obtenir total amb funció reduce
        total: (state) => state.items.reduce((total, item) => total + item.price, 0),
        // aux es el valor anterior, item es el valor actual, 0 es el valor inicial
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
} 