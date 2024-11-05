<script setup>
import navbar from '@/layout/User/navbar.vue';
import sideMenu from '@/components/sideMenu.vue';
import { ref, reactive } from "vue";
import { useAccountStore } from '@/stores/account';
import  trash  from '@/components/icons/trash.vue';

const AccountStore = useAccountStore();
// กำหนดค่าตัวแปรและฟังก์ชันต่างๆ โดยใช้ Composition API
const selectedMenu = ref("address");
const showModal = ref(false);
const modalTitle = ref("");

// ใช้ reactive เพื่อสร้างข้อมูล formData
const formData = reactive({
  name: "",
  phone: "",
  address: "",
  subdistrict: "",
  district: "",
  province: "",
  zipcode: "",
  }
);


const addAddress = () => {
  modalTitle.value = "เพิ่มที่อยู่จัดส่ง";
  showModal.value = true;
};

const removeAddress = () => {
  AccountStore.removeAddress();
};

const closeModal = () => {
  showModal.value = false;
  clearForm();
};

const saveChanges = () => {
  const address = formData.address + " " + formData.subdistrict + " " + formData.district + " " + formData.province + " " + formData.zipcode;
  const name = formData.name.split(" ")[0]
  const lastname = formData.name.split(" ")[1]
  AccountStore.updateAddress(name, lastname, address,formData.phone );
  
  closeModal();
};

const clearForm = () => {
  formData.name = "";
  formData.phone = "";
  formData.address = "";
  formData.subdistrict = "";
  formData.district = "";
  formData.province = "";
  formData.zipcode = "";
};
</script>
<template>
    <navbar/>
    <div class="flex">
      <sideMenu :initialMenu="selectedMenu"/>
    <div class="p-6 flex-grow">
      <div class="card w-full bg-base-100 shadow-md">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="card-title text-xl">ที่อยู่จัดส่ง</h2>
              <p class="text-sm text-gray-500">ที่อยู่จัดส่งอาหาร</p>
            </div>
            <button v-if="!AccountStore.user.address" class="text-green-600 flex items-center space-x-1" @click="addAddress">
              <span class="text-lg">+</span>
              <span>เพิ่มที่อยู่</span>
            </button>
          </div>
          <div class="divider"></div>
          <div class="grid grid-cols-4 items-center">
              <div>
            <div class="mb-2 font-bold">{{ AccountStore.user.name }} {{ AccountStore.user.lastname }}</div>
            <div><span v-if="AccountStore.user.phoneads">0</span>{{ AccountStore.user.phoneads }}</div>
            </div>
            <div class="col-span-2">{{ AccountStore.user.address}} </div>
            <div class="flex justify-end gap-6">
              <div v-if="AccountStore.user.address" @click="removeAddress(index)" class="btn btn-ghost">
                  <trash/>
                </div>
          </div>
          </div>
        </div>
      </div>
      
    </div>
    

  
    <!-- Popup Modal -->
    <div v-if="showModal" class="modal modal-open">
      <div class="modal-box max-w-5xl">
        <h3 class="font-bold text-lg mb-4 text-[#316f3f]">{{ modalTitle }}</h3>
        <form @submit.prevent="saveChanges">
          <div class="grid grid-cols-2 gap-4 text-[#316f3f]">
            <input type="text" v-model="formData.name" placeholder="ชื่อ-นามสกุล" class="input input-bordered w-full" />
            <input type="text" v-model="formData.phone" placeholder="หมายเลขโทรศัพท์" class="input input-bordered w-full" />
            <input type="text" v-model="formData.address" placeholder="ที่อยู่" class="input input-bordered w-full col-span-2" />
            <input type="text" v-model="formData.subdistrict" placeholder="แขวง/ตำบล" class="input input-bordered w-full" />
            <input type="text" v-model="formData.district" placeholder="อำเภอ/เขต" class="input input-bordered w-full" />
            <input type="text" v-model="formData.province" placeholder="จังหวัด" class="input input-bordered w-full" />
            <input type="text" v-model="formData.zipcode" placeholder="รหัสไปรษณีย์" class="input input-bordered w-full" />
          </div>
          <div class="modal-action mt-6 flex justify-end">
            <button type="button" class="btn bg-white border-[#a7bfad] text-[#316f3f] mr-2" @click="closeModal">ยกเลิก</button>
            <button type="submit" class="btn bg-[#316f3f] text-white">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </template>
  
  
  
  <style scoped>
  .modal-open {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
  }
  </style>
  