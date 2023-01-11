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
                                <label class="text-bold">Name</label>
                                <input type="text" class="form-control" placeholder="Name" v-model="name" 
                                    :class="{'is-invalid': getErrMsg.name, 'border-danger': getErrMsg.name, 'border-dark': !getErrMsg.name}">
                                    <span v-if="getErrMsg.name" class="text-danger fst-italic">{{ getErrMsg.name[0] }}</span>
                            </div>
                            <div class="mb-3">
                                <label class="text-bold">Description</label>
                                <textarea class="form-control" cols="30" rows="8" v-model="description"
                                :class="{'is-invalid': getErrMsg.description, 'border-danger': getErrMsg.description, 'border-dark': !getErrMsg.description}"
                                ></textarea>
                                <span v-if="getErrMsg.description" class="text-danger fst-italic">{{ getErrMsg.description[0] }}</span>
                            </div>
                            <div class="mb-3">
                                <label for="formFile" class="form-label border-dark text-bold">Image</label>
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
import { ref } from '@vue/reactivity'
import { useAuthorStore } from '../../store/AuthorStore'
import { storeToRefs } from 'pinia'

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
        const { getErrMsg } = storeToRefs(authorStore);

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
        }
        
        return { name, description,image, handleFileUpload , handleAuthor, getErrMsg}
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