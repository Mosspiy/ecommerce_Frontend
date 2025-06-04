<script setup>
import navbar from '@/layout/User/navbar.vue';
import contact from '@/assets/contact.png';
</script>

<template>
  <navbar />
  <div class="h-1/2">
  <div class="flex justify-center items-center" 
       style="height: calc(100vh - 88px);"
       >
    <img
      :src="contact"
      alt="Burger and Drink"
      class="w-1/2 h-full object-contain rounded-l-lg min-w-0"
    />
    <div class="p-8 top-0 w-1/2">
      <h2 class="text-6xl font-extrabold">
        About <span class="text-green-500">Big Bite</span>
      </h2>
      <p class="mt-6 mr-8 text-xl text-gray-700">ที่อยู่ของร้าน:</p>
      <p class="mt-6 mr-8 text-xl text-gray-700">ชื่อร้าน: Big Bite:</p>
      <p class="mt-6 mr-8 text-xl text-gray-700">ที่ตั้ง: 123/4 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพฯ 10260:</p>
      <p class="mt-6 mr-8 text-xl text-gray-700">โทรศัพท์: 02-123-4567:</p>
      <p class="mt-6 mr-8 text-xl text-gray-700">อีเมล: contact@bigbite.com</p>

    </div>
  </div>
  </div>
</template>

<script>

</script>

<style scoped>
</style>
