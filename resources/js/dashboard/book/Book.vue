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
				<!-- Search and Add  Start -->
				<div class="row mb-3">
					<div class="justify-content-between d-sm-flex flex-sm-column flex-md-row flex-lg-row d-grid gap-2">
						<form class="search" @submit.prevent="handleSearch">
							<div class="input-group ">
								<input type="text" class="form-control border-dark" v-model="searchData">							
								<button class="btn btn-dark" type="submit"><i class="fa-solid fa-magnifying-glass me-2"></i>Search</button>
							</div>
						</form>
						<div class="">
							<router-link :to="{name: 'addBook'}" class="btn btn-dark">
								<i class="fa-sharp fa-solid fa-book-plus me-2"></i>Add Book
							</router-link>
						</div>
					</div>
				</div>
				<!-- Search and Add  End -->

				<!-- Table Start -->
				<div class="table-responsive-sm">
					<table class="table table-bordered  w-100 table-dark table-hover" id="">
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Author</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(book, index) in getData" :key="index">
								<td>{{ getIndex[index] }}</td>
								<td>{{ book.name }}</td>
								<td>{{ book.author_name }}</td>
								<td>{{ book.price }}</td>
								<td>{{ book.quantity }}</td>
								<td>
									<div class="d-sm-flex flex-sm-column flex-md-row flex-lg-row" v-if="book.id">
										<router-link :to="{name: 'editBook', params:{id: book.id}}" class="text-decoration-none">
											<button class="button btn btn-warning btn-sm me-1 d-flex flex-row">
												<i class="fa-solid fa-pen-to-square me-2 edbutton"></i>
												<span>Edit</span>
											</button>
										</router-link>
										
										<button class="button btn btn-danger btn-sm d-flex flex-row" @click="del(book.id, index)">
											<i class="fa-solid fa-trash-can me-2 edbutton"></i>
											<span>Delete</span>
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- Pagination buttons -->
				<div class="btn-group btn-sm" role="group" aria-label="Basic outlined example" v-if="getData">
					<button type="button" class="btn btn-outline-dark btn-sm d-none d-md-block" @click="bookStore.first(searchData)"
					:class="{'disabled' : getMeta.current_page == 1}"
					>
						<i class="fa-sharp fa-solid fa-backward"></i> <small>FIRST</small> 
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="bookStore.prev(searchData)"
					:class="{'disabled' : getMeta.current_page == 1}"
					>
						<i class="fa-sharp fa-solid fa-backward"></i> <small>PREV</small> 
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm"  :class="{'active' : num1 == getMeta.current_page}"
					@click="bookStore.getBook(searchData, num1)">
						{{ num1 }}
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="bookStore.getBook(searchData, num2)"
					:class="{'active' : num2 == getMeta.current_page, 'd-none' : getMeta.last_page == 1}">
						{{ num2 }}
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" disabled>
						...
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="bookStore.getBook(searchData, num3)"
					:class="{'active' : num3 == getMeta.current_page, 'd-none' : getMeta.last_page < 3}">
						{{ num3 }}
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm" @click="bookStore.next(searchData)"
					:class="{'disabled' : getMeta.current_page == getMeta.last_page}"
					>
						<small>NEXT</small> <i class="fa-sharp fa-solid fa-forward"></i> 
					</button>
					<button type="button" class="btn btn-outline-dark btn-sm d-none d-md-block" @click="bookStore.last(searchData)"
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
import { ref } from '@vue/reactivity'
import { computed, inject, watch } from 'vue';
import { useBookStore } from '../../store/BookStore';
import { storeToRefs } from 'pinia';
import debounce from '../../composables/debounce';

export default {
	components: {
	SideBar, 
	DashboardNavBar 
	},
	setup() {
		const bookStore = useBookStore();
		const { getData, getIndex, getMeta } = storeToRefs(bookStore);
        bookStore.getBook();
		const searchData = ref('');
		
		watch(searchData, debounce(() => {
			bookStore.getBook(searchData.value);
		},800))
 
		function handleSearch() {
			bookStore.getBook(searchData.value);
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

		const swal = inject('$swal');
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
					bookStore.deleteBook(id, index);
				}
			})
		}

		return { handleSearch, del, num1, num2, num3, getIndex, bookStore, searchData, getData, getMeta }
	}

}
</script>

<style>
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