<script setup>
import { ref } from 'vue';
import navbar from '@/layout/User/navbar.vue';
</script>

<template>
  <navbar />
  <section class="flex min-h-screen">
    <!-- Sidebar -->
    <section class="flex w-1/5 p-10">
      <div class="flex flex-col w-full">
        <!-- ส่วนหัวต้อนรับ -->
        <div class="border-b border-[#a7bfad] pb-4 mb-4">
          <div class="text-2xl font-bold">
            <p class="font-bold mb-4">สวัสดี, <span class="text-green-600">User001</span></p>
          </div>
        </div>

        <!-- RouterLink: บัญชีของฉัน -->
        <RouterLink
          to="/account"
          class="flex items-center space-x-2 text-gray-700 hover:text-green-600 mb-2"
          :class="{'font-bold text-green-600': $route.path === '/account'}"
        >
          <font-awesome-icon :icon="['fas', 'user']" />
          <span>บัญชีของฉัน</span>
        </RouterLink>

        <!-- RouterLink: ข้อมูลส่วนตัว -->
        <RouterLink
          to="/personalInfo"
          class="flex items-center space-x-2 text-gray-700 hover:text-green-600 pl-8 mb-2 ml-3"
          :class="{'font-bold text-green-600': $route.path === '/personalInfo'}"
        >
          <span>ข้อมูลส่วนตัว</span>
        </RouterLink>

        <!-- RouterLink: ที่อยู่จัดส่ง -->
        <div class="border-b border-[#a7bfad] pb-4 mb-4">
          <RouterLink
            to="/address"
            class="flex items-center space-x-2 text-gray-700 hover:text-green-600 pl-8 ml-3"
            :class="{'font-bold text-green-600': $route.path === '/address'}"
          >
            <span>ที่อยู่จัดส่ง</span>
          </RouterLink>
        </div>

        <!-- RouterLink: รายการคำสั่งซื้อ -->
        <div class="border-b border-[#a7bfad] pb-4 mb-4">
          <RouterLink
            to="/orders"
            class="flex items-center space-x-2 text-gray-700 hover:text-green-600"
            :class="{'font-bold text-green-600': $route.path === '/orders'}"
          >
            <font-awesome-icon :icon="['fas', 'receipt']" />
            <span class="pl-1">รายการคำสั่งซื้อ</span>
          </RouterLink>
        </div>

        <!-- RouterLink: รายการอาหารที่สนใจ -->
        <div class="border-b border-[#a7bfad] pb-4 mb-4">
          <RouterLink
            to="/favorites"
            class="flex items-center space-x-2 text-gray-700 hover:text-green-600"
            :class="{'font-bold text-green-600': $route.path === '/favorites'}"
          >
            <font-awesome-icon :icon="['fas', 'heart']" />
            <span>รายการอาหารที่สนใจ</span>
          </RouterLink>
        </div>

        <!-- RouterLink: ออกจากระบบ -->
        <RouterLink
          to="/logout"
          class="flex items-center space-x-2 text-gray-700 hover:text-green-600"
          :class="{'font-bold text-green-600': $route.path === '/logout'}"
        >
          <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
          <span>ออกจากระบบ</span>
        </RouterLink>
      </div>
    </section>

    <!-- Divider (เส้นขั้นแนวตั้ง) -->
    <section class="flex h-screen">
      <div class="divider divider-horizontal mx-1 " ></div>
    </section>

    <!-- Main Content Section -->
    <router-view class="flex-grow p-10"></router-view>
  </section>
  
</template>

<style scoped>
.divider:before {
  background-color: #a7bfad !important;
}
.divider:after {
  background-color: #a7bfad !important;
}
</style>