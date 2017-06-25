import Vue from 'vue';
import App from './App.vue';
import Temperature from './components/Temperature.vue';
import Plant from './components/Plant.vue';
import SubscribeForm from './components/SubscribeForm.vue';

// Register components
Vue.component('temperature-component', Temperature)
Vue.component('plant-component', Plant)
Vue.component('subscribe-component', SubscribeForm)

// Instantiate app
new Vue({
  el: '#app',
  render: h => h(App)
});