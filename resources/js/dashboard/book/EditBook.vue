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
                        <small class="h3 text-muted">Edit FORM</small>
                        <div class="">
                            <router-link :to="{name: 'book'}" class="btn btn-dark"><i class="fa-solid fa-angles-left me-2"></i>Back</router-link>
                        </div>
                    </div>
                </div>                    

                <!-- CREATE FORM -->
                <form @submit.prevent="handleBook">
                    <div class="card-body" v-if="getData">
                        <div class="mb-3">
                            <label>Name</label>
                            <input type="text" class="form-control border-dark" placeholder="Name" v-model="getData.name"
                            :class="{'is-invalid': getErrMsg.name, 'border-danger': getErrMsg.name, 'border-dark': !getErrMsg.name}"
                            >
                            <span v-if="getErrMsg.name" class="text-danger fst-italic">{{ getErrMsg.name[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Description</label>
                            <textarea class="form-control border-dark" cols="30" rows="8" v-model="getData.description"></textarea>
                        </div>
                        <div class="mb-3">
                            <label>Price</label>
                            <input type="number" class="form-control border-dark" placeholder="Price" v-model="getData.price"
                            :class="{'is-invalid': getErrMsg.price, 'border-danger': getErrMsg.price, 'border-dark': !getErrMsg.price}"
                            >
                            <span v-if="getErrMsg.price" class="text-danger fst-italic">{{ getErrMsg.price[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Quantity</label>
                            <input type="number" class="form-control border-dark" placeholder="Quantity" v-model="getData.quantity"
                            :class="{'is-invalid': getErrMsg.quantity, 'border-danger': getErrMsg.quantity, 'border-dark': !getErrMsg.quantity}"
                            >
                            <span v-if="getErrMsg.quantity" class="text-danger fst-italic">{{ getErrMsg.quantity[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Author</label>
                            <select class="form-select" name="author_id" @change="handleAutId">
                                <option v-for="author in getAuthors" :key="author.id" :value="author.id" :selected="author.name == getData.author_name">
                                    {{ author.name }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <img :src="getData.image" alt="" class="img-thumbnail my-2" style="width:200px">
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label border-dark">Image</label>
                            <input class="form-control border-dark" type="file" @change="handleFileUpload" ref="image" id="image">
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
import { storeToRefs } from 'pinia';
import DashboardNavBar from '../../components/DashboardNavBar.vue';
import SideBar from '../../components/SideBar.vue';
import { useBookStore } from '../../store/BookStore';
import { useAuthorStore } from '../../store/AuthorStore';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

export default {
    components: {
        DashboardNavBar,
        SideBar
    },
    props: ['id'],
    setup(props) {
        const bookStore = useBookStore();
        bookStore.editBook(props.id);
        const { getData, getErrMsg } = storeToRefs(bookStore);
        const authorStore = useAuthorStore();
        authorStore.getAuthor();
		const { getAuthors } = storeToRefs(authorStore);

        const autId = ref(null);
        const image = ref(null);

        let router = useRouter();

        function handleAutId(e) {
            autId.value = e.target.value;            
        }
        
        function handleFileUpload(event) {
            image.value = event.target.files[0];
        }
        
        function handleBook() {
            if(!autId.value) {
                autId.value = getData.value.author_id;
            }
            let formData = new FormData();
            formData.append("_method", 'put')
            formData.append("name", getData.value.name)
            formData.append("price", getData.value.price)
            formData.append("quantity", getData.value.quantity)
            formData.append("description", getData.value.description)
            formData.append("author_id", autId.value)

            if (image.value !== null) {
                formData.append("image", image.value)
            }

            bookStore.updateBook(props.id, formData)
        }

        return { getAuthors ,getData, getErrMsg, handleFileUpload, handleAutId, handleBook }
    }
}
</script>

<style>

</style>