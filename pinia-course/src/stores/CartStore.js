import { isEmpty } from "lodash";
import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore" ,{
    state:()=>{
        return {
            items:[],
        }
    },
    actions: {
        addItems(count, item) {
            count=parseInt(count);
            for (let index=0; index<count; index++) {
                this.items.push({...item});
            }
        },
        setItemCount(item,count){
            this.index = this.items.filter((i) => i.name !== item.name);
            for (let index=0; index<count; index++) {
                this.items.push({...item});
            }
        }
    },
    getters: {
        /* count(){
            return this.items.length;
        },
        isEmpty(){
            return this.count===0
        } */
        // Arrow function
        count:(state) => state.items.length,
        isEmpty:(state) => state.items.length===0,

        grouped:state =>groupBy(state.items, item=>item.name),
        groupCount: (state) => (name)=>state.grouped[name].length,
        // getter per obtenir total amb funció reduce
        total:(state)=>state.items.reduce((total, item) => total + item.price, 0),
        // aux es el valor anterior, item es el valor actual, 0 es el valor inicial
    }
})