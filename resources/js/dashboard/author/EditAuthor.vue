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
                
                <main class="col-10 mainBody mb-2">
                    <div class="row mb-3">
                        <div class="justify-content-between d-sm-flex flex-sm-column flex-md-row flex-lg-row d-grid gap-2">
                            <small class="h3 text-muted">EDIT FORM</small>
                            <div class="">
                                <router-link :to="{name: 'author'}" class="btn btn-dark">
                                    <i class="fa-solid fa-angles-left me-2"></i>Back
                                </router-link>
                            </div>
                        </div>
                    </div>                    

                    <!-- CREATE FORM -->
                    <form @submit.prevent="handleAuthor">                        
                        <div class="card-body" v-if="getAuthors">
                            <div class="mb-3">
                                <label>Name</label>
                                <input type="text" class="form-control" placeholder="Name"  v-model="getAuthors.name"
                                :class="{'is-invalid': getErrMsg.name, 'border-danger': getErrMsg.name, 'border-dark': !getErrMsg.name}"
                                >
                                <span v-if="getErrMsg.name" class="text-danger fst-italic">{{ getErrMsg.name[0] }}</span>
                            </div>
                            <div class="mb-3">
                                <label>Description</label>
                                <textarea class="form-control" cols="30" rows="8" v-model="getAuthors.description"
                                :class="{'is-invalid': getErrMsg.description, 'border-danger': getErrMsg.description, 'border-dark': !getErrMsg.description}"
                                ></textarea>
                                <span v-if="getErrMsg.description" class="text-danger fst-italic">{{ getErrMsg.description[0] }}</span>
                            </div>
                            <div>
                                <img :src="getAuthors.image_path" alt="" class="img-thumbnail my-2" style="width:200px">
                            </div>
                            <div class="mb-3">
                                <label for="formFile" class="form-label border-dark">Image</label>
                                <input class="form-control border-dark" type="file"  ref="image" id="image" v-on:change="handleFileUpload">
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
import { useAuthorStore } from '../../store/AuthorStore';
import { storeToRefs } from 'pinia';
import { ref } from '@vue/reactivity';

export default {
    components: { 
        SideBar,
		DashboardNavBar 
	},
    props: ['id'],
    setup(props) {
        const id = props.id;
        const authorStore = useAuthorStore();
        authorStore.editAuthor(props.id);
        const { getAuthors, updateAuthor, getErrMsg } = storeToRefs(authorStore);

        const image = ref(null);
        let handleFileUpload = (event) => {
            image.value = event.target.files[0];
        }

        let handleAuthor = () => {
            let formData = new FormData();
            formData.append("_method", 'put')
            formData.append("name", getAuthors.value.name)
            formData.append("description", getAuthors.value.description)

            if (image.value !== null) {
                formData.append("image", image.value)
            }

            authorStore.updateAuthor(id, formData)
        }     

        return { getAuthors , handleAuthor, handleFileUpload, getErrMsg}
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