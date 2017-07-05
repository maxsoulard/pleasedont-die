<template>
    <div class="mdl-cell mdl-cell--3-col plant-component">
        <div class="demo-card-square mdl-card mdl-shadow--2dp">
            <div id="plantCardTitle" class="mdl-card__title mdl-card--expand">
                <h2 class="mdl-card__title-text">Plante</h2>
            </div>
            <div class="mdl-card__supporting-text" v-if="plantNode.moisture">
                <span>Terre : {{ plantNode.moisture }}</span><br><br>
                <span class="lastupdate">Dernière mise à jour des données : {{ plantNode.date }}</span>
            </div>
            <div class="mdl-card__supporting-text" v-else>
                <span>{{ error }}</span><br /><br /><br /><br />
            </div>
                <span v-else>{{ error }}</span>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="getValue">
                    Rafraîchir les données
                </a>
                <subscribe-component :dataCard="dataCard"></subscribe-component>
            </div>
        </div>
    </div>
</template>

<script>
import config from '../config.js';
import axios from 'axios';

export default {
    name: 'plant-component',
    props: ['sensorid'],
    data: function(){
        return {
            plantNode: {},
            error: '',
            displaySubscriptionForm: false,
            dataCard: {
                name: "plante",
                idModal: "plant_modal_id"
            }
        }
    },
    created: function() {
        this.getValue()
    },
    methods: {
        getValue: function() {
            axios.get(config.url+'/sensors/'+this.sensorid+'/data').then((response) => {
                this.plantNode = response.data
            }, (err) => {
                this.error = err.response.status + '-' + err.response.data;
            });
        },
        subscribeToAlert: function(subscribeForm) {
            const body = {
                mail: subscribeForm.email,
                warninglevel: subscribeForm.warninglevel,
                alertMsg: this.dataCard.alertMsg,
                keyValue: "moisture"
            }
            axios.post(config.url+'/sensors/'+this.sensorid+'/subscribers', body).then((response) => {
            // TODO
            }, (response) => {
                // error callback
            });
        }
    }
}
</script>