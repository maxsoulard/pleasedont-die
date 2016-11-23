<template>
  <div id="app">
    <temperature-component></temperature-component>
    <plant-component></plant-component>
  </div>
</template>

<script>
import Temperature from './components/Temperature.vue';
import Plant from './components/Plant.vue';


export default {
  name: 'app',
  components: {
    Plant
  },
  data: function() {
    return {}
  }
}
</script>