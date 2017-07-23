<template>
    <div class="mdl-cell mdl-cell--3-col temperature-component">
        <div class="demo-card-square mdl-card mdl-shadow--2dp">
            <div id="temperatureCardTitle" class="mdl-card__title mdl-card--expand">
                <h2 class="mdl-card__title-text">Température</h2>
            </div>
            <div class="mdl-card__supporting-text" v-if="temperatureNode">
                <span v-if="temperatureNode.temp">Température : {{ temperatureNode.temp }} °C</span><br>
                <span v-if="temperatureNode.hum">Humidité : {{ temperatureNode.hum }} %</span><br><br>
                <span class="lastupdate">Dernière mise à jour des données : {{ temperatureNode.date }}</span>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="getValue">
                    Rafraîchir les données
                </a>
                <subscribe-component :data-card="dataCard" v-on:subscribe="subscribeToAlert"></subscribe-component>                
            </div>
        </div>
    </div>
</template>

<script>
import config from '../config.js';
import axios from 'axios';

export default {
    name: 'temperature-component',
    props: ['sensorid'],
    data: function(){
        return {
            temperatureNode: {},
            displaySubscriptionForm: false,
            dataCard: {
                name: "temperature",
                idModal: "temperature_modal_id"
            }
        }
    },
    created: function() {
        this.getValue()
    },
    methods: {
        getValue: function() {
            axios.get(config.url+'/api/sensors/'+this.sensorid+'/data').then((response) => {
                this.temperatureNode = response.data;
            }, (response) => {
                // error callback
            });
        },
        subscribeToAlert: function(subscribeForm) {
            const body = {
                mail: subscribeForm.email,
                warninglevel: subscribeForm.warninglevel,
                alertMsg: this.dataCard.alertMsg,
                keyValue: "temp"
            }
            axios.post(config.url+'/api/sensors/'+this.sensorid+'/subscribers', body).then((response) => {
                // TODO
            }, (response) => {
                // error callback
            });
        }
    }
}
</script>