import { defineStore } from "pinia";
import axios from "axios";


export const useAdminProductStore = defineStore("admin-product", {
    state: () => ({
        products: [],
        loaded: false
    }),
    actions: {
        async loadProducts() {
          try {
            const response = await axios.get("https://ecommerce-backend-ig7w.onrender.com/products/");
            this.products = response.data;
            this.loaded = true;
          } catch (error) {
            console.error("Error loading products:", error);
          }
        },
        async getProduct(product_id) {
            try {
              const results = await axios.post(`https://ecommerce-backend-ig7w.onrender.com/get_item`, {
                product_id,
              });
              return results.data;
            } catch (error) {
              console.error(error);
            }
          },
          async addProduct(productData) {
            try {
              await axios.post(
                "https://ecommerce-backend-ig7w.onrender.com/insert_item",
                productData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              await this.loadProducts();
            } catch (error) {
                console.log(productData)
              console.error(error);
            }
          },
          async updateProduct(id, productData) {
            try {
              const response = await axios.put( // เก็บค่าตอบกลับจากการเรียก API
                `https://ecommerce-backend-ig7w.onrender.com/update_item/${id}`,
                productData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
          
              // ตรวจสอบสถานะการตอบกลับ
              if (response.status === 200) {
                await this.loadProducts(); // อัปเดตข้อมูลใน store
                return response.data; // ส่งค่าตอบกลับ
              } else {
                throw new Error("Failed to update product");
              }
            } catch (error) {
              console.error("Error updating product:", error);
              throw error; // ส่งต่อข้อผิดพลาด
            }
          },
          async removeProduct(product_id) {
            try {
              await axios.delete(`https://ecommerce-backend-ig7w.onrender.com/delete_item`, { data: { product_id } });
              await this.loadProducts();
            } catch (error) {
              console.error(error);
            }
          },
          searchProducts(searchName) {
            return this.products.filter((product) =>
              product.name.toLowerCase().includes(searchName.toLowerCase())
            );
          },
          filterProducts(category) {
            return this.products.filter((product) => {
              if (category === "ทุกประเภท") {
                return product.price >= price[0] && product.price <= price[1];
              }
              return (
                product.category === category &&
                product.price >= price[0] &&
                product.price <= price[1]
              );
            });
          },
        },
      });