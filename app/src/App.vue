<template>
  <div class="mdl-grid center-items" id="app">
    <div v-for="sensor in sensors">
      <plant-component v-bind:sensorid="sensor._id" v-if="sensor.type === 'plant'"></plant-component>
      <temperature-component v-bind:sensorid="sensor._id" v-if="sensor.type === 'temperature'"></temperature-component>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Temperature from './components/Temperature.vue';
import Plant from './components/Plant.vue';
import config from './config.js';


export default {
  name: 'app',
  data: function() {
    return {
      sensors: []
    }
  },
  mounted: function() {
      axios.get(config.url+'/api/sensors').then((response) => {
        this.sensors = response.data
      }, (response) => {
          // error callback
      });
  }
}
</script>