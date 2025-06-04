<script setup>
import logo from "@/assets/logo_bb.png";
import { RouterLink, useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useAccountStore } from "@/stores/account";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const route = useRoute();
const AccountStore = useAccountStore();
const searchText = ref("");
const router = useRouter();
const changeCategory = (category) => {
  router.push({ name: "products", query: { category } });
};
const handleSearch = () => {
  if (searchText.value.trim()) {
    router.push({ name: "products", query: { search: searchText.value } });
  }
};
const handleLogout = () => {
  AccountStore.logout();
  window.location.reload();
};

const itemCount = computed(() => cartStore.summeryQuantity);
console.log(itemCount);

onMounted(async () => {
  if (route.query.search) {
    search.value = route.query.search; // ค่า query ที่ส่งมาจากช่องค้นหา
    productStore.searchProducts(search.value);
  }
});
</script>

<template>
  <header
    class="bg-[#ffbd59] flex justify-between items-center sticky top-0 z-50 px-8 py-3"
  >
    <!-- Logo Section -->
    <div class="flex items-center">
      <RouterLink to="/">
        <img
          :src="logo"
          alt="Logo"
          class="h-16 transition-transform duration-300 hover:scale-125 hover:rotate-6 cursor-pointer"
        />
      </RouterLink>
    </div>

    <!-- Search Section -->
    <div class="flex items-center" style="min-width: 300px">
      <input
        type="text"
        placeholder="Search"
        v-model="searchText"
        @keyup.enter="handleSearch"
        class="input input-bordered w-full"
      />
      <button class="btn bg-[#316f3f]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m0 0a8.5 8.5 0 111.17-1.17l4.35 4.35z"
          />
        </svg>
      </button>
    </div>

    <!-- Menu Section -->
    <div class="flex-0 items-center space-x-10 pr-4">
      <RouterLink to="/" class="text-[#316f3f] hover:underline"
        >Home</RouterLink
      >
      <div class="dropdown dropdown-hover">
        <RouterLink
          to="/products"
          class="text-[#316f3f] hover:underline cursor-pointer flex items-center"
        >
          Menu
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-4 h-4 ml-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </RouterLink>
        <ul
          tabindex="0"
          class="dropdown-content menu text-[#316f3f] p-2 shadow bg-white rounded-box w-52"
        >
          <li>
            <a @click.prevent="changeCategory('เบอร์เกอร์')">เบอร์เกอร์</a>
          </li>
          <li><a @click.prevent="changeCategory('พาสต้า')">พาสต้า</a></li>
          <li>
            <a @click.prevent="changeCategory('ของทานเล่น')">ของทานเล่น</a>
          </li>
          <li>
            <a @click.prevent="changeCategory('เครื่องดื่ม')">เครื่องดื่ม</a>
          </li>
          <li><a @click.prevent="changeCategory('คอมโบเซ็ต')">คอมโบเซ็ต</a></li>
        </ul>
      </div>
      <RouterLink to="contact" class="text-[#316f3f] hover:underline"
        >Contact Us</RouterLink
      >

      <div class="indicator">
        <span
          v-if="itemCount > 0"
          class="indicator-item badge badge-error text-white"
          >{{ itemCount }}
        </span>
        <RouterLink
          v-if="AccountStore.isLoggedIn"
          to="/cart"
          class="text-[#316f3f] hover:underline"
        >
          <font-awesome-icon
            :icon="['fas', 'cart-shopping']"
            class="w-5 h-5 mr-1"
          />Cart
        </RouterLink>
      </div>
      <div class="dropdown dropdown-hover">
        <RouterLink
          v-if="AccountStore.isLoggedIn"
          to="/account"
          class="text-[#316f3f] hover:underline"
        >
          <font-awesome-icon
            :icon="['fas', 'user']"
            class="w-5 h-5 mr-1"
          />Account
        </RouterLink>
        <ul
          tabindex="0"
          class="dropdown-content menu p-1 shadow bg-white rounded-box w-39 text-[#316f3f]"
        >
          <li><RouterLink to="/account">Profile</RouterLink></li>
          <li>
            <button @click="handleLogout" class="text-red-500">Logout</button>
          </li>
        </ul>
      </div>
      <RouterLink v-if="!AccountStore.isLoggedIn" to="/login">
        <button class="btn bg-[#316f3f] text-white">Login</button>
      </RouterLink>
    </div>
  </header>
  <slot></slot>
</template>
