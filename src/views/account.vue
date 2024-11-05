<script setup>
import navbar from "@/layout/User/navbar.vue";
import sideMenu from "@/components/sideMenu.vue";
import { useAccountStore } from "@/stores/account";
import { ref } from "vue";

const selectedMenu = ref("account"); // ตั้งค่าเริ่มต้นให้ 'account' ถูกเลือก

// Popup Modal
const showModal = ref(false);
const editField = ref("");
const editValue = ref("");

const AccountStore = useAccountStore();

const openEdit = (field) => {
  editField.value = field;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editField.value = "";
  editValue.value = "";
};

const saveChanges = () => {
  if (editField.value === "ชื่อโปรไฟล์") {
    AccountStore.updateUser(editValue.value);
  } else if (editField.value === "หมายเลขโทรศัพท์") {
    AccountStore.updatePhone(parseInt(editValue.value));
  }
  console.log(`Saving ${editField.value}: ${editValue.value}`);
  closeModal();
};



</script>

<template>
  <navbar />
  <div class="flex">
  <sideMenu :initialMenu="selectedMenu" />
    <!-- Main Content Section -->
    <section class="flex-grow p-6">
      <!-- เนื้อหาของส่วนหลัก (Main content) -->
      <div class="">
        <div class="card w-full bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-xl">ข้อมูลส่วนตัว</h2>
            <p class="text-sm text-gray-500">
              ข้อมูลส่วนบุคคลและตัวเลือกในการจัดการ
            </p>

            <div class="divider"></div>

            <div class="flex items-center">
              <span class="flex-1">ชื่อโปรไฟล์</span>
              <div class="flex-1">{{ AccountStore.user.username }}</div>
                <button @click="openEdit('ชื่อโปรไฟล์')" class="flex-1 text-right text-green-600">
                  แก้ไข
                </button>

            </div>

            <div class="divider"></div>

            <div class="flex items-center">
              <span class="flex-1">หมายเลขโทรศัพท์</span>
              <div class="flex-1"><span v-if ="AccountStore.user.phone">0</span>{{AccountStore.user.phone}}</div>
                <button
                  @click="openEdit('หมายเลขโทรศัพท์')"
                  class="text-green-600 flex-1 text-right"
                >
                  แก้ไข
                </button>
              </div>

            <div class="divider"></div>

            <div class="flex items-center">
              <span class="flex-1">อีเมล</span>
              <div class="flex-1">{{ AccountStore.user.email }}</div>
              <div class="flex-1 text-right"></div>
              </div>
              
            </div>
            
          </div>


        <!-- Popup Modal -->
        <div v-if="showModal" class="modal modal-open">
          <div class="modal-box">
            <h3 class="font-bold text-lg">{{ editField }}</h3>
            <input
              type="text"
              v-model="editValue"
              class="input input-bordered w-full mt-4"
            />
            <div class="modal-action">
              <button class="btn bg-[#316f3f] text-white" @click="saveChanges">
                บันทึก
              </button>
              <button class="btn" @click="closeModal">ยกเลิก</button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
    </div>
</template>



<style scoped>

</style>
