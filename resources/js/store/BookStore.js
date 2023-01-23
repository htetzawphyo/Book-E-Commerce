import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

export const useBookStore = defineStore('bookStore', () => {
    // vue progress
	const internalInstance = getCurrentInstance();
    const router = useRouter();

    // State
    let books = ref([]);
    let errMsg = ref([]);
    let indexId = [];
    let meta = ref([]);
    let current_page = ref(null);
    let total_page = ref(null);

    // getters
    let getData =  computed( () => {
        return books.value.data;
    })
    // for error
	const getErrMsg = computed( () => {
		return errMsg.value;
	})
    // for index row id
    const getIndex = computed( () => {
		return indexId;
	})
    // for meta data
	const getMeta = computed( () => {
		return meta.value;
	})
 
    // actions 

    function next(search, page = current_page.value) {
        if(page >= 1 && page < total_page.value){
            ++page;
            getBook(search, page);
        }      
    }

    function prev(search, page = current_page.value) {
        if(page > 1 && page <= total_page.value){
            --page;
            getBook(search, page);
        }        
    }

    function first(search, page = 1) {
        getBook(search, page);
    }

    function last(search, page = total_page.value) {
        getBook(search, page)
    }

    function getBook(search = '', page = 1) {
        internalInstance.appContext.config.globalProperties.$Progress.start();
        axios.get(`http://127.0.0.1:8000/api/books?search=${search}&page=${page}`)
        .then( res => {
            books.value = res.data
            current_page.value = res.data.meta.current_page;
            total_page.value = res.data.meta.last_page;
            // for row id
            let from = res.data.meta.from;
            let to = res.data.meta.from + res.data.meta.per_page;
            let to_splice = res.data.meta.per_page + 1;
            indexId.splice(0, to_splice);
			for(let i = from; i < to ; i++){
				indexId.push(i);
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

    function addBook(book) {
        axios.post(`http://127.0.0.1:8000/api/books`, book,{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then( res => {
            console.log(res)
			router.push({ name: 'book'})
		})
		.catch( err => {
			errMsg.value = err.response.data.errors;
		})
    }

    function editBook(id) {
		axios.get(`http://127.0.0.1:8000/api/books/${id}`)
		.then( res => {
			books.value = res.data
		})
	}

    function updateBook(id, formData){
        axios.post(`http://127.0.0.1:8000/api/books/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then(response => {
			router.push({name: 'book'})
		})
		.catch(error => {
			errMsg.value = error.response.data.errors;
		});
    }

    function deleteBook(id, index) {
        axios.delete(`http://127.0.0.1:8000/api/books/${id}`)
		.then( res => {
			this.getData.splice(index, 1)
			console.log(res)
		})
		.catch( err => {
			console.log(err)
		})
    }

    return { getData, getErrMsg, getIndex, getMeta, getBook, deleteBook, addBook, editBook, updateBook, next, prev, first, last }
})