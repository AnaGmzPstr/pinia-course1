import { defineStore } from 'pinia';
import { fill } from 'lodash';

// nom i option object
export const useProductStore= defineStore("ProductStore",{
    // state
    state:()=>{
        return {
            // buidem els productes amb un array buit
            products: [],
        };
    },
    // actions
    actions: {
        // accedim a l'estat amb la paraula reservada this i assignem a l'estat els productes del JSON
        async fill(){
            this.products = (await import ("@/data/products.json")).default
        }
    }
});