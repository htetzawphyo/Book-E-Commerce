<template>
  <div class="row">
        <div class="col-2">
            <h1 class="h4 py-3 text-primary d-inline">
                <i class="fa-solid fa-book-open-reader me-2"></i>
                <span class="d-none d-lg-inline">BOOK SHOP</span> 
            </h1>
        </div>
        <div class="col-10">
            <div class="d-inline d-flex float-end mr-3">
                <div class="dropdown">
                    <button class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="fa fa-user-circle me-1"></i>
                        Admin
                        <ul class="dropdown-menu">
                            <li class="p-0 m-0">
                                <router-link :to="{name: ''}" class="dropdown-item">
                                    User Profile
                                </router-link>
                            </li>
                            <li><hr class="dropdown-driver"></li>
                            <li class="p-0 m-0">
                                <router-link :to="{name: ''}" class="dropdown-item">
                                    Logout
                                </router-link>
                            </li>
                        </ul>
                    </button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>