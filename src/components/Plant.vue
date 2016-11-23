<template>
    <div class="mdl-cell mdl-cell--4-col plant-component">
        <div class="demo-card-square mdl-card mdl-shadow--2dp">
            <div id="plantCardTitle" class="mdl-card__title mdl-card--expand">
                <h2 class="mdl-card__title-text">Plante</h2>
            </div>
            <div class="mdl-card__supporting-text">
                <span v-if="plantNode.soil">Terre : TODO (raw)</span><br>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="getValue">
                    Rafraîchir les données
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import config from '../config.js';

export default {
        name: 'plant-component',
        data: function(){
            return {
                plantNode: {soil: '1'}
            }
        },
        created: function() {
            this.getValue();
        },
        methods: {
            getValue: function() {
                this.$http.get(config.url+'/plant').then((response) => {
                    this.plantNode = JSON.parse(response.body);
                }, (response) => {
                    // error callback
                });
            }
        }
}
</script>