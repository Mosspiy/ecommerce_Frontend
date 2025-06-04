<script setup>
import hero from '@/assets/hero.png';
import navbar from '@/layout/User/navbar.vue';
import { RouterLink } from 'vue-router';
import MegaMeat from '@/assets/megaMeat.png';
import MeatPasta from '@/assets/meatPasta.png';
import SchoolCombo from '@/assets/schoolCombo.png';
import DoubleMeat from '@/assets/DoubleMeat.png'; 
import Promotion from '@/assets/promotion.png';



</script>


<template>
  <navbar />
  <div class="flex flex-col lg:flex-row items-center justify-center bg-gray-50 p-6 lg:p-10">
    <!-- Left Section: Text and Buttons -->
    <div class="text-center lg:text-left lg:max-w-md lg:mr-[200px]">
      <h1 class="text-7xl font-bold mb-4 font-chewy">
        Welcome To
        <span class="text-green-600 font-chewy">Our Big <span class="text-green-800 font-chewy">Bite</span></span>
      </h1>
      <p class="text-gray-600 mb-6 ">
        สัมผัสความอร่อยกับเบอร์เกอร์ที่ทำสดใหม่และเต็มไปด้วยรสชาติจากวัตถุดิบคุณภาพ ที่ Big Bite เรามุ่งมั่นในการส่งมอบมื้ออาหารที่อัดแน่นไปด้วยความอร่อย ไม่ว่าจะเป็นเบอร์เกอร์เนื้อฉ่ำ พาสต้าแสนอร่อย หรือของว่างหลากหลายเมนู เรามีทุกอย่างที่ตอบโจทย์ความหิวของคุณ
สั่งอาหารตอนนี้ แล้วมาลิ้มรสความอร่อยที่คุณไม่ควรพลาด!
      </p>
      <div class="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start">
        <RouterLink to ="/products"><button class="btn bg-[#316f3f] text-white">Order now</button></RouterLink>
        <RouterLink to ="/contact"><button class="btn bg-[#ffbd59]">See more</button></RouterLink>
    </div>
    </div>
    <!-- Right Section: Image -->
    <div class="mt-6 lg:mt-0 relative">
      <!-- Burger Image -->
      <img :src="hero" alt="Burger" class="relative z-10 w-64 h-64 lg:w-[650px] lg:h-[500px] object-cover">
    </div>
  </div>

  <!--Popular Section-->
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mb-8 pt-10 font-chewy">Popular</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- Card 1 -->
      <div class="card w-60 bg-white shadow-xl">
        <img :src="MegaMeat" alt="Mega Meat Burger" class="w-full h-32 object-cover" />
        <div class="card-body text-center">
          <h2 class="text-lg font-bold text-[#316f3f]">Mega Meat Burger</h2>
          <p class="text-[#316f3f]">Price: ฿129</p>
          <RouterLink to="/products"><button class="btn bg-[#316f3f] mt-4 text-white">ADD TO CART</button></RouterLink>
        </div>
      </div>
 <!-- Card 2 -->
      <div class="card w-60 bg-white shadow-xl">
        <img :src="MeatPasta" alt="Classic Meat Pasta" class="w-full h-32 object-cover" />
        <div class="card-body text-center">
          <h2 class="text-lg font-bold text-[#316f3f]">Classis Meat Pasta</h2>
          <p class="text-[#316f3f]">Price: ฿89</p>
          <RouterLink to="/products"><button class="btn bg-[#316f3f] mt-4 text-white">ADD TO CART</button></RouterLink>
        </div>
      </div>
 <!-- Card 3 -->
      <div class="card w-60 bg-white shadow-xl">
        <img :src="SchoolCombo" alt="School Combo" class="w-full h-32 object-cover" />
        <div class="card-body text-center">
          <h2 class="text-lg font-bold text-[#316f3f]">School Combo</h2>
          <p class="text-[#316f3f]">Price: ฿129</p>
          <p></p>
          <RouterLink to="/products"><button class="btn bg-[#316f3f] mt-4 text-white">ADD TO CART</button></RouterLink>
        </div>
      </div>
 <!-- Card 4 -->
      <div class="card w-60 bg-white shadow-xl">
        <img :src="DoubleMeat" alt="Double Meat Burger" class="w-full h-32 object-cover" />
        <div class="card-body text-center">
          <h2 class="text-lg font-bold text-[#316f3f]">Double Meat Burger</h2>
          <p class="text-[#316f3f]">Price: ฿159</p>
          <RouterLink to="/products"><button class="btn bg-[#316f3f] mt-4 text-white">ADD TO CART</button></RouterLink>
        </div>
      </div>
    </div>

    <div>
      <img :src="Promotion" alt="Promotion" class="w-full h-85 object-cover" style="filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5));"/>
    </div>
  </div>


  
</template>

<style scoped>
.bg-custom {
  background-image: url('../assets/hero.png') ;
  background-size: cover;
  background-repeat: no-repeat;
  
}
</style>
