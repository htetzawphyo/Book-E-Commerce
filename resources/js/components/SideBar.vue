<template>
    <div class="list-group text-center text-lg-start ">
        <span class="list-group-item disabled d-none d-lg-block">
            <small>CONTROLS</small>
        </span> 
        <router-link :to="{name: 'admin'}" class="list-group-item list-group-item-action">
            <i class="fa-solid fa-list me-2"></i>
            <span class="d-none d-lg-inline">Dashboard</span>
        </router-link>
        <router-link :to="{name: 'author'}" class="list-group-item list-group-item-action action">
            <i class="fa-sharp fa-solid fa-users me-2"></i>
            <span class="d-none d-lg-inline">Authors</span>
        </router-link>
        <router-link :to="{name: 'book'}" class="list-group-item list-group-item-action action">
            <i class="fa-solid fa-book me-2"></i>
            <span class="d-none d-lg-inline">Books</span>
        </router-link>
        <router-link :to="{name: 'user'}" class="list-group-item list-group-item-action action">
            <i class="fa-solid fa-users me-2"></i>
            <span class="d-none d-lg-inline">Users</span>
        </router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .router-link-active {
        border-left: 3px solid red;
        background-color: #424040;
    }

    .position {
        position: fixed;
    }
</style>