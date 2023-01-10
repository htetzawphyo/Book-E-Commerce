import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCurrentInstance } from "vue";

export const useBookStore = defineStore('bookStore', () => {
    // vue progress
	const internalInstance = getCurrentInstance();

    // State
    let books = ref([]);

    // getters
    let getData =  computed( () => {
        return books.value.data
    })

    // actions 
    function getBook() {
        internalInstance.appContext.config.globalProperties.$Progress.start();
        axios.get(`http://127.0.0.1:8000/api/books`)
        .then( res => {
            let resBooks = res.data
            books.value = resBooks
        })
        .catch( err => {
            console.log(err)
        })
        .finally( () => {
            internalInstance.appContext.config.globalProperties.$Progress.finish();
        })
    }

    function deleteBook() {

    }

    return { getData, getBook, deleteBook }
})