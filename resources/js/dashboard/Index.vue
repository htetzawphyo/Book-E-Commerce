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
				  <MainBody></MainBody>
			  </main>

		  </div>
  </div>
</template>

<script>
import MainBody from '../components/MainBody.vue'
import SideBar from '../components/SideBar.vue'
import DashboardNavBar from '../components/DashboardNavBar.vue'
export default {
components: {
  MainBody,
  SideBar, 
  DashboardNavBar 
  },

}
</script>

<style>

</style>