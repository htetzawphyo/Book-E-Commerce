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
                    <button class="btn btn-cgray btn-sm dropdown-toggle" data-bs-toggle="dropdown">
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