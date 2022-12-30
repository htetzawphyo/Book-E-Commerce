import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthorStore = defineStore('authorStore', () => {
	// state
	const authors = ref([])

	// getters
	const getAuthors = computed( () => {
		return authors.value.data
	})

	// actions
	function getAuthor() {
		axios.get(`http://127.0.0.1:8000/api/authors`)
		.then( res => {
			let resAuthors = res.data
			authors.value = resAuthors   
		})
		.catch( err => {
			console.log(err.message)
		})
	}

	function search(search) {
		axios.get(`http://127.0.0.1:8000/api/authors/?search=${search}`)
		.then( res => {
			let resAuthors = res.data
			authors.value = resAuthors   
		})
		.catch( err => {
			console.log(err.message)
		})
	}

	function addAuthor(author) {
		console.log(author)
		axios.post(`http://127.0.0.1:8000/api/authors`, author,{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then( res => {
			console.log('success')
		})
		.catch( err => {
			console.log("Err: ", err.response.data)
		})
	}

	return { getAuthors, getAuthor, search, addAuthor }
})