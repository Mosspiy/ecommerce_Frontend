<script setup>
import navbar from '@/layout/User/navbar.vue';
import sideMenu from '@/components/sideMenu.vue';
import { ref, onMounted } from 'vue';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAdminOrderStore } from '@/stores/admin/order';
import { useAccountStore } from '@/stores/account';

const OrderStore = useAdminOrderStore();
const AccountStore = useAccountStore();
// สร้าง reactive state ด้วย ref
const selectedMenu = ref("orderStatus");
const currentStep = ref(0);
const steps = ref(["กำลังตรวจสอบคำสั่งซื้อ", "กำลังดำเนินการ", "กำลังนำส่ง", "เสร็จสิ้น"]);
const inputStatus = ref(null)

onMounted(async () => {
  await OrderStore.get_status()
  console.log(OrderStore.orders)
  OrderStore.orders.forEach((input) => {
    if (input.status === 'กำลังตรวจสอบคำสั่งซื้อ') {
      input.currentStep = 0
    } else if (input.status === 'กำลังดำเนินการ') {
      input.currentStep = 1
    } else if (input.status === 'กำลังนำส่ง') {
      input.currentStep = 2
    } else if (input.status === 'เสร็จสิ้น') {
      input.currentStep = 3
    }
  })
})
</script>

<template>
  <navbar />
  <div class="flex">
    <sideMenu :initialMenu="selectedMenu" />
    <div class="p-6 flex-grow">
      <div class="w-full">
        <h2 class="text-lg font-bold mb-4">สถานะคำสั่งซื้อ</h2>
        <div v-for="status in OrderStore.orders" class="border-t w-full bg-base-100 shadow-md rounded-lg p-4 mt-4">
          <p class="font-semibold">สถานะคำสั่งซื้อ # {{ status.order_id }}</p>
          <div class="flex items-center justify-center mt-4">
            <div v-for="(step, index) in steps" :key="index" class="flex items-center flex-grow">
              <!-- Step Icon -->
              <div class="flex flex-col items-center">
              <div class="justify-center">
                <div
                  :class="{
                    'text-green-600': index < status.currentStep,
                    'text-green-600 animate-spin': index === status.currentStep && index < steps.length - 1,
                    'text-gray-300': index > status.currentStep,
                    'text-green-600': index === steps.length - 1, // ให้ไอคอนสุดท้ายเป็นสีเขียว
                  }"
                  class="rounded-full h-10 w-10 flex items-center justify-center"
                >
                  <i
                    v-if="index < status.currentStep || (status.currentStep === steps.length - 1 && index === steps.length - 1)"
                    class="fas fa-check-circle fa-2x text-green-600"
                  ></i>
                  <i
                    v-else-if="index === status.currentStep && index < steps.length - 1"
                    class="fas fa-spinner fa-2x text-green-600"
                  ></i>
                  <i
                    v-else
                    class="far fa-circle fa-2x"
                  ></i>
                </div>
              </div>
                <!-- Step Name -->
                <span class="text-sm mt-1 text-center">{{ step }}</span>
              </div>
              <!-- Line between steps -->
              <div
                v-if="index < steps.length - 1"
                class="flex-grow relative mx-2" 
              >
                <div class="h-1 bg-gray-300 absolute top-1/2 left-0 right-0">
                  <div
                    class="h-1 bg-green-600"
                    :style="{ width: index < status.currentStep ? '100%' : '0%' }"
                  ></div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- <div class="flex justify-end mt-4">

            <select v-model="inputStatus.value.currentStep" class="border rounded p-2 bg-white">
              <option v-for="(step, index) in steps" :key="index" :value="index">{{ step }}</option>
            </select>
          </div> -->
        </div>
      </div>
  </div>
</template>

<style scoped>
/* Add custom styles if needed */
</style>
