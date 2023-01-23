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
                            <input type="text" class="form-control" placeholder="Name" v-model="name"
                            :class="{'is-invalid': getErrMsg.name, 'border-danger': getErrMsg.name, 'border-dark': !getErrMsg.name}"
                            >
                            <span v-if="getErrMsg.name" class="text-danger fst-italic">{{ getErrMsg.name[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Description</label>
                            <textarea class="form-control border-dark" cols="30" rows="8" v-model="description"></textarea>
                        </div>
                        <div class="mb-3">
                            <label>Price</label>
                            <input type="number" class="form-control" placeholder="Price" v-model="price"
                            :class="{'is-invalid': getErrMsg.price, 'border-danger': getErrMsg.price, 'border-dark': !getErrMsg.price}"
                            >
                            <span v-if="getErrMsg.price" class="text-danger fst-italic">{{ getErrMsg.price[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Quantity</label>
                            <input type="number" class="form-control" placeholder="Quantity" v-model="quantity"
                            :class="{'is-invalid': getErrMsg.quantity, 'border-danger': getErrMsg.quantity, 'border-dark': !getErrMsg.quantity}"
                            >
                            <span v-if="getErrMsg.quantity" class="text-danger fst-italic">{{ getErrMsg.quantity[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Author</label>
                            <select class="form-select" name="author_id" @change="handleAutId($event)"
                            :class="{'is-invalid': getErrMsg.author_id, 'border-danger': getErrMsg.author_id, 'border-dark': !getErrMsg.author_id}"
                            >
                                <option value="" disabled selected>Select Author</option>
                                <option v-for="author in getAuthors" :key="author.id" :value="author.id"> 
                                    {{ author.name }}
                                </option>
                            </select>
                            <span v-if="getErrMsg.quantity" class="text-danger fst-italic">{{ getErrMsg.quantity[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label">Image</label>
                            <input class="form-control" type="file" v-on:change="handleFileUpload" ref="image" id="image"
                            :class="{'is-invalid': getErrMsg.image, 'border-danger': getErrMsg.image, 'border-dark': !getErrMsg.image}"
                            >
                            <span v-if="getErrMsg.image" class="text-danger fst-italic">{{ getErrMsg.image[0] }}</span>
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
import { useBookStore } from '../../store/BookStore';

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

        const bookStore = useBookStore();
        const { getErrMsg } = storeToRefs(bookStore);
        const authorStore = useAuthorStore();
		const { getAuthors } = storeToRefs(authorStore);
        authorStore.getAuthor();

        function handleAutId(event) {
            autId.value = event.target.value;
        }

        function handleFileUpload(event) {
            image.value = event.target.files[0];
        }

        function handleBook() {
            let book = {
                name: name.value,
                price: price.value,
                quantity: quantity.value,
                description: description.value,
                image: image.value,
                author_id: autId.value
            }
            bookStore.addBook(book);
        }

        return { name, price, quantity, description, image, getAuthors, authorStore, getErrMsg, handleBook, handleAutId, handleFileUpload }
    }

}
</script>

<style>

</style>