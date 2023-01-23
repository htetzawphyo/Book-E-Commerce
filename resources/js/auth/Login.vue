<template>
    <div class="container my-3">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <div class="card">
                <div class="card-header bg-dark text-light">
                    <h3>Login Form</h3>
                </div>
                <div class="card-body bg-secondary">
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <label class="form-label text-light fw-bold ">Email address</label>
                            <input type="email" class="form-control bg-light" v-model="email" placeholder="email"
                            :class="{'is-invalid': getErrMsg.email}">
                            <span class="text-warning fst-italic" v-if="getErrMsg.email">{{ getErrMsg.email[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-light fw-bold">Password</label>
                            <input type="password" class="form-control bg-light" v-model="password" placeholder="password"
                            :class="{'is-invalid': getErrMsg.password}">
                            <span class="text-warning fst-italic" v-if="getErrMsg.password">{{ getErrMsg.password[0] }}</span>
                        </div>
                        <button type="submit" class="btn btn-outline-dark fw-bold">Login</button>
                    </form>
                </div>
            </div>
            </div>
            <div class="col-md-2"></div>
            
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useAuthStore } from '../store/AuthStore';
import { storeToRefs } from 'pinia';

export default {
    setup(){
        let email = ref(null);
        let password = ref(null);

        const authStore = useAuthStore();
        const { getErrMsg } = storeToRefs(authStore);

        let login = () => {
            const formData = {
                email: email.value,
                password: password.value
            }
            authStore.login(formData)
        }
        


        return { email, password, getErrMsg, login }
    }
}
</script>

<style>

</style>