<script setup>
   import Header  from '@/components/Header/Header.vue'
   import Table from '@/components/Table.vue'
   import PaginationControls from '@/components/PaginationControls.vue';
   
</script>
<template>
      <Header />
      <div v-if="errorMessage">
         {{ errorMessage }}
      </div>
      <div v-else-if="loading">
         Cargando...
      </div>
      <div v-else>
         <div class="md:px-0 px-5">
            <div class="flex items-center md:flex-row flex-col bg-primary-500 px-3 py-3 rounded-3xl font-bold">
               <label class="md:mr-5 md:w-auto w-full md:mb-0 mb-4">
                  <select  v-model="selectedSex" @change="currentPage = 1" class="text-white bg-transparent twselect-input">
                     <option value="all">Todos</option>
                     <option value="M">Hombre</option>
                     <option value="F">Mujer</option>
                  </select>
               </label>
               <label  class="md:mr-5 md:w-auto w-full md:mb-0 mb-4">
                  <select  v-model="selectedNationality" @change="currentPage = 1" class="text-white bg-transparent twselect-input">
                     <option value="all">Nacionalidad</option>
                     <option value="ES">Español</option>
                     <option value="FR">Francés</option>
                     <option value="Peruana">Peruana</option>
                  </select>
               </label>
               <label class="md:w-auto w-full md:mb-0 mb-4">
                  <select  v-model="selectePersonalize" @change="currentPage = 1" class="text-white bg-transparent twselect-input">
                     <option value="all" selected>Perzonalizar</option>
                     <option value="all" ></option>
                  </select>
               </label>
               <div class="md:ml-auto md:w-auto w-full">
                  <input type="search" placeholder="Search" class="input-search" v-model="searchText" @input="currentPage = 1" />
               </div>
            </div>
         </div>
         
         <Table :users="currentPageUsers" :delete-user="deleteUser" />
         
         <div class="pt-3">
            <PaginationControls 
               :pageSize="7" 
               :total="filteredUsersCount" 
               v-on:page-changed="pageChanged" 
            />
         </div>
      </div>
</template>
<script>
   import axios from 'axios'

   export default {
      data() {
         return {
            users: null,
            currentPage: 1,
            pageSize: 7,
            loading: false,
            errorMessage: null,
            selectedSex: 'all',
            selectedNationality: 'all',
            selectePersonalize: 'all',
            searchText: '',
         }
      },
      computed: {
         currentPageUsers() {
            
            if (!this.users) return []

            let filteredUsers = this.users
            if (this.selectedSex !== 'all') {
               filteredUsers = filteredUsers.filter(user => user.sex === this.selectedSex)
            }
            if (this.selectedNationality !== 'all') {
               filteredUsers = filteredUsers.filter(user => user.nationality === this.selectedNationality)
            }
            if (this.searchText) {
               const searchTextLower = this.searchText.toLowerCase()
               filteredUsers = filteredUsers.filter(user => {
                  return Object.values(user).some(value => {
                     return typeof value === 'string' && value.toLocaleLowerCase().includes(searchTextLower)
                  })
               })
            }

            const start = (this.currentPage - 1) * this.pageSize
            return filteredUsers.slice(start, start + this.pageSize)
         },
         filteredUsersCount() {
            if (!this.users) return 0

            let filteredUsers = this.users
            if (this.selectedSex !== 'all') {
               filteredUsers = filteredUsers.filter(user => user.gender === this.selectedSex)
            }
            if (this.selectedNationality !== 'all') {
               filteredUsers = filteredUsers.filter(user => user.nationality === this.selectedNationality)
            }
            if (this.searchText) {
               filteredUsers = filteredUsers.filter(user => user.name.includes(this.searchText))
            }

            return filteredUsers.length
         }
      },
      async mounted() {
         this.loading = true
         try {
            const { data } = await axios.get('http://localhost:3000/users')
            this.users = data
         } catch (error) {
            this.errorMessage = 'Error al cargar los usuarios'
         } finally {
            this.loading = false
         }
      },
      methods: {
         async pageChanged(page) {
            this.currentPage = page
         },
         
         async addPost() {
            const post = { title: this.title, author: this.author };
            await axios.post('http://localhost:3000/posts', post);
         

            const response = await axios.get('http://localhost:3000/posts');
            this.users = response.data;
         }
      },
   }

</script>