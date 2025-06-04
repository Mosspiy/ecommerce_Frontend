<script setup>
import { useAccountStore } from '@/stores/account';
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

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

// รับ props
const props = defineProps({
  initialMenu: {
    type: String,
    default: 'account',
  }
});

// การตั้งค่า router และ store
const router = useRouter();

// กำหนดค่าตัวแปรแบบ reactive
const selectedMenu = ref(props.initialMenu);
const showModal = ref(false);
const editField = ref('');
const editValue = ref('');
const showPopup = ref(false);

const confirmLogout = () => {
  AccountStore.logout();
  showPopup.value = false;

  Toast.fire({
    icon: "success",
    title: "You have been logged out"
  });

  router.push({ name: "home" });
};

</script>
<template>
    <!-- Sidebar -->
    <section class="flex w-1/5 p-10">
      <div class="flex flex-col w-full">
        <!-- ส่วนหัวต้อนรับ -->
        <div class="border-b border-[#a7bfad] pb-4 mb-4">
          <div class="text-2xl font-bold">
            <p class="font-bold mb-4">
              สวัสดี, <span class="text-green-600">{{AccountStore.user.username}}</span>
            </p>
          </div>
        </div>

        <!-- Section: บัญชีของฉัน -->

        <div
          class="flex items-center space-x-2 text-gray-700 mb-2"
        >
          <font-awesome-icon :icon="['fas', 'user']" />
          <span>บัญชีของฉัน</span>
        </div>

        <div>
        <!-- Section: ข้อมูลส่วนตัว -->
        <RouterLink
        :to= "{ name: 'account' }">
        <button
          class="flex items-center space-x-2 text-gray-700 hover:text-green-600 pl-8 mb-2 ml-3"
          :class="{
            'font-bold text-green-600': selectedMenu === 'account',
          }"
          @click="selectedMenu = 'account'"
        >
          <span>ข้อมูลส่วนตัว</span>
        </button>
        </RouterLink>

        <!-- Section: ที่อยู่จัดส่ง -->
        <div class="border-b border-[#a7bfad] pb-4 mb-4">
          <RouterLink
            :to= "{ name: 'address' }">
            <button
            class="flex items-center space-x-2 text-gray-700 hover:text-green-600 pl-8 ml-3"
            :class="{ 'font-bold text-green-600': selectedMenu === 'address' }"
            @click="selectedMenu = 'address'"
          >
            <span>ที่อยู่จัดส่ง</span>
          </button>
         </RouterLink>
        </div>

        <!-- Section: รายการคำสั่งซื้อ -->
        <div class="border-b border-[#a7bfad] pb-4 mb-4">
          <div
            class="flex items-center space-x-2 text-gray-700 mb-2"
          >
            <font-awesome-icon :icon="['fas', 'receipt']" />
            <span class="pl-1">รายการคำสั่งซื้อ</span>
          </div>

          <RouterLink
          :to= "{ name: 'orderStatus' }">
          <button
          class="flex items-center space-x-2 text-gray-700 hover:text-green-600 pl-8 mb-2 ml-3"
          :class="{
            'font-bold text-green-600': selectedMenu === 'orderStatus',
          }"
          @click="selectedMenu = 'orderStatus'"
        >
          <span>สถานะคำสั่งซื้อ</span>
        </button>
        </RouterLink> 

        <!-- Section: ที่อยู่จัดส่ง -->
        <RouterLink
          :to= "{ name: 'orderHistory' }">
          <button
            class="flex items-center space-x-2 text-gray-700 hover:text-green-600 pl-8 ml-3"
            :class="{ 'font-bold text-green-600': selectedMenu === 'orderHistory' }"
            @click="selectedMenu = 'orderHistory'"
          >
            <span>ประวัติคำสั่งซื้อ</span>
          </button>
        </RouterLink>

        </div>
          
        

        <!-- Section: รายการอาหารที่สนใจ -->
        <div class="border-b border-[#a7bfad] pb-4 mb-4">
          <RouterLink
            :to= "{ name: 'favorites' }">
          <button
            class="flex items-center space-x-2 text-gray-700 hover:text-green-600"
            :class="{
              'font-bold text-green-600': selectedMenu === 'favorites',
            }"
            @click="selectedMenu = 'favorites'"
          >
            <font-awesome-icon :icon="['fas', 'heart']" />
            <span>รายการอาหารที่สนใจ</span>
          </button>
          </RouterLink>
        </div>

        <!-- Section: ออกจากระบบ -->
        <button
      class="flex items-center space-x-2 text-gray-700 hover:text-green-600"
      :class="{ 'font-bold text-green-600': selectedMenu === 'logout' }"
      @click="showPopup = true;"
    >
      <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
      <span>ออกจากระบบ</span>
    </button>
      </div>
    </div>
    </section>

    <!-- Divider (เส้นขั้นแนวตั้ง) -->
    <section class="flex h-screen w-0">
      <div class="divider divider-horizontal h-screen mx-2"></div>
    </section>
    
    <!-- Popup ยืนยันการ Logout -->
  <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <!-- Popup กล่อง -->
    <div class="bg-white rounded-lg p-10 shadow-lg z-10 w-100">
      <h3 class="text-lg font-bold text-[#316f3f]">คุณต้องการที่จะออกจากระบบหรือไม่</h3>
      <div class="mt-4 flex justify-end space-x-2">
        <!-- ปุ่ม Cancel -->
        <button class="flex-1 btn bg-white border-[#a7bfad]" @click="showPopup = false">ยกเลิก</button>
        <!-- ปุ่ม Confirm -->
        <button class="flex-1 btn bg-[#316f3f] text-white" @click="confirmLogout">ยืนยัน</button>
      </div>
    </div>
  </div>

</template>










<style scoped>
.divider:before {
    background-color: #a7bfad !important;
  }
  .divider:after {
    background-color: #a7bfad !important;
  }
</style>