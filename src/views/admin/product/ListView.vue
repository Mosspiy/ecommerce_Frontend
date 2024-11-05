<script setup>
import { RouterLink } from "vue-router";
import Adminlayout from "@/layout/Admin/Adminlayout.vue";
import edit from "@/components/icons/edit.vue";
import trash from "@/components/icons/trash.vue";
import Table from "@/components/Table.vue";

import { useAdminProductStore } from "@/stores/admin/product";
import { onMounted } from "vue";


const adminProductStore = useAdminProductStore();
onMounted(() => {
  adminProductStore.loadProducts();
})


</script>
<template>
  <Adminlayout>
    <div class="flex items-center justify-between my-4">
      <div class="text-3xl font-bold p-4">Product</div>
      <div>
        <RouterLink :to ="{name: 'AdminProductCreate'}" class="btn btn-neutral">
          Add
        </RouterLink>

        
      </div>
    </div>
    <Table :headers="['Image', 'Name', 'Price', 'About', 'Status', 'Updated At', '']">
          <tr v-for="(product, index) in adminProductStore.products">
            <td>
              <img :src="product.imageUrl" class="w-24 h-24 object-contain" />
            </td>
            <th>{{ product.name }}</th>
            <td>{{ product.price }}</td>
            <td>{{ product.about }}</td>
            <td>
              <div 
                class="badge" 
                :class="product.status === 'active' ? 'badge-success' : 'badge-error'">{{ product.status }}</div>
            </td>
            <td>{{ product.updatedAt }}</td>
            <td>
              <div class="flex gap-2">
                <RouterLink :to="{ name: 'AdminProductUpdate', params: { id: product.product_id } }" class="btn btn-ghost">
                  <edit />
                </RouterLink>
                <button @click="adminProductStore.removeProduct(product.product_id)" class="btn btn-ghost">
                  <trash />
                </button>
              </div>
            </td>
          </tr>
    </Table>
    
  </Adminlayout>
</template>
