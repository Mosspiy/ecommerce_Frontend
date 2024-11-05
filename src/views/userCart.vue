<script setup>
import navbar from '@/layout/User/navbar.vue';
import megaMeat from '@/assets/megaMeat.png';
import DoubleMeat from '@/assets/DoubleMeat.png';
import schoolCombo from '@/assets/schoolCombo.png';
import { RouterLink } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import Swal from 'sweetalert2';

import { useCartStore } from '@/stores/cart';
import { useAccountStore } from '@/stores/account';
import { tint } from '@primevue/themes';

const AccountStore = useAccountStore();
const CartStore = useCartStore();

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


// Promo code และ discount
const promoCode = ref("");
const discount = ref(0);


// ฟังก์ชันสำหรับจัดการตะกร้าสินค้า
const applyPromo = () => {
  if (promoCode.value === "BIGBITE") {
    discount.value = 0.2 * CartStore.summeryPrice;
  } else {
    discount.value = 0;
  }
};


const checkOut = () => {
  const address = AccountStore.user.address;
  const firstName = AccountStore.user.name;
  const lastName = AccountStore.user.lastname;
  const phone = AccountStore.user.phoneads;

  // if (!address || !firstName || !lastName || !phone) {
  //   Toast.fire({
  //     icon: "error",
  //     title: "กรุณากรอกข้อมูลให้ครบถ้วน",
  //   })
  //   return;
  // }
  CartStore.checkout();
};

onMounted(() => {
CartStore.loadCart();
});
</script>
<template>
    <navbar />
    <div class="container mx-auto p-6">
    <h2 class="text-center text-2xl font-bold mb-6 mt-6 text-[#316f3f]">My Cart</h2>
    <div class="card w-full bg-base-100 shadow-md">
    <div class="overflow-x-auto">
      <table class="table w-full table-striped">
        <thead>
          <tr>
            <th class="w-1/2 text-[#a7bfad]">เมนู</th>
            <th class="w-1/6 text-center text-[#a7bfad]">จำนวน</th>
            <th class="w-1/6 text-center text-[#a7bfad]">ราคา</th>
            <th class="w-1/6 text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in CartStore.items">
            <td class="flex items-center w-full">
              <img :src="item.imageUrl" class="w-24 h-24 mr-4 object-contain" alt="product" />
              <div>
                <div class="font-bold text-[#316f3f]">{{ item.name }}</div>
                <div v-for="addon in item.addons " class="text-sm text-[#a7bfad] pl-3">- {{ addon }}</div>
              </div>
            </td>
            <td class="w-1/6 text-center">
              <div class="flex items-center justify-center">
                <button class="btn btn-outline border-[#a7bfad] border-2 btn-xs mr-2" @click="CartStore.updateQuantity(item.product_id, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
                <span class="text-lg border-2 border-[#a7bfad] rounded-md p-2">{{ item.quantity }}</span>
                <button class="btn btn-outline border-[#a7bfad]  border-2 btn-xs ml-2" @click="CartStore.updateQuantity(item.product_id, item.quantity + 1)">+</button>
              </div>
            </td>
            <td class="w-1/6 text-center text-[#316f3f] ">฿ {{ (item.price * item.quantity) + item.addonsPrice  }}</td>
            <td class="w-1/6 text-center">
              <button class="btn btn-ghost" @click="CartStore.removeFromCart(item.product_id)">
                <font-awesome-icon :icon="['fas', 'trash']" class="text-[#a7bfad]" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
  
  <div class="container mx-auto p-6">

    <div class="flex flex-col items-end mt-6">
      <div class="flex mb-4">
        <input v-model="promoCode" placeholder="กรอกโค้ดโปรโมชั่นที่นี่" class="input input-bordered mr-2 border-[#a7bfad] text=[#a7bfad]" /> 
        <button class="btn bg-[#316f3f] text-white" @click="applyPromo">ใช้โค้ด</button>
      </div>
      <div class="text-right mb-4 text-[#316f3f]">
        <p>รวม: ฿ {{ CartStore.summeryPrice }}</p>
        <p class="text-red-500">ส่วนลด: ฿ {{ discount }}</p>
        <p class="font-bold">ยอดสุทธิ: ฿ {{ CartStore.summeryPrice - discount }}</p>
      </div>
      <div class="flex">
        <RouterLink :to ="{name: 'products'}">
            <button class="btn bg-white border-[#a7bfad] text-[#316f3f] mr-2" @click="updateCart">เลือกเมนูอาหารต่อ</button>
        </RouterLink>
        <button @click="checkOut" class="btn bg-[#316f3f] text-white">ชำระเงิน</button>
      </div>
    </div>
  </div>
  </template>
  
  
<style scoped>

</style>