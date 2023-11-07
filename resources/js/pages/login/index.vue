<template>
    <div>
        <form>
            <div class="form-group">
                <label>UserName</label>
                <input type="text" class="form-control" v-model="form.name">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="form.password">
            </div>
            <div class="form-group">
                <input type="button" class="btn btn-info" value="Login" @click="login">
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import store from '../../store';
    export default {
        data() {
            return {
                form:{
                    name : null,
                    password : null,
                }
            };
        },
        computed: {
            ...mapGetters({
                // products: 'getProducts',
            }),
        },
        created() {
            // store.dispatch('fetchProducts');
        },
        methods:{
            login(){
                axios.post('/do_login', this.form).then(function (response) {
                    console.log(response)
                }).catch(function (error) {
                    console.log(error)
                });
            },
        }
    }
</script>

<style scoped>

</style>
