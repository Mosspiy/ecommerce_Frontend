<script setup>
import navbar from "@/layout/User/navbar.vue";
import sideMenu from "@/components/sideMenu.vue";

import { ref, onMounted } from "vue";
import { useAccountStore } from "@/stores/account";
import { useAdminOrderStore } from "@/stores/admin/order";

const AccountStore = useAccountStore();
const OrderStore = useAdminOrderStore();

const selectedMenu = ref("orderHistory");
const isReviewModalOpen = ref(false);
const rating = ref(1);
const reviewOptions = ref([]);
const reviewText = ref("");

const openReviewModal = () => {
  isReviewModalOpen.value = true;
};

const closeReviewModal = () => {
  isReviewModalOpen.value = false;
  resetReview();
};

const submitReview = (order_id, index) => {
  OrderStore.updateReview(
    order_id,
    index,
    rating.value,
    reviewOptions.value,
    reviewText.value
  );
  reviewOptions.value = [];
  reviewText.value = "";
  rating.value = 1;
  closeReviewModal();
};

const resetReview = () => {
  rating.value = 0;
  reviewOptions.value = [];
  reviewText.value = "";
};

onMounted(() => {
  OrderStore.loadOrders();
});
</script>

<template>
  <navbar />
  <div class="flex">
    <sideMenu :initialMenu="selectedMenu" />
    <div class="p-6 flex-grow">
      <div class="w-full">
        <!-- Order history -->
        <div class="w-full bg-base-100 p-4">
          <h2 class="text-lg font-bold mb-2">ประวัติคำสั่งซื้อ</h2>
          <div
            v-for="(order, index) in OrderStore.orders"
            class="border-t pt-2 w-full bg-base-100 shadow-md rounded-lg p-4 mt-4"
          >
            <p class="font-semibold">รายการคำสั่งซื้อ #{{ order.order_id }}</p>
            <div class="mt-4">
              <h3 class="font-semibold">เมนู</h3>
              <ul class="mt-2">
                <li
                  v-for="menu in order.menuItems"
                  class="flex justify-between"
                >
                  <span
                    >x{{ menu.quantity }} {{ menu.product_name }}
                    <span class="text-sm text-gray-500"
                      ><p v-for="addon in menu.addons" class="ml-5">- {{ addon }}</p>
                    </span></span
                  >
                  <span>฿ {{ menu.price + menu.addonsPrice }}</span>
                </li>
              </ul>
            </div>

            <div class="border-t mt-4 pt-2 flex justify-between">
              <span class="font-semibold">ยอดสุทธิ</span>
              <span class="font-bold text-green-600"
                >฿ {{ order.total_amount }}</span
              >
            </div>
            <div class="border-t mt-4 pt-2 flex justify-between">
              <span>วิธีการชำระเงิน</span>
              <span class="text-orange-500">SCB EASY</span>
            </div>

            <div class="flex justify-end mt-4">
              <button
                @click="openReviewModal"
                class="btn bg-[#316f3f] text-white w-40"
              >
                รีวิว
              </button>
            </div>
          </div>
        </div>

        <!-- Review Modal -->
        <div v-if="isReviewModalOpen" class="modal modal-open">
          <div class="modal-box max-w-xl">
            <h3 class="font-bold text-lg text-[#316f3f]">ให้คะแนนคำสั่งซื้อ</h3>
            <div class="mt-4">
              <!-- Star Rating -->
              <div class="flex items-center justify-center">
                <div class="rating rating-lg">
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                  />
                </div>
              </div>
              <!-- Review Checkbox Options -->
              <div class="mt-4">
                <label class="flex items-center justify-center">
                  <input
                    type="checkbox"
                    value="คุณภาพอาหาร"
                    class="checkbox border-[#316f3f] mr-1"
                  />
                  <span class="mr-3">คุณภาพอาหาร</span>
                  <input
                    type="checkbox"
                    value="การจัดส่ง"
                    class="checkbox border-[#316f3f] mr-1"
                  />
                  <span class="mr-3">การจัดส่ง</span>
                  <input
                    type="checkbox"
                    value="ความคุ้มค่า"
                    class="checkbox border-[#316f3f] mr-1"
                  />
                  <span class="mr-3">ความคุ้มค่า</span>
                  <input
                    type="checkbox"
                    value="ความคุ้มค่า"
                    class="checkbox border-[#316f3f] mr-1"
                  />
                  <span class="mr-3">การบริการ</span>
                </label>
              </div>
              <!-- Review Text Area -->
              <div class="mt-4">
                <textarea
                  v-model="reviewText"
                  class="textarea textarea-bordered w-full border-[#316f3f]"
                  placeholder="เขียนความคิดเห็นของคุณ..."
                ></textarea>
              </div>
            </div>
            <div class="modal-action">
              <button
                @click="closeReviewModal"
                class="btn bg-white border-[#316f3f] text-[#316f3f]"
              >
                ยกเลิก
              </button>
              <button @click="submitReview" class="btn bg-[#316f3f] text-white">
                ส่งรีวิว
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles if needed */
</style>
