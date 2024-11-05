<script setup>
import Adminlayout from "@/layout/Admin/Adminlayout.vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { useAdminProductStore } from "@/stores/admin/product";

const formData = [
  {
    name: "Name",
    field: "name",
  },
  {
    name: "Price",
    field: "price",
  },
  {
    name: "About",
    field: "about",
  },
];

let formDataProduct = new FormData();

const adminProductStore = useAdminProductStore();
const router = useRouter();
const route = useRoute();

const productIndex = ref(-1);
const mode = ref('ADD PRODUCT');
const imagePreview = ref("https://via.placeholder.com/100");



const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    formDataProduct.append("file", file);
    imagePreview.value = URL.createObjectURL(file);
  }
};

const productData = reactive({
  name: "",
  image: "",
  price: "",
  status: "",
  category: "",
  about: "", // เพิ่มฟิลด์นี้สำหรับการบรรยาย
});

const addProduct = async () => {
  formDataProduct.append("name", productData.name);
  formDataProduct.append("price", productData.price);
  formDataProduct.append("category", productData.category);
  formDataProduct.append("status", productData.status);
  formDataProduct.append("description", productData.about);

  await adminProductStore.addProduct(formDataProduct);
  router.push({ name: "AdminProductList" });
};

const updateProduct = async () => {
  try {
    formDataProduct = new FormData();
    formDataProduct.append("name", productData.name);
    formDataProduct.append("price", productData.price);
    formDataProduct.append("category", productData.category);
    formDataProduct.append("status", productData.status);
    formDataProduct.append("description", productData.about);
    console.log("Updating product with data:", Object.fromEntries(formDataProduct)); // แสดงข้อมูลที่จะส่ง

    await adminProductStore.updateProduct(route.params.id, formDataProduct);
    router.push({ name: "AdminProductList" });
  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update product. Please try again.");
  }
};

const handleFuctionMode = async () => {
  if (mode.value === 'EDIT') {
    await updateProduct();
  } else {
    await addProduct();
  }
  formDataProduct = new FormData();
};

const getItem = async () => {
  if (productIndex.value >= 0) {
    const product = await adminProductStore.getProduct(productIndex.value);
    console.log('Product Data:', product);
    productData.name = product.name;
    productData.price = product.price;
    productData.category = product.category;
    productData.status = product.status;
    productData.about = product.description;
    
    // แสดง URL ของภาพที่ได้จาก API
    if (product.imageUrl) {
      imagePreview.value = product.imageUrl; // ใช้ URL ของภาพที่ได้จาก API
    } else {
      imagePreview.value = "https://via.placeholder.com/100"; // ถ้าไม่มีให้ใช้ placeholder
    }
  }
};
const cancel = () => {
  productData.name = "";
  productData.price = "";
  productData.category = "";
  productData.status = "";
  productData.about = "";
  formDataProduct = new FormData();
  router.push({ name: "AdminProductList" }); // นำกลับไปยังหน้า AdminProductList
};

onMounted(() => {
  if (route.params.id) {
    productIndex.value = parseInt(route.params.id);
    mode.value = "EDIT";
    getItem();
  }
});
</script>
<template>
  <Adminlayout>
    <div class="p-8 mt-4">
      <div class="text-3xl font-bold">{{ mode }}</div>
      <div class="divider my-8"></div>
      <div class="grid grid-cols-2">
        <div class="flex flex-col items-center">
          <div
            class="w-64 h-64 bg-gray-200 rounded-md flex items-center justify-center"
          >
            <img
              :src="imagePreview"
              alt="image-preview"
              class="w-full h-full rounded-md object-cover"
            />
          </div>
          <input
            @change="handleFileUpload"
            accept=".jpg, .jpeg, .png"
            type="file"
            class="file-input file-input-bordered file-input-primary w-full max-w-xs mt-4" />
        </div>

        <!-- ส่วนฟอร์ม -->
    <div class="w-10/12">
        <div v-for="form in formData" class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ form.name }}</span>
          </label>
          <input 
            type="text" 
            class="input input-bordered w-full"
            v-model="productData[form.field]" 
            />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">เลือกหมวดหมู่</span>
          </label>
          <select v-model="productData.category" class="select select-bordered w-full">
            <option>เบอร์เกอร์</option>
            <option>พาสต้า</option>
            <option>ของทานเล่น</option>
            <option>เครื่องดื่ม</option>
            <option>คอมโบเซ็ต</option>
          </select>
          <label class="label">
            <span class="label-text">สถานะ</span>
          </label>
          <select v-model="productData.status" class="select select-bordered w-full">
            <option>active</option>
            <option>inactive</option>
          </select>
        </div>
        <div class="modal-action flex justify-end space-x-4 ">
          <button class="btn" @click="cancel">ยกเลิก</button>
          <button class="btn btn-primary" @click="handleFuctionMode">{{ mode }}</button>
        </div>
    </div>
    </div>
</div>
<div class="divider p-8 mt-4"></div>
  </Adminlayout>
</template>
