import { ref, onMounted, computed } from "vue";
import { useAdminProductStore } from "@/stores/admin/product";
import { useCartStore } from "@/stores/cart";
import { useRoute } from "vue-router";
import axios from 'axios'; // Import axios for API calls

const route = useRoute();
const CartStore = useCartStore();
const productStore = useAdminProductStore();

const favorites = ref([]);

// ฟังก์ชันสำหรับบันทึกสินค้าลงในฐานข้อมูล
const saveFavoriteToDatabase = async (productId, isFavorite) => {
  try {
    await axios.post('https://ecommerce-backend-ig7w.onrender.com/favorites', {
      productId: productId,
      isFavorite: isFavorite,
    });
  } catch (error) {
    console.error("Failed to save favorite", error);
  }
};

// ฟังก์ชันสำหรับเปลี่ยนสถานะของหัวใจ
function toggleFavorite(index) {
  favorites.value[index] = !favorites.value[index];
  const product = productStore.products[index];
  saveFavoriteToDatabase(product.id, favorites.value[index]); // บันทึกสถานะไปที่ฐานข้อมูล
}

