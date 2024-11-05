<script setup>
import navbar from '@/layout/User/navbar.vue';
import sideMenu from '@/components/sideMenu.vue';
import "@fortawesome/fontawesome-free/css/all.min.css";
import pasta from '@/assets/pasta.jpg';
import pizza from '@/assets/Pizza-Fries.jpg';
import ff from '@/assets/French-Fry-Casserole.jpg';
import { ref } from 'vue';

const selectedMenu = ref('favorites');


</script>

<template>
    <navbar />
    <div class="flex"> 
            <sideMenu :initialMenu="selectedMenu" />
            <section class="w-3/4">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-4 pl-4"
        >
            <div class="card w-30 bg-white shadow-xl"
          >
            <img
              :src="pasta"
              alt="Product Image"
              class="w-full h-60 object-cover rounded-t-lg"
            />
            <div class="card-body text-center">
              <h2 class="text-lg font-bold text-[#316f3f]">
                Fettuccine Alfredo
              </h2>
              <p class="text-[#316f3f] ">Price: ฿ 149</p>
              <div class="flex justify-center mt-4">
                <button
                  class="btn bg-[#316f3f] text-white mr-2"
                >
                  ADD TO CART
                </button>
                <button
                  class="btn bg-transparent border border-[#316f3f] text-[#316f3f]"
                >
                  <i
                    class='fas fa-heart'
                  ></i>
                </button>
              </div>
            </div>
            </div>


            <div class="card w-30 bg-white shadow-xl"
          >
            <img
              :src="ff"
              alt="Product Image"
              class="w-full h-60 object-cover rounded-t-lg"
            />
            <div class="card-body text-center">
              <h2 class="text-lg font-bold text-[#316f3f]">
                French Fry Casserole
              </h2>
              <p class="text-[#316f3f] ">Price: ฿ 179</p>
              <div class="flex justify-center mt-4">
                <button
                  class="btn bg-[#316f3f] text-white mr-2"
                >
                  ADD TO CART
                </button>
                <button
                  class="btn bg-transparent border border-[#316f3f] text-[#316f3f]"
                >
                  <i
                    class='fas fa-heart'
                  ></i>
                </button>
              </div>
            </div>

            
            </div>
            <div class="card w-30 bg-white shadow-xl"
          >
            <img
              :src="pizza"
              alt="Product Image"
              class="w-full h-60 object-cover rounded-t-lg"
            />
            <div class="card-body text-center">
              <h2 class="text-lg font-bold text-[#316f3f]">
                Pizza Fries
              </h2>
              <p class="text-[#316f3f] ">Price: ฿ 159</p>
              <div class="flex justify-center mt-4">
                <button
                  class="btn bg-[#316f3f] text-white mr-2"
                >
                  ADD TO CART
                </button>
                <button
                  class="btn bg-transparent border border-[#316f3f] text-[#316f3f]"
                >
                  <i
                    class='fas fa-heart'
                  ></i>
                </button>
              </div>
            </div>

            
            </div>
          </div>
        </section> 
        
    </div>

</template>

