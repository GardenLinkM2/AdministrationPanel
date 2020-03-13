<script>
    import VueJsonPretty from 'vue-json-pretty'

    export default {
        components: {
            VueJsonPretty
        },

        data() {
            return {
                show: false,
                loading: false,
                obj: {}
            }
        },

        methods: {

            display(obj) {
                this.show = true;
                this.loading = false;
                this.obj = obj;
            },

        },

    }
</script>


<template>
    <b-modal id="bv-modal-example" hide-footer v-model="show">
        <template v-slot:modal-title>Détail du jardin</template>
        <div class="d-block">
            <vue-json-pretty :data="obj"/>
        </div>
    </b-modal>
</template>