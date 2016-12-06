<template>
    <div class="mdl-cell mdl-cell--4-col plant-component">
        <div class="demo-card-square mdl-card mdl-shadow--2dp">
            <div id="plantCardTitle" class="mdl-card__title mdl-card--expand">
                <h2 class="mdl-card__title-text">Plante</h2>
            </div>
            <div class="mdl-card__supporting-text">
                <span v-if="plantNode.moisture">Terre : {{ plantNode.moisture }}</span><br><br>
                <span class="lastupdate">Dernière mise à jour des données : {{ plantNode.date }}</span>
            </div>
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

export default {
        name: 'plant-component',
        data: function(){
            return {
                plantNode: {},
                displaySubscriptionForm: false,
                dataCard: {
                    name: "plante",
                    idModal: "plant_modal_id",
                    alertMsg: "TERRE TROP SECHE. ARROSEZ LA PLANTE. Merci !"
                }
            }
        },
        created: function() {
            this.getValue()
        },
        methods: {
            getValue: function() {
                this.$http.get(config.url+'/sensors/001403058F21').then((response) => {
                    this.plantNode = response.body
                }, (response) => {
                    // error callback
                });
            },
            subscribeToAlert: function(subscribeForm) {
                var body = {
                    email: subscribeForm.email,
                    warninglevel: subscribeForm.warninglevel,
                    alertMsg: this.dataCard.alertMsg,
                    keyValue: "moisture"
                }
                this.$http.post(config.url+'/sensors/001403058F21/notifications', body).then((response) => {
                // TODO
                }, (response) => {
                    // error callback
                });
            }
        }
}
</script>