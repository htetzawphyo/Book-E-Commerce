<template>
  <div class="row py-2 bg-sky shadow-sm rounded">
        <div class="col-3">
            <h1 class="h4 py-3 text-dark d-inline">
                <i class="fa-solid fa-book-open-reader me-2"></i>
                <span class="d-none d-lg-inline">BOOK SHOP</span> 
            </h1>
        </div>
        <div class="col-9">
            <div class="d-inline d-flex float-end mr-3">
                <div class="dropdown">
                    <button class="btn btn-cgray btn-sm dropdown-toggle" data-bs-toggle="dropdown" v-if="getProfileData">
                        <i class="fa fa-user-circle me-1"></i>
                        {{ getProfileData.name }}
                        <ul class="dropdown-menu dropdown-menu-dark bg-dark">
                            <!-- <li class="p-0 m-0 btn-sm">
                                <router-link :to="{name: ''}" class="dropdown-item btn-sm dropdown-item-sm">
                                    <i class="fa-solid fa-user-pen me-1"></i> User Profile 
                                </router-link>
                            </li>
                            <li><hr class="dropdown-driver"></li> -->
                            <li class="p-0 m-0 btn-sm">
                                <div class="dropdown-item btn-sm dropdown-item-sm" @click="authStore.logout">
                                    <i class="fa-solid fa-right-from-bracket me-1"></i> Logout
                                </div>
                            </li>
                        </ul>
                    </button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/AuthStore'

export default {
    setup() {
        const authStore = useAuthStore();
        const { getProfileData } = storeToRefs(authStore);
        authStore.getProfile();

        return { authStore, getProfileData }
    }
}
</script>

<style scoped>
.dropdown-menu {
    min-width: 100px !important;
}

/* .dropdown-item {
    padding: 0px 8px !important;
    font-size: 14px !important;
} */
</style>