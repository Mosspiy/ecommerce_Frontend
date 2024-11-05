import { defineStore } from "pinia";
import axios from "axios";

export const useAdminOrderStore = defineStore("admin-order", {
  state: () => ({
    orders: [],
    orderDetail: null,
  }),
  actions: {
    async loadOrders() {
      const results = await axios.post(
        "http://localhost:3000/get_order",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      this.orders = results.data;
    },
    async loadOrdersAdmin() {
      const results = await axios.post("http://localhost:3000/get_all_order");
      this.orders = results.data;
    },
    async getOrderDetail(order_id) {
      const results = await axios.post("http://localhost:3000/get_order_id", {
        order_id,
      });
      this.orderDetail = results.data;
      console.log(results.data);
    },
    async updateOrderStatus(order_id, status) {
      try {
        await axios.post("http://localhost:3000/update_order_status", {
          order_id,
          status,
        });
        await this.loadOrdersAdmin();
      } catch (error) {
        console.error(error);
      }
    },
    async updateReview(order_id, rating) {
      await axios.put("http://localhost:3000/update_review", {
        order_id,
        rating,
      });
      window.location.reload();
    },
    async get_status() {
      try {
        const results = await axios.post(
          "http://localhost:3000/get_status",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.orders = results.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
