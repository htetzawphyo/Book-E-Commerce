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
                        <small class="h3 text-muted">CREATE FORM</small>
                        <div class="">
                            <router-link :to="{name: 'book'}" class="btn btn-dark"><i class="fa-solid fa-angles-left me-2"></i>Back</router-link>
                        </div>
                    </div>
                </div>                    

                <!-- CREATE FORM -->
                <form @submit.prevent="handleBook">                        
                    <div class="card-body">
                        <div class="mb-3">
                            <label>Name</label>
                            <input type="text" class="form-control border-dark" placeholder="Name" v-model="name">
                        </div>
                        <div class="mb-3">
                            <label>Description</label>
                            <textarea class="form-control border-dark" cols="30" rows="8" v-model="description"></textarea>
                        </div>
                        <div class="mb-3">
                            <label>Price</label>
                            <input type="number" class="form-control border-dark" placeholder="Price" v-model="price">
                        </div>
                        <div class="mb-3">
                            <label>Quantity</label>
                            <input type="number" class="form-control border-dark" placeholder="Quantity" v-model="quantity">
                        </div>
                        <div class="mb-3">
                            <label>Author</label>
                            <select class="form-select" name="author_id" @change="handleAutId($event)">
                                <option value="">Select Author</option>
                                <option v-for="author in getAuthors" :key="author.id" :value="author.id"> 
                                    {{ author.name }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label border-dark">Image</label>
                            <input class="form-control border-dark" type="file" v-on:change="handleFileUpload" ref="image" id="image">
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-dark bg-gray">
                            <i class="fa-solid fa-floppy-disk me-2"></i>
                            <span class="font-weight-bold">Save</span>
                        </button>
                    </div>
                </form>
			  </main>

		  </div>
  </div>
</template>

<script>
import SideBar from '../../components/SideBar.vue'
import DashboardNavBar from '../../components/DashboardNavBar.vue'
import { ref } from 'vue'
import { useAuthorStore } from '../../store/AuthorStore';
import { storeToRefs } from 'pinia';

export default {
    components: {
        SideBar,
        DashboardNavBar
    },
    setup() {
        const name = ref('');
        const price = ref('');
        const quantity = ref('');
        const description = ref('');
        const image = ref(null);
        const autId = ref(null);
        const authorStore = useAuthorStore();
		const { getAuthors } = storeToRefs(authorStore);
        authorStore.getAuthor();

        function handleAutId(event) {
            autId.value = event.target.value;
        }

        function handleBook() {
            console.log(autId.value)
        }

        return { name, price, quantity, description, image, getAuthors, authorStore, handleBook, handleAutId}
    }

}
</script>

<style>

</style>