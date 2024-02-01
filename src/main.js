import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './assets/styles/style.scss';
import VueTheMask from "vue-the-mask";

const app = createApp(App);

app.use(store);
app.use(VueTheMask)

app.mount('#app');
