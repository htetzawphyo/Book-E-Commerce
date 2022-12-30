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
                            <small class="h3 text-muted">CREATE FORM</small>
                            <div class="">
                                <router-link :to="{name: 'author'}" class="btn btn-dark"><i class="fa-solid fa-angles-left me-2"></i>Back</router-link>
                            </div>
                        </div>
                    </div>
                    

                    <!-- CREATE FORM -->
                    <form @submit.prevent="handleAuthor">                        
                        <div class="card-body">
                            <div class="mb-3">
                                <label>Name</label>
                                <input type="text" class="form-control border-dark" placeholder="Name" v-model="name">
                            </div>
                            <div class="mb-3">
                                <label>Description</label>
                                <textarea class="form-control border-dark" cols="30" rows="8" v-model="description"></textarea>
                            </div>
                            <div class="mb-3" @click="selectingImg">
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
import SideBar from '../components/SideBar.vue'
import DashboardNavBar from '../components/DashboardNavBar.vue'
import { ref } from '@vue/reactivity'
import { useAuthorStore } from '../store/AuthorStore'

export default {
    components: { 
        SideBar,
		DashboardNavBar 
	},
    setup() {
        const name = ref('');
        const description = ref('');
        const image = ref(null);

        const authorStore = useAuthorStore();

        let handleFileUpload = (event) => {
            image.value = event.target.files[0];
        }

        let handleAuthor = () => {
            const author = {
                name: name.value,
                description: description.value,
                image: image.value
            }

            authorStore.addAuthor(author);
            name.value = "";
            description.value = "";
            image.value = null;
        }
        
        return { name, description,image, handleFileUpload , handleAuthor}
    }
}
</script>

<style>
    @media (max-width : 768px) {            
            
    }
    @media (min-width: 768px) {
        
    }
    @media (max-width : 576px) {
        
    }
</style>