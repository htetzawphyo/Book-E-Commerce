<template>
    <div class="container-fluid">
            <div class="row g-2">
  
                <nav class="sticky-top">
                    <!-- Navbar -->
                    <DashboardNavBar></DashboardNavBar>				
                </nav>
                <!-- Sidebar Navigation -->
                <nav class="col-2 mainBody">
                    <SideBar></SideBar>
                </nav>
                <!-- End Sidebar navigation -->
  
                <main class="col-10 mainBody mb-3">
                    <div class="row mb-3">
					<!-- <div class="justify-content-between d-sm-flex flex-sm-column flex-md-row flex-lg-row d-grid gap-2"> -->
						<!-- @submit.prevent="handleSearch" -->
						<form class="search" @submit.prevent="handleSearch">
							<div class="input-group ">
								<input type="text" class="form-control border-dark" v-model="searchData">							
								<button class="btn btn-dark" type="submit"><i class="fa-solid fa-magnifying-glass me-2"></i>Search</button>
							</div>
						</form>
					<!-- </div> -->
				</div>
				<div class="table-responsive-sm">			
					<table class="table table-bordered  w-100 table-dark table-hover" id="">
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Email</th>
								<th>Role</th>
								<th>Total Order</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(user, index) in getData" :key="index">
								<td>{{ getIndex[index] }}</td>
								<td>{{ user.name }}</td>
								<td>{{ user.email }}</td>
								<td>{{ user.role }}</td>
								<td>
									
								</td>
							</tr>
						</tbody>
						
					</table>
				</div>
				<!-- Pagination buttons -->
				<div class="btn-group btn-sm" role="group" aria-label="Basic outlined example" v-if="getData">
					<button type="button" class="btn btn-outline-dark btn-sm d-none d-md-block" @click="authStore.first(searchData)"
					:class="{'disabled' : getMeta.current_page == 1}"
					>
						<i class="fa-sharp fa-solid fa-backward"></i> <small>FIRST</small> 
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="authStore.prev(searchData)"
					:class="{'disabled' : getMeta.current_page == 1}"
					>
						<i class="fa-sharp fa-solid fa-backward"></i> <small>PREV</small> 
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm"  :class="{'active' : num1 == getMeta.current_page}"
					@click="authStore.getBook(searchData, num1)">
						{{ num1 }}
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="authStore.getBook(searchData, num2)"
					:class="{'active' : num2 == getMeta.current_page, 'd-none' : getMeta.last_page == 1}">
						{{ num2 }}
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" disabled>
						...
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="authStore.getBook(searchData, num3)"
					:class="{'active' : num3 == getMeta.current_page, 'd-none' : getMeta.last_page < 3}">
						{{ num3 }}						
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="authStore.next(searchData)"
					:class="{'disabled' : getMeta.current_page == getMeta.last_page}"
					>
						<small>NEXT</small> <i class="fa-sharp fa-solid fa-forward"></i> 
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm d-none d-md-block" @click="authStore.last(searchData)"
					:class="{'disabled' : getMeta.current_page == getMeta.last_page}"
					>
						<small>LAST</small> <i class="fa-sharp fa-solid fa-forward"></i> 
					</button>
				</div>
                </main>
  
            </div>
    </div>
  </template>
  
  <script>
  import SideBar from '../../components/SideBar.vue'
  import DashboardNavBar from '../../components/DashboardNavBar.vue'
  import { ref, computed } from 'vue'
  import { useAuthStore } from '../../store/AuthStore'
  import { storeToRefs } from 'pinia'
  import debounce from '../../composables/debounce';
  import { watch } from '@vue/runtime-core'

  export default {
  components: {
    SideBar, 
    DashboardNavBar 
    },
  setup(){
    const searchData = ref('');
	const authStore = useAuthStore();
	const { getData, getMeta, getIndex } = storeToRefs(authStore);
	authStore.getUsers();
   
	watch(searchData, debounce(() => {
		authStore.getUsers(searchData.value);
	},800))

    function handleSearch() {
		authStore.getUsers(searchData.value)
    }

	let num1 = computed( () => {
			if(getMeta.value.current_page > 1 && getMeta.value.current_page < getMeta.value.last_page){
				return getMeta.value.current_page - 1;
			}
			if(getMeta.value.current_page == getMeta.value.last_page && getMeta.value.current_page > 1 && (getMeta.value.last_page - 2) != 0){
				return getMeta.value.last_page - 2;
			}
			return 1;
		})

	let num2 = computed( () => {
		if(getMeta.value.current_page < 3){
			return 2;
		}
		if(getMeta.value.current_page == getMeta.value.last_page){
			return getMeta.value.last_page - 1;
		} 
		return getMeta.value.current_page;
	})

	let num3 = computed( () => {
		return getMeta.value.last_page;
	})

    return { handleSearch, searchData, getData, getMeta, getIndex, authStore, num1, num2, num3 }
  }
  }
  </script>
  
  <style>
  
  </style>