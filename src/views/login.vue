<script setup>
import axios from "axios";
import { ref, computed, } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useAccountStore } from "@/stores/account";

const hero_img = new URL("../assets/heroo.png", import.meta.url);
const bg_img = new URL("../assets/bg.png", import.meta.url);

const router = useRouter();
const pass = ref("");
const email = ref("");

const AccountStore = useAccountStore();



const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const validate = computed(() => {
  return email.value !== "" && pass.value !== "";
});

const login = async () => {
  await AccountStore.login(email.value, pass.value);
  if (AccountStore.isAdmin) {
    router.push({ name: "AdminProductList" });
    return;
  }
  router.push({ name: "home" });
  return;
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-custom">
    <div class="bg-white shadow-lg rounded-lg flex max-w-6xl h-[700px]">
      <!-- ภาพด้านซ้าย -->
      <div class="w-2/3">
        <img
          :src="hero_img"
          alt="Burger and fries"
          class="object-cover w-full h-full rounded-l-lg"
        />
      </div>
      <!-- ฟอร์มเข้าสู่ระบบด้านขวา -->
      <div class="w-1/2 flex items-center justify-center">
        <div class="w-3/4">
          <h2 class="text-5xl font-bold text-[#316f3f] mb-2">Login</h2>
          <p class="text-[#9ab68a] mb-10">
            Welcome back! Please login to your account.
          </p>
          <form @submit.prevent="login">
            <div class="mb-8">
              <label class="block text-[#9ab68a]">Username</label>
              <input
                type="email"
                placeholder="username@gmail.com"
                class="input input-bordered w-full border-[#9ab68a] text-[#316f3f] text-[#316f3f] hover:border-[#316f3f] transition-colors duration-300"
                v-model="email"
              />
            </div>
            <div class="mb-8">
              <div class="relative">
                <label class="block text-[#9ab68a]">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  class="input input-bordered w-full border-[#9ab68a] text-[#316f3f] pr-10 text-[#316f3f] hover:border-[#316f3f] transition-colors duration-300"
                  v-model="pass"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                ></button>
              </div>
            </div>
            <div class="flex items-center justify-between mb-10">
              <label
                class="flex items-center text-[#9ab68a] cursor-pointer label"
              >
                <input
                  type="checkbox"
                  class="checkbox mr-2 checked:bg-[#316f3f]"
                />
                <span class="text-[#9ab68a]">Remember Me</span>
              </label>
              <a href="#" class="text-sm text-[#9ab68a] hover:underline"
                >Forgot Password?</a
              >
            </div>
            <button type="submit" class="btn bg-[#316f3f] w-full text-white">
              Login
        </button>
          </form>
          <p class="mt-8 text-sm text-center text-[#9ab68a]">
            New User?
            <a href="register" class="text-[#316f3f] font-semibold">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-custom {
  background-image: url("../assets/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
