<template>
    <div class="container-fluid">
		  <div class="row g-2">

			  <nav class="py-3">
				  <!-- Navbar -->
				  <DashboardNavBar></DashboardNavBar>				
			  </nav>
			  <!-- Sidebar Navigation -->
			  <nav class="col-2 mainBody">
				  <SideBar></SideBar>
			  </nav>
			  <!-- End Sidebar navigation -->
			  
			  <main class="col-10 mainBody">
				<div class="row mb-3">
					<div class="justify-content-between d-sm-flex flex-sm-column flex-md-row flex-lg-row d-grid gap-2">
						<!-- @submit.prevent="handleSearch" -->
						<form class="search" @submit.prevent="handleSearch">
							<div class="input-group ">
								<input type="text" class="form-control border-dark" v-model="searchData">							
								<button class="btn btn-dark" type="submit"><i class="fa-solid fa-magnifying-glass me-2"></i>Search</button>
							</div>
						</form>
						<div class="">
							<router-link :to="{name: 'addAuthor'}" class="btn btn-dark"><i class="fa-sharp fa-solid fa-user-plus me-2"></i>Add Author</router-link>
						</div>
					</div>
				</div>
				<table class="table table-bordered  w-100 table-dark table-hover" id="">
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th class="desc">Description</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(author, index) in getAuthors" :key="author.id">
							<td>{{ index + 1 }}</td>
							<td>{{ author.name }}</td>
							<td class="desc">{{  author.description.substring(0,50) + '...' }}</td>
							<td>
								<div class="d-sm-flex flex-sm-column flex-md-row flex-lg-row">
									<router-link :to="{name: ''}" class="text-decoration-none">
										<button class="button btn btn-warning btn-sm me-1 d-flex flex-row">
											<i class="fa-solid fa-pen-to-square me-2 edbutton"></i>
											<span>Edit</span>
										</button>
									</router-link>
									
									<button class="button btn btn-danger btn-sm d-flex flex-row">
										<i class="fa-solid fa-trash-can me-2 edbutton"></i>
										<span>Delete</span>
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			  </main>

		  </div>
    </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import DashboardNavBar from '../components/DashboardNavBar.vue'
import { useAuthorStore } from '../store/AuthorStore';
import { storeToRefs } from 'pinia';
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import debounce from '../composables/debounce';

export default {
	components: {
		SideBar, 
		DashboardNavBar 
	},
	setup(props) {
		const searchData = ref('');
		const authorStore = useAuthorStore();
		const { getAuthors } = storeToRefs(authorStore);

		watch(searchData, debounce(() => {
			authorStore.search(searchData.value);
		},800))
		
		function handleSearch() {
			authorStore.search(searchData.value);
		}

		authorStore.getAuthor();

		return { authorStore, getAuthors, searchData, handleSearch }
	},

}
</script>

<style scoped>
	.edbutton {
		margin-top: 0.2rem;
	}
	.text-edit{
		text-decoration: none;
	}
	@media (max-width : 768px) {
		.button {
			width: 100%;
			margin-bottom: 2px;
		}
		
	}
	@media (min-width: 768px) {
		.search {
			width: 50%;
		}
	}
	@media (max-width : 576px) {
		.desc {
			display: none;
		}
		.button {
			width: 85%;
		}
		.search {
			width: 100%;
		}
	}
</style>