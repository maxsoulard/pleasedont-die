<template>
    <div class="mdl-cell mdl-cell--4-col temperature-component">
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

export default {
    name: 'temperature-component',
    data: function(){
        return {
            temperatureNode: {},
            displaySubscriptionForm: false,
            dataCard: {
                name: "temperature",
                alertMsg: "ALERTE INDICATIVE TEMPERATURE",
                idModal: "temperature_modal_id"
            }
        }
    },
    created: function() {
        this.getValue()
    },
    methods: {
        getValue: function() {
            this.$http.get(config.url+'/sensors/98D331706851').then((response) => {
                this.temperatureNode = response.body;
            }, (response) => {
                // error callback
            });
        },
        subscribeToAlert: function(subscribeForm) {
            var body = {
                email: subscribeForm.email,
                warninglevel: subscribeForm.warninglevel,
                alertMsg: this.dataCard.alertMsg,
                keyValue: "temp"
            }
            this.$http.post(config.url+'/sensors/98D331706851/notifications', body).then((response) => {
                // TODO
            }, (response) => {
                // error callback
            });
        }
    }
}
</script>