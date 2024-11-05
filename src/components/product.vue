<script setup>
import { defineProps } from 'vue';

defineProps({
    product: Array
})
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Card 1 -->
        <div v-for ="product in product" class="card w-60 bg-white shadow-xl">
          <img src="@/assets/megaMeat.png" alt="Mega Meat Burger" class="w-full h-32 object-cover" />
          <div class="card-body text-center">
            <h2 class="text-lg font-bold text-[#316f3f]">Mega Meat Burger</h2>
            <p class="text-[#316f3f]">Price: ฿129</p>
            <button class="btn bg-[#316f3f] mt-4 text-white">ADD TO CART</button>
            </div>
        </div>
    </div>
</template>