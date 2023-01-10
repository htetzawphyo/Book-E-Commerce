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

			  <main class="col-10 mainBody">
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
				<table class="table table-bordered  w-100 table-dark table-hover" id="">
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th class="desc">Description</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(book, index) in getData" :key="index">
							<td>{{ index + 1 }}</td>
							<td>{{ book.name }}</td>
							<td class="desc">{{  book.description ? book.description.substring(0,50) + '...' : '' }}</td>
							<td>{{ book.price }}</td>
							<td>{{ book.quantity }}</td>
							<td>
								<div class="d-sm-flex flex-sm-column flex-md-row flex-lg-row" v-if="book.id">
									<router-link :to="{name: 'editAuthor', params:{id: book.id}}" class="text-decoration-none">
										<button class="button btn btn-warning btn-sm me-1 d-flex flex-row">
											<i class="fa-solid fa-pen-to-square me-2 edbutton"></i>
											<span>Edit</span>
										</button>
									</router-link>
									
									<button class="button btn btn-danger btn-sm d-flex flex-row" @click="bookStore.deleteBook(book.id, index)">
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
import SideBar from '../../components/SideBar.vue'
import DashboardNavBar from '../../components/DashboardNavBar.vue'
import { ref } from '@vue/reactivity'
import { useBookStore } from '../../store/BookStore';
import { storeToRefs } from 'pinia';

export default {
	components: {
	SideBar, 
	DashboardNavBar 
	},
	setup() {
		const bookStore = useBookStore();
		const { getData } = storeToRefs(bookStore);
        bookStore.getBook();
		const searchData = ref('');

		function handleSearch() {

		}

		return { handleSearch, searchData, getData }
	}

}
</script>

<style>

</style>