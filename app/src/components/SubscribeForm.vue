<template>
    <div class="subscibe-component">
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="showDialog">
            S'abonner aux notifications
        </a>
        <dialog class="mdl-dialog" :id="dataCard.idModal">
            <h4 class="mdl-dialog__title">Notifications <br> {{ dataCard.name }}</h4>
            <div class="mdl-dialog__content">
                <p>
                    <div class="mdl-grid center-items">
                        Email : <input v-model="subscribeForm.email" placeholder="adresse e-mail">
                    </div>
                    <div class="mdl-grid center-items">
                        Seuil : <input v-model="subscribeForm.warninglevel" placeholder="seuil d'alerte">
                    </div>                
                </p>
            </div>
            <div class="mdl-dialog__actions">
                <button type="button" class="mdl-button" v-on:click="subscribe">Agree</button>
                <button type="button" class="mdl-button close" v-on:click="closeDialog">Disagree</button>
            </div>
        </dialog>
    </div>
</template>

<script>
import config from '../config.js';

export default {
        name: 'subscibe-component',
        data: function(){
            return {
                subscribeForm: {
                    email: null,
                    warninglevel: null
                },
                dialog: null
            }
        },
        props: ['dataCard'],
        mounted: function(){
			this.dialog = document.querySelector("#"+this.dataCard.idModal)
		},
        methods: {
            showDialog: function() {
				this.dialog.showModal()
			},
			closeDialog: function() {
				this.dialog.close()
			},
            subscribe: function() {
                this.$parent.subscribeToAlert(this.subscribeForm);
				this.dialog.close()
            }
        }
}
</script>