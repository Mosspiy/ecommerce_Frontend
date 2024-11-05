<script setup>
import "@fortawesome/fontawesome-free/css/all.min.css";
import navbar from "@/layout/User/navbar.vue";
import { ref , onMounted, computed , watch} from "vue";
import Slider from "primevue/slider";
import { useAdminProductStore } from "@/stores/admin/product";
import { useCartStore } from "@/stores/cart";
import { useRoute } from "vue-router";


const route = useRoute();
const CartStore = useCartStore();
const productStore = useAdminProductStore();
// Data
const search = ref(route.query.search || "");
const category = ref("ทุกประเภท");
const filter = ref(true);



watch(
  () => route.query.search,
  (newSearch) => {
    search.value = newSearch || "";
  }
);


// สถานะของหัวใจสำหรับแต่ละผลิตภัณฑ์
const favorites = ref([]); // Array ที่เก็บสถานะของปุ่มหัวใจ

const addons = ref([]); // Array ที่เก็บสถานะของปุ่มเพิ่มเติม

const openAddons = (index) => {
  addons.value[index].showModal();
};
const closeAddons = (index) => {
  addons.value[index].close();
}; 

const addonsPrice = ref(0)

const selectedAddons = ref([

])
const selectedAddon = (price,addons, event) => {
  if(event.target.checked){
    addonsPrice.value += price
    selectedAddons.value.push(addons)
    console.log(addonsPrice.value)
  }else{
    addonsPrice.value -= price
    selectedAddons.value.pop(addons)
    console.log(addonsPrice.value)
    
  }
  console.log(selectedAddons.value)
}




const addToCart = (index, product) => {
  const addons = JSON.stringify(selectedAddons.value);
  const newProduct = { ...product, addons ,addonsPrice: addonsPrice.value };
  console.log(newProduct);
  newProduct.quantity = 1;
  CartStore.addToCart(newProduct);
  closeAddons(index);
  
}

watch(() => route.query.category, (newCategory) => {
  category.value = newCategory || "ทุกประเภท";
});


onMounted(() => {
  productStore.loadProducts();
  favorites.value = new Array(productStore.products.length).fill(false);
  if (route.query.category) {
    category.value = route.query.category;
  }
})

const maxPrice = computed(() => {
  if (productStore.products.length > 0) {
    return Math.max(...productStore.products.map((p) => p.price));
  }
  return 500; // หรือค่าที่คุณต้องการให้แสดงในกรณีที่ไม่มีสินค้า
});
const minPrice = computed(() => {
  if (productStore.products.length > 0) {
    return Math.min(...productStore.products.map((p) => p.price));
  }
  return 0; // หรือค่าที่คุณต้องการให้แสดงในกรณีที่ไม่มีสินค้า
});
const price = ref([minPrice.value, maxPrice.value]);

const filteredProducts = computed(() => {
  let products = productStore.searchProducts(search.value);
  if (category.value !== "ทุกประเภท") {
    products = products.filter((product) => product.category === category.value);
  }
  // กรองสินค้าตามขอบเขตราคา
  products = products.filter((product) => 
    product.price >= price.value[0] && product.price <= price.value[1]
  );
  return products;
});

// ฟังก์ชันสำหรับเปลี่ยนสถานะของหัวใจ
function toggleFavorite(index) {
  favorites.value[index] = !favorites.value[index];
}
</script>

<template>
  <navbar>
    <section class="flex">
      <!-- Filter -->
      <section class="flex w-1/5">
        <div class="flex flex-col mx-auto mt-8 flex">
          <label class="text-[#316f3f]">ผลการค้นหา: “{{ search }}”</label>
          <div class="form-control w-full mt-8">
            <!-- Search -->
            <span class="label-text text-[#316f3f] font-bold mb-2">ค้นหาสินค้า</span>
            <input
              v-model="search"
              type="text"
              class="flex input input-sm input-bordered border-[#316f3f] w-full max-w-xs"
            />
            <button @click="productStore.loadProducts" class="btn bg-[#316f3f] text-white mt-2">ค้นหา</button>

            <!-- Price -->
            <span class="label-text text-[#316f3f] font-bold mt-4 mb-2"
              >ค้นหาตามราคา</span
            >
            <Slider
              v-model="price" range :min="minPrice" :max = "maxPrice"
              class="w-56 custom-slider"
            />
            <div class="flex justify-between mt-4">
              <div class="border border-[#316f3f] p-1">{{ price[0] }}</div>
              <div class="border border-[#316f3f] p-1">{{ price[1] }}</div>
            </div>

            <!-- Category -->
            <span class="label-text text-[#316f3f] font-bold mt-4 mb-2"
              >Category</span
            >
            <select
              v-model="category"
              class="select select-bordered select-sm border-[#316f3f] text-[#316f3f]"
            >
              <option>ทุกประเภท</option>
              <option>เบอร์เกอร์</option>
              <option>พาสต้า</option>
              <option>ของทานเล่น</option>
              <option>เครื่องดื่ม</option>
              <option>คอมโบเซ็ต</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Divider -->
      <section class="flex w-0">
        <div class="divider divider-horizontal h-screen mx-2"></div>
      </section>

      <!-- Product -->
      <section class="w-3/4">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-4 pl-4"
        >
          <!-- card1 -->
          <div
            v-for="(product, index) in filteredProducts"
            :key="product.id"
            class="card w-30 bg-white shadow-xl"
          >
            <img
              :src="product.imageUrl"
              alt="Product Image"
              class="w-full h-60 object-cover rounded-t-lg"
            />
            <div class="card-body text-center">
              <h2 class="text-lg font-bold text-[#316f3f]">
                {{ product.name }}
              </h2>
              <p class="text-[#316f3f] ">Price: ฿{{ product.price }}</p>
              <div class="flex justify-center mt-4">
                <button
                  @click="openAddons(index)"
                  class="btn bg-[#316f3f] text-white mr-2"
                >
                  ADD TO CART
                </button>


                <dialog ref="addons" class="modal">
                  <div class="modal-box max-w-6xl">
                    <div class="flex justify-start items-center">
                    <button @click="closeAddons(index)" class="btn btn-ghost mr-2 justify-start">
                    <div class="text-lg font-bold text-[#316f3f] ">< {{ product.name }}</div>
                    </button>
                    </div>
                    <div class="divider"></div>
                    <div class="grid grid-cols-2">
                      <div></div>
                    <h3 class="font-bold text-lg text-[#316f3f] text-left pl-4 mb-4">เลือกเพิ่มเติม</h3>
                  </div>
                    <div class="flex w-full">
                    <img
                      :src="product.imageUrl"
                      alt="Product Image"
                      class="w-1/2 h-1/4 object-contain p-5"
                    />
                    <div class="form-control ml-7">
                    <label class="grid grid-cols-5 w-full items-end gap-y-3">
                      <input @change="selectedAddon(49 ,'Coke' ,$event)" type="checkbox"  class="checkbox" />
                      <span class="col-span-4 text-left mt-3">Coke $49</span>

                      <input @change="selectedAddon(49 ,'Coke No sugar' ,$event)" type="checkbox"  class="checkbox" />
                      <span class="col-span-4 text-left mt-3">Coke No sugar $49</span>

                      <input @change="selectedAddon(49 ,'Egg Salad Sandwich' ,$event)" type="checkbox"  class="checkbox" />
                      <span class="col-span-4 text-left mt-3">Egg Salad Sandwich $49</span>
                      
                      <input @change="selectedAddon(79 ,'Frencgh Fries' ,$event)" type="checkbox"  class="checkbox" />
                      <span class="col-span-4 text-left mt-3">French Fries $79</span>

                      <input @change="selectedAddon(99 ,'Cranberry Chicken Salad' ,$event)" type="checkbox"  class="checkbox" />
                      <span class="col-span-4 text-left mt-3">Cranberry Chicken Salad $99</span>

                      <input @change="selectedAddon(109 ,'Garlic-Chive Baked Fries' ,$event)" type="checkbox"  class="checkbox" />
                      <span class="col-span-4 text-left mt-3">Garlic-Chive Baked Fries $109</span>
                    </label>
                  </div>
                  </div>
                    <div class="flex justify-center mt-5"></div>
                    <button @click="addToCart(index ,product)" class="btn bg-[#316f3f] text-white mr-2">
                      ADD TO CART
                    </button>
                  </div>
                </dialog>

                <button
                  class="btn bg-transparent border border-[#316f3f] text-[#316f3f]"
                  @click="toggleFavorite(index)"
                >
                  <i
                    :class="favorites[index] ? 'fas fa-heart' : 'far fa-heart'"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </navbar>
</template>

<style scoped>
.divider:before {
  background-color: #a7bfad !important;
}
.divider:after {
  background-color: #a7bfad !important;
}

.range-xs {
  --range-shdw: #316f3f;
}
</style>
