import Vue from 'vue';
import App from './App.vue';
import Temperature from './components/Temperature.vue'
import Plant from './components/Plant.vue'

var VueResource = require('vue-resource');
Vue.use(VueResource);

// Register components
Vue.component('temperature-component', Temperature);
Vue.component('plant-component', Plant);

// Instantiate app
new Vue({
  el: '#app',
  render: h => h(App)
});