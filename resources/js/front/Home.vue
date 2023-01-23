<template>
  <button class="btn btn-outline-dark" @click="authStore.logout">logout</button>
  <h1>Front end , user page</h1>
</template>

<script>
import { useAuthStore } from '../store/AuthStore'

export default {
    setup() {
        const authStore = useAuthStore();

        return { authStore }
    }
}
</script>

<style>

</style>