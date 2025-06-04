import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faEnvelope, faLock , faEye, faEyeSlash, faHeart, faArrowRightFromBracket, faReceipt, faCartShopping, faTrash, faCheckCircle, faSpinner, faCircle} from '@fortawesome/free-solid-svg-icons';
library.add(faUser , faEnvelope , faLock , faEye, faEyeSlash, faHeart, faArrowRightFromBracket, faReceipt, faCartShopping, faTrash, faCheckCircle, faSpinner, faCircle);

const app = createApp(App)
app.use(VueSweetalert2);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app')

