<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const validate = computed(() => {
  return username.value !== '' && email.value !== '' && password.value !== '' && confirmPassword.value !== '';
});

const reg_img = new URL("../assets/regist.png", import.meta.url);
const bg_img = new URL("../assets/bg.png", import.meta.url);

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


const handleRegister = async () => {
  try {
    if (!validate.value) {
      return;
    }
    if (password.value !== confirmPassword.value) {
      Toast.fire({
      icon: "error",
      title: "Password and confirm password do not match!"
      });
      return;
    }
    const results = await axios.post("http://localhost:3000/register", {
      username: username.value,
      email: email.value,
      password: password.value,

    });

    if (results.data.message === "Registered successfully") {
      Toast.fire({
      icon: "success",
      title: "Signed in successfully"
      })
      router.push({ name: "login" });
    }
    }
    catch (error) {
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong with the registration!',
    });
    console.error(error);

    }
  };
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-custom">
      <div class="bg-white shadow-lg rounded-lg flex max-w-6xl h-[700px]">
        <!-- ส่วนของรูปภาพด้านซ้าย -->
        <div class="w-1/2">
          <img
            :src="reg_img"
            alt="Burger and fries"
            class="object-cover w-full h-full rounded-l-lg object-left"
          />
        </div>
        <!-- ส่วนของฟอร์มลงทะเบียนด้านขวา -->
        <div class="w-1/2 flex items-center justify-center">
          <div class="w-3/4">
            <h2 class="text-4xl font-bold text-[#316f3f] mb-6">Create Account</h2>
            <form @submit.prevent="handleRegister">
              <div class="mb-4">
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Username"
                    class="input input-bordered w-full border-[#9ab68a] text-[#316f3f] pl-10"
                    v-model="username"
                    required
                  />
                  <span class="absolute left-3 top-3">
                    <font-awesome-icon icon="user" style="color: #316f3f;" />
                  </span>
                </div>
              </div>
              <div class="mb-4">
                <div class="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    class="input input-bordered w-full border-[#9ab68a] text-[#316f3f] pl-10"
                    v-model="email"
                    required
                  />
                  <span class="absolute left-3 top-3">
                    <font-awesome-icon icon="envelope" style="color: #316f3f;" />
                  </span>
                </div>
              </div>
              <div class="mb-4">
                <div class="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    class="input input-bordered w-full border-[#9ab68a] text-[#316f3f] pl-10"
                    v-model="password"
                    required
                  /><button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            </button>
                  <span class="absolute left-3 top-3">
                    <font-awesome-icon icon="lock" style="color: #316f3f;" />
                  </span>
                </div>
              </div>
              <div class="mb-4">
                <div class="relative">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    class="input input-bordered w-full border-[#9ab68a] text-[#316f3f] pl-10"
                    v-model="confirmPassword"
                    required
                  /><button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            </button>
                  <span class="absolute left-3 top-3">
                    <font-awesome-icon icon="lock" style="color: #316f3f;" />
                  </span>
                </div>
              </div>
              <button class="btn bg-[#316f3f] w-full text-white mb-4">SIGN UP</button>
            </form>
            <p class="text-sm text-center text-[#9ab68a]">
              Already User? <a href="login" class="text-[#316f3f] font-semibold">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
   
  <style scoped>
.bg-custom {
  background-image: url('../assets/bg.png') ;
  background-size: cover;
  background-repeat: no-repeat;
  
}
  </style>