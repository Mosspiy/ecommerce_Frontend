<script setup>
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useAdminOrderStore } from "@/stores/admin/order";
import Adminlayout from "@/layout/Admin/Adminlayout.vue";

const route = useRoute();
const adminOrderStore = useAdminOrderStore();

const updateStatus = (e) => {
  adminOrderStore.updateOrderStatus(parseInt(route.params.id), e.target.value);
};

onMounted(() => {
  adminOrderStore.getOrderDetail(parseInt(route.params.id));
});
</script>
<template>
  <Adminlayout>
    <div v-for="order in adminOrderStore.orderDetail" class="shadow-xl p-8 mt-4">
      <div class="px-10">
        <div class="font-bold text-xl">
          รายการคำสั่งซื้อ #{{ order.order_id }}
        </div>
        <div class="mt-4 font-bold">ที่อยู่</div>
        <div>{{ order.delivery_to }}</div>
        <div class="mt-4 font-bold">เมนู</div>

        <div
          v-for="menu in order.menuItems"
          class="grid grid-cols-4 item-center mt-4"
        >
          <div>{{ menu.quantity }}</div>
          <div>
            <div class="font-bold">{{ menu.product_name }}</div>
            <div v-for="addon in menu.addons">
              <p class="text-sm text-gray-500 ml-2">- {{ addon }}</p>
            </div>
          </div>
          <div></div>
          <div class="text-right">$ {{ menu.price * menu.quantity }}</div>
          <div></div>
          <div></div>
          <div></div>
          <div class="text-right">$ {{ menu.addonsPrice }}</div>
        </div>

        <div class="divider"></div>
        <div class="grid grid-cols-4 item-center">
          <div>ยอดสุทธิ</div>
          <div></div>
          <div></div>
          <div class="text-right">$ {{ order.total_amount }}</div>
        </div>
        <div class="divider"></div>
        <div class="grid grid-cols-4">
          <div>วิธีชำระเงิน</div>
          <div></div>
          <div></div>
          <div>
            <div class="text-right">โอน</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="flex justify-between mt-4">
          <RouterLink
            :to="{ name: 'AdminOrderList' }"
            class="btn bg-[#316f3f] text-white"
            >Back</RouterLink
          >
          <select
            @change="updateStatus"
            class="select select-bordered select-sm border-[#316f3f] text-[#316f3f]"
          >
            <option disabled selected>กำลังตรวจสอบคำสั่งซื้อ</option>
            <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
            <option value="กำลังนำส่ง">กำลังนำส่ง</option>
            <option value="เสร็จสิ้น">เสร็จสิ้น</option>
          </select>
        </div>
      </div>
    </div>
  </Adminlayout>
</template>
