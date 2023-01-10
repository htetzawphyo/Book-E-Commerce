import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

export const useAuthorStore = defineStore('authorStore', () => {
	// vue progress
	const internalInstance = getCurrentInstance();

	// router
	let router = useRouter();

	// state
	let authors = ref([])
	let page = 1
	let total = ref(null);
	let indexId = [];
	let currentPage = null;

	// <===== GETTERS =====>
	const getAuthors = computed( () => {	
		return authors.value.data
	})
	// for row id
	const totalItem = computed( () => {
		return indexId
	})
	
	// actions
	function next(search, page = currentPage) {
		console.log('search: '+ search, ' | ', 'page: '+page)
		if(page >= 1 && page < total){
			++page;
			getAuthor(search,page)
		} else {
			return;
		}
	}
	function prev(search, page = currentPage) {
		if(page > 1 && page <= total) {
			--page;
			getAuthor(search, page)
		}
	}
	function first(search, page = 1) {
		getAuthor(search, page)
	}
	function last(search, page = total) {
		getAuthor(search, page)
	}
	
	function getAuthor(search = '', page = 1) {
		console.log(search, page)
		internalInstance.appContext.config.globalProperties.$Progress.start();
		axios.get(`http://127.0.0.1:8000/api/authors?search=${search}&page=${page}`)
		.then( res => {
			let resAuthors = res.data
			authors.value = resAuthors
			total = res.data.meta.last_page
			currentPage = res.data.meta.current_page;
			// for row id
			let from = res.data.meta.from
			let to = res.data.meta.from + res.data.meta.per_page
			indexId.splice(0, to);
			for(let i = from; i < to ; i++){
				indexId.push(i);
			}
		})
		.catch( err => {
			console.log(err)
		})
		.finally( () => {
			internalInstance.appContext.config.globalProperties.$Progress.finish();
		})
	}

	function editAuthor(id) {
		axios.get(`http://127.0.0.1:8000/api/authors/${id}`)
		.then( res => {
			let resAuthors = res.data
			authors.value = resAuthors
		})
	}	

	function addAuthor(author) {
		axios.post(`http://127.0.0.1:8000/api/authors`, author,{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then( res => {
			router.push({ name: 'author'})
			console.log('success')
		})
		.catch( err => {
			console.log("Err: ", err.response.data)
		})
	}

	function updateAuthor(id, formData) {
		axios.post(`http://127.0.0.1:8000/api/authors/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then(response => {
			console.log(response.data);
		})
		.catch(error => {
			console.log(error);
		});
	}

	function deleteAuthor(id, index) {
		axios.delete(`http://127.0.0.1:8000/api/authors/${id}`)
		.then( res => {
			this.getAuthors.splice(index, 1)
			console.log(res)
		})
		.catch( err => {
			console.log(err)
		})
	}

	return { getAuthors, getAuthor, addAuthor, editAuthor, updateAuthor, deleteAuthor, next, prev, totalItem, first, last }
})

// function search(search, page = 1) {
// 	axios.get(`http://127.0.0.1:8000/api/authors/?search=${search}&page=${page}`)
// 	.then( res => {
// 		let resAuthors = res.data
// 		authors.value = resAuthors   
// 		total = res.data.meta.last_page
// 		currentPage = res.data.meta.current_page
		
// 		let from = res.data.meta.from
// 		let to = res.data.meta.from + res.data.meta.per_page
// 		indexId.splice(0, to);
// 		for(let i = from; i < to ; i++){
// 			indexId.push(i);
// 		}
// 		console.log(res.data.meta)
// 		console.log(total)
// 	})
// }