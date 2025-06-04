<script setup>
import logoAdmin from '@/assets/logoAdmin.png'

import { useAccountStore } from '@/stores/account';

import { ref , onMounted} from 'vue';
import { RouterLink , useRoute} from 'vue-router';

const AccountStore = useAccountStore();
const route = useRoute();
const activeMenu = ref('');

onMounted(() => {
    activeMenu.value = route.name
})

const menus =  [
    {  
        name: 'Product',
        routeName: 'AdminProductList',
    },
    {  
        name: 'Order',
        routeName: 'AdminOrderList',
    },
    {  
        name: 'Logout',
        routeName: 'login',
    },
]

</script>




<template>
<div class="drawer drawer-open">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <slot></slot>
  </div>
  <div class="drawer-side">
    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <img :src ="logoAdmin" alt="logo" class="w-52 mx-6" />
      <!-- Sidebar content here -->
      <li v-for="menu in menus">
            <RouterLink :to="{name: menu.routeName}"
            :class="menu.routeName === activeMenu ? 'active' : ''" class="text-[#316f3f] hover:font-bold">{{ menu.name }}</RouterLink>
        </li>
    </ul>
  </div>
</div>
</template>