<script setup>
import { RouterLink } from "vue-router";
import Adminlayout from '@/layout/Admin/Adminlayout.vue';
import { useAdminOrderStore } from '@/stores/admin/order';

import Table from "@/components/Table.vue";
import { onMounted } from "vue";

const adminOrderStore = useAdminOrderStore();

onMounted(() => {
    adminOrderStore.loadOrdersAdmin();
})
</script>
<template>
    <Adminlayout>
        <div class="flex items-center justify-between my-4">
      <div class="text-3xl font-bold p-4">Order</div>
    </div>
    <Table :headers="['Order ID', 'Customer Name', 'Price', 'Status', 'Update At','']">
        <tr v-for ="(order, index) in adminOrderStore.orders">
            <th>#{{ order.order_id }}</th>
            <th>{{ order.customerName }}</th>
            <td>{{ order.total_amount }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.create_at }}</td>
            <td>
                <RouterLink
                :to ="{ name: 'AdminOrderDetail', params: { id: order.order_id } }" class="btn">See Detail</RouterLink>
            </td>
        </tr>
    </Table>
    </Adminlayout>
</template>