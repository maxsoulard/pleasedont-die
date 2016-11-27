<template>
    <div class="mdl-cell mdl-cell--4-col temperature-component">
        <div class="demo-card-square mdl-card mdl-shadow--2dp">
            <div id="temperatureCardTitle" class="mdl-card__title mdl-card--expand">
                <h2 class="mdl-card__title-text">Température</h2>
            </div>
            <div class="mdl-card__supporting-text">
                <span v-if="temperatureNode.temp">Température : {{ temperatureNode.temp }} °C</span><br>
                <span v-if="temperatureNode.hum">Humidité : {{ temperatureNode.hum }} %</span><br><br>
                <span class="lastupdate">Dernière mise à jour des données : {{ temperatureNode.date }} %</span>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="getValue">
                    Rafraîchir les données
                </a>
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="subscribeToNotifications">
                    S'abonner aux notifications
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import config from '../config.js';

export default {
        name: 'temperature-component',
        data: function(){
            return {
                temperatureNode: {temp: '1', hum: '1'}
            }
        },
        created: function() {
            this.getValue();
        },
        methods: {
            getValue: function() {
                this.$http.get(config.url+'/temperature').then((response) => {
                    this.temperatureNode = response.body;
                }, (response) => {
                    // error callback
                });
            },
            subscribeToNotifications: function() {
                // TODO
            }
        }
}
</script>