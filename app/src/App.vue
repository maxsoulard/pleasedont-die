<template>
  <div class="mdl-grid center-items" id="app">
    <plant-component></plant-component>
    <temperature-component></temperature-component>
  </div>
</template>

<script>
import Temperature from './components/Temperature.vue';
import Plant from './components/Plant.vue';


export default {
  name: 'app',
  data: function() {
    return {}
  }
}
</script>