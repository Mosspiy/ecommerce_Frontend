<template>
  <div class="p-6">
    <div class="card w-full bg-base-100 shadow-md">
      <div class="card-body">
        <h2 class="card-title text-xl">ข้อมูลส่วนตัว</h2>
        <p class="text-sm text-gray-500">ข้อมูลส่วนบุคคลและตัวเลือกในการจัดการ</p>
        
        <div class="divider"></div>
        
        <div class="flex justify-between items-center">
          <span>ชื่อโปรไฟล์</span>
          <div class="flex items-center">
            <span class="mr-2">user001</span>
            <button @click="openEdit('ชื่อโปรไฟล์')" class="text-green-600">แก้ไข</button>
          </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="flex justify-between items-center">
          <span>หมายเลขโทรศัพท์</span>
          <div class="flex items-center">
            <span class="mr-2">0123456789</span>
            <button @click="openEdit('หมายเลขโทรศัพท์')" class="text-green-600">เพิ่มเบอร์มือถือ</button>
          </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="flex justify-between items-center">
          <span>อีเมล</span>
          <div class="flex items-center">
            <span class="mr-2">user@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
    
    
    <!-- Popup Modal -->
    <div v-if="showModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{{ editField }}</h3>
        <input type="text" v-model="editValue" class="input input-bordered w-full mt-4" />
        <div class="modal-action">
          <button class="btn btn-primary" @click="saveChanges">บันทึก</button>
          <button class="btn" @click="closeModal">ยกเลิก</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      editField: '',
      editValue: '',
    };
  },
  methods: {
    openEdit(field) {
      this.editField = field;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editField = '';
      this.editValue = '';
    },
    saveChanges() {
      // Implement logic to save the changes here
      console.log(`Saving ${this.editField}: ${this.editValue}`);
      this.closeModal();
    },
  },
};
</script>

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
