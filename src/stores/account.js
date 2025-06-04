import { defineStore } from "pinia";
import axios from "axios";

export const useAccountStore = defineStore("account", {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    user: {},
  }),
  actions: {
    async checkAuth() {
        return new Promise(async (resolve) => {
            const token = localStorage.getItem("token");
            if (!token) {
              resolve(false);
              return;
            }
            const headers = { Authorization: `Bearer ${token}` };
            try {
              const userInfos = await axios.post(
                "https://ecommerce-backend-ig7w.onrender.com/userinfo",
                {},
                { headers }
              );
              if (userInfos.data.role === "admin") {
                this.isAdmin = true;
              }
              this.isLoggedIn = true;
              this.user = userInfos.data;
              resolve(true);
            } catch (error) {
              resolve(false);
              console.log(error);
            }
          });
    },
    async register(username, email, password) {
      try {
        const results = await axios.post("https://ecommerce-backend-ig7w.onrender.com/register", {
          username,
          email,
          password,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async login(email, password) {
      try {
        const results = await axios.post("https://ecommerce-backend-ig7w.onrender.com/login", {
          email,
          password,
        });
        if (results.data.message === "Login success") {
          this.isLoggedIn = true;
          localStorage.setItem("token", results.data.token);
          const userData = await axios.post(
            "https://ecommerce-backend-ig7w.onrender.com/userinfo",
            {},
            {
              headers: {
                Authorization: `Bearer ${results.data.token}`,
              },
            }
            
          );
          this.user = userData.data;
          console.log(this.user);
          if (this.user.role === "admin") {
            this.isAdmin = true;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser(username) {
      try {
        const results = await axios.post("https://ecommerce-backend-ig7w.onrender.com/insert_username", {
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        );
        await this.checkAuth();
      } catch (error) {
        console.log(error);
      }
    },

    async updatePhone(phone) {
      try {
        const results = await axios.post("https://ecommerce-backend-ig7w.onrender.com/insert_phone", {
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        );
        await this.checkAuth();
      } catch (error) {
        console.log(error);
      }
      },

      async updateAddress(name, lastname , address, phoneads) {
        try {
          const results = await axios.post("https://ecommerce-backend-ig7w.onrender.com/insert_address", {
            name,
            lastname,
            address,
            phoneads
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
          );
          await this.checkAuth();
        } catch (error) {
          console.log(error);
        } 
      },
      
     async removeAddress() {
        try {
          const results = await axios.post("https://ecommerce-backend-ig7w.onrender.com/delete_address", {
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
          );
          await this.checkAuth();
        } catch (error) {
          console.log(error);
          }
      },
    logout() {
      this.isAdmin = false;
      this.isLoggedIn = false;
      this.user = {};
      localStorage.removeItem("token");
    },
  },
});
