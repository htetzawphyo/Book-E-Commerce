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
					<div class="justify-content-between d-sm-flex flex-sm-column flex-md-row flex-lg-row d-grid gap-2">
						<!-- @submit.prevent="handleSearch" -->
						<form class="search" @submit.prevent="handleSearch">
							<div class="input-group ">
								<input type="text" class="form-control border-dark" v-model="searchData">							
								<button class="btn btn-dark" type="submit"><i class="fa-solid fa-magnifying-glass me-2"></i>Search</button>
							</div>
						</form>
						<div class="">
							<router-link :to="{name: 'addAuthor'}" class="btn btn-dark">
								<i class="fa-sharp fa-solid fa-user-plus me-2"></i>Add Author
							</router-link>
						</div>
					</div>
				</div>
				<div class="table-responsive-sm">			
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
							<tr v-for="(author, index) in getAuthors" :key="index">
								<td>{{ totalItem[index] }}</td>
								<td>{{ author.name }}</td>
								<td class="desc">{{  author.description ? author.description.substring(0,50) + '...' : '' }}</td>
								<td>
									<div class="d-sm-flex flex-sm-column flex-md-row flex-lg-row" v-if="author.id">
										<router-link :to="{name: 'editAuthor', params:{id: author.id}}" class="text-decoration-none">
											<button class="button btn btn-warning btn-sm me-1 d-flex flex-row">
												<i class="fa-solid fa-pen-to-square me-2 edbutton"></i>
												<span>Edit</span>
											</button>
										</router-link>
										
										<button class="button btn btn-danger btn-sm d-flex flex-row" @click="del(author.id, index)">
											<i class="fa-solid fa-trash-can me-2 edbutton"></i>
											<span>Delete</span>
										</button>
									</div>
								</td>
							</tr>
						</tbody>
						
					</table>
				</div>
				<div class="btn-group" role="group" aria-label="Basic outlined example" v-if="getAuthors">
					<button type="button" class="btn btn-outline-dark btn-sm d-none d-md-block" @click="authorStore.first(searchData)"
					:class="{'disabled' : metaData.current_page == 1}"
					>
						<i class="fa-sharp fa-solid fa-backward"></i> <small>FIRST</small> 
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="authorStore.prev(searchData)"
					:class="{'disabled' : metaData.current_page == 1}"
					>
						<i class="fa-sharp fa-solid fa-backward"></i> <small>PREV</small> 
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" :class="{'active' : num1 == metaData.current_page}"
					@click="authorStore.getAuthor(searchData, num1)">
						{{ num1 }}
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="authorStore.getAuthor(searchData, num2)"
					:class="{'active' : num2 == metaData.current_page, 'd-none' : metaData.last_page == 1}">
						{{ num2 }}
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" disabled>
						...
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="authorStore.getAuthor(searchData, num3)"
					:class="{'active' : num3 == metaData.current_page, 'd-none' : metaData.last_page < 3}">
						{{ num3 }}
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="authorStore.next(searchData)"
					:class="{'disabled': metaData.current_page == metaData.last_page}"
					>
						<small>NEXT</small> <i class="fa-sharp fa-solid fa-forward"></i> 
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm d-none d-md-block" @click="authorStore.last(searchData)"
					:class="{'disabled': metaData.current_page == metaData.last_page}"
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
import { useAuthorStore } from '../../store/AuthorStore';
import { storeToRefs } from 'pinia';
import { ref, inject } from 'vue';
import { computed, watch } from '@vue/runtime-core';
import debounce from '../../composables/debounce';

export default {
	components: {
		SideBar, 
		DashboardNavBar,
	},
	setup(props) {
		const searchData = ref('');

		const authorStore = useAuthorStore();
		const { getAuthors, totalItem, metaData } = storeToRefs(authorStore);
		authorStore.getAuthor();
		
		watch(searchData, debounce(() => {
			authorStore.getAuthor(searchData.value);
		},800))
		
		function handleSearch() {
			authorStore.getAuthor(searchData.value);
		}

		let num1 = computed( () => {
			if(metaData.value.current_page > 1 && metaData.value.current_page < metaData.value.last_page){
				return metaData.value.current_page - 1;
			}
			if(metaData.value.current_page == metaData.value.last_page && metaData.value.current_page > 1 && (metaData.value.last_page - 2) != 0){
				return metaData.value.last_page - 2;
			}
			return 1;
		})

		let num2 = computed( () => {
			if(metaData.value.current_page < 3){
				return 2;
			}
			if(metaData.value.current_page == metaData.value.last_page){
				return metaData.value.last_page - 1;
			} 
			return metaData.value.current_page;
			
		})

		let num3 = computed( () => {
			return metaData.value.last_page;
		})
		
		const swal = inject('$swal')
		
		function del(id, index) {
			swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if(result.value){
					authorStore.deleteAuthor(id, index)
				}
			})
		}

		return { authorStore, getAuthors, searchData, handleSearch, totalItem, metaData, num1, num2, num3, del }
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
			width: 100%;
		}
		.search {
			width: 100%;
		}
	}
</style>