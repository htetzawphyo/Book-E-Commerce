import axios from "axios";
import { defineStore } from "pinia";
import { getCurrentInstance, ref, computed } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('authStore', () => {
    // vue progress 
    const internalInstance = getCurrentInstance();

    // router
    const router = useRouter();

    //      STATE
    let users = ref([]);
    let profile = ref([]);
    let errMsg = ref([]);
    let indexId = ref([]);
    let meta = ref([]);
    let current_page = ref(null);
    let total_page = ref(null);

    //      GETTER
    let getData = computed( () => {
        return users.value.data;
    })

    let getProfileData = computed( () => {
        return profile.value.data;
    })

    // for error
	const getErrMsg = computed( () => {
		return errMsg.value;
	})

    // for index row id
    const getIndex = computed( () => {
		return indexId.value;
	})

    const getMeta = computed( () => {
        return meta.value;
    })

    //      ACTIONS

    function next(search, page = current_page.value) {
        if(page >= 1 && page < total_page.value){
            ++page;
            getUsers(search, page);
        } 
    }

    function prev(search, page = current_page.value) {
        if(page > 1 && page <= total_page.value){
            --page;
            getUsers(search, page);
        }
    }

    function first(search, page = 1) {
        getUsers(search, page);
    }

    function last(search, page = total_page.value) {
        getUsers(search, page);
    }

    function register(formData) {
        internalInstance.appContext.config.globalProperties.$Progress.start();
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('http://127.0.0.1:8000/api/register', formData)
            .then( res => {
                localStorage.setItem('token', res.data.token)
                router.push({name: 'home'})
                console.log(res.data)
            })
            .catch( err => {
                errMsg.value = err.response.data.errors;
            })
            .finally( () => {
                internalInstance.appContext.config.globalProperties.$Progress.finish();
            })
        });
    }

    function login(formData) {
        internalInstance.appContext.config.globalProperties.$Progress.start();
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('http://127.0.0.1:8000/api/login', formData)
            .then( res => {
                localStorage.setItem('token', res.data.token)
                let role = res.data.role_id;
                if(role == 1){
                    router.push('/admin');
                } else {
                    router.push({name: 'home'});
                }
            })
            .catch( err => {
                errMsg.value = err.response.data.errors;
            })
            .finally( () => {
                internalInstance.appContext.config.globalProperties.$Progress.finish();
            })
        });
    }

    function logout() {
        internalInstance.appContext.config.globalProperties.$Progress.start();
        axios.post('http://127.0.0.1:8000/api/logout')
        .then( res => {
            localStorage.removeItem("token");
            router.push('/login')
        })
        .catch( err => {
            console.log(err)
        })
        .finally( () => {
            internalInstance.appContext.config.globalProperties.$Progress.finish();
        })
    }

    function getProfile() {
        axios.get(`http://127.0.0.1:8000/api/profile`)
        .then( res => {
            profile.value = res.data
            // console.log(getProfileData.value)
        })
        .catch( err => {
            console.log(err)
        })
    }

    function getUsers(search = '', page = 1) {
        internalInstance.appContext.config.globalProperties.$Progress.start();
        axios.get(`http://127.0.0.1:8000/api/users?search=${search}&page=${page}`)
        .then( res => {
            users.value = res.data;
            current_page.value = res.data.meta.current_page;
            total_page.value = res.data.meta.last_page;
            // for row id
            let from = res.data.meta.from;
            let to = res.data.meta.from + res.data.meta.per_page;
            indexId.value.splice(0, res.data.meta.per_page);
			for(let i = from; i < to ; i++){
                indexId.value.push(i);
			}
            // for disable paginate
            meta.value =  res.data.meta;
        })
        .catch( err => {
            console.log(err)
        })
        .finally( () => {
            internalInstance.appContext.config.globalProperties.$Progress.finish();
        })
    }

    return { login, logout, register, getUsers, next, last, prev, first, getProfile, getData, getErrMsg, getMeta, getIndex, getProfileData }
})