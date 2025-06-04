import { defineStore } from "pinia";
import axios from "axios";



export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    summeryPrice(state) {
      return state.items.reduce((acc, item) => {
        return acc + (item.price * item.quantity) + item.addonsPrice;
      }, 0);
    },
    summeryQuantity(state) {
      return state.items.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
    },
  },
  actions: {
    async loadCart() {
      try {
        const results = await axios.post(
          "https://ecommerce-backend-ig7w.onrender.com/get_cart",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        results.data.forEach((item) => {
          item.imageUrl = `https://ecommerce-backend-ig7w.onrender.com/${item.imageUrl}`;
        });
        this.items = results.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addToCart(product) {
      try {
        const res = await axios.post(
          "https://ecommerce-backend-ig7w.onrender.com/add_to_cart",
          product,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await this.loadCart();
      } catch (error) {
        console.error(error);
      }
    },
    async updateQuantity(product_id, quantity) {
      try {
        await axios.put(
          "https://ecommerce-backend-ig7w.onrender.com/update_cart",
          {
            product_id,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await this.loadCart();
      } catch (error) {
        console.error(error);
      }
    },
    async removeFromCart(product_id) {
      try {
        await axios.delete("https://ecommerce-backend-ig7w.onrender.com/delete_cart", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          data: { product_id },
        });
        await this.loadCart();
      } catch (error) {
        console.error(error);
      }
    },
    async checkout() {
      try {
        const results = await axios.post(
          "https://ecommerce-backend-ig7w.onrender.com/insert_order",
          { total: this.summeryPrice },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await this.loadCart();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
