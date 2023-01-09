

<template>
      <div class=" p-55 rounded ">
         <!-- <table class="w-full table-auto table-vue-tw">
            <thead class="bg-white ">
               <tr class="text-black  font-bold">  
                  <th>Nombre </th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Edad</th>
                  <th>No. Documento</th>
                  <th>Sexo</th>
               </tr>
            </thead>
            <tbody class="bg-[#F5F5F5] text-black rounde-lg">
               <tr v-for="user in users" :key="user.id" >
                  <td>
                     <div class="flex items-center pr-3">
                        <div class="w-6 h-6 rounded-full flex items-center">
                           <img class="rounded-full h-full w-full" src="https://i.pravatar.cc/300" />
                        </div>
                        <div class="ml-2">{{ user.name }}</div>
                     </div>
                     
                  </td>
                  <td>
                     {{ user.email }}
                  </td>
                  <td>
                     {{ user.phone }}
                  </td>
                  <td>
                     {{ user.age }}
                  </td>
                  <td>
                     {{ user.document }}
                  </td>
                  <td>
                     {{ user.gender }}
                  </td>
               </tr>
            </tbody>
         </table> -->
        
         <div class="flex md:flex-row flex-col mt-5 py-6 md:px-0 px-5">
            <div class="shadow rounded-full bg-white flex md:flex-row flex-col md:gap-0 gap-5">
               <button class="btn-filters active">
                  Todos
               </button>
               <button class="btn-filters">
                  Activos
               </button>
               <button class="btn-filters">
                  Inactivos
               </button>
            </div>
            <div class="md:ml-auto flex md:gap-1 md:mt-0 mt-5 md:flex-row flex-col md:gap-0 gap-5">
               <router-link  to="/add" >
                  <button class="btn-header active w-full">
                     Agregar nuevos
                  </button>
               </router-link>
               <button class="btn-header ">
                  Editar vista
               </button>
               <button class="btn-header">
                  Descargar
               </button>
            </div>   
         </div>  
         <ul class="responsive-table">
            <li class="table-header bg-white">
               <div class="col col-3 cursor-pointer"  @click="sortBy('name')">Nombre A-Z</div>
               <div class="col col-3">Correo</div>
               <div class="col col-3">Teléfono</div>
               <div class="col col-1">Edad</div>
               <div class="col col-3">
                  No. Documento
               </div>
               <div class="col col-3">
                  Sexo
               </div>
               <div class="col col-3 opacity-0">
                acciones
               </div>
            </li>
            <div class="p-5 gap-5 flex flex-col rounded-lg bg-[#F5F5F5]">
               <li @onclick="viewDetails(user)" class="table-row" v-for="user in users" :key="user.id">
                  <div class="col col-3" data-label="Nombre A-Z">
                  
                     <router-link :to="{ name: 'contact', params: { id: user.id } }">
                           <div class="flex items-center pr-3">
                              <div class="w-6 h-6 rounded-full flex items-center object-cover">
                                 <img class="rounded-full h-full w-full" v-lazy="user.image" />
                              </div>
                              <div class="ml-2 font-semibold">{{ user.name }}</div>
                           </div>
                     </router-link>
                     
                  </div>
                  <div class="col col-3 font-semibold" data-label="Correo">{{ user.email }}</div>
                  <div class="col col-3 font-semibold" data-label="Télefono">{{ user.phone }}</div>
                  <div class="col col-1 font-semibold" data-label="Edad">{{ user.age }}</div>
                  <div class="col col-3 font-semibold" data-label="No. Documento">{{ user.document }}</div>
                  <div class="col col-3 font-semibold" data-label="Sexo">{{ user.gender }}</div>

                  <div class="col col-3" data-label="">
                     <div class="flex">
                        <router-link :to="{ name: 'edit', params: { id: user.id, mode: 'edit' } }">
                           <button class="text-white mr-2 bg-blue-500 px-4 py-1 rounded-full ">
                              Editar
                           </button>
                        </router-link>
                        
                        <button  class="text-white bg-danger-500 px-4 py-1 rounded-full" 
                                 @click="showModal = true; currentUser = user.name; currentUserId = user.id" 
                                 v-bind:user="user">
                           Borrar <!--click="() => deleteUser(user.id)"-->
                        </button>
                     </div>

                  </div>

               </li>
            </div>
            
         </ul>
        


      </div>
    

      <modal v-if="showModal" @close="showModal = false"   >
         <h3 class="text-white font-medium text-base" slot="header">¿Estás seguro que quieres eliminar el <br> contacto {{ currentUser }}  ?</h3>
         <p class="pt-3 text-white font-light">Si quieres eliminar permanentemente a este contacto escribe la palabra <span class="font-bold text-danger-500">DELETE</span> en el recuadro</p>
         <div class="py-3 mt-4">
            <input type="text"  v-model="confirmation" placeholder="DELETE" class="w-full px-2 text-base text-gray-500 rounded-lg py-3"/>
         </div>
         <div class="flex justify-center pt-5">
            <button class="px-16 py-1.5 text-white text-sm font-medium uppercase rounded-full bg-[#3890FE]" @click="deleteRecord(currentUserId)">Eliminar</button>
         </div>
         <div class="mt-10 flex justify-center w-full">
            <div class="flex items-center  w-full text-danger-500 font-bold">
               <div class="" v-if="errorMessage">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-5">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                  </svg>
               </div>
              
               {{  errorMessage }}

            </div>
           
         </div>
         <div class="absolute top-2 right-2">
            <button slot="footer" @click="showModal = false">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>
         </div>
      </modal>
      
    
      
</template>
<script>

   import axios from 'axios'
   import Modal from './Modal.vue'

   export default {
      name: 'Table',
      components: {
         Modal
      },
      data(){
         return {
            showModal: false,
            confirmation: '',
            currentUser: null,
            currentUserId: null,
            errorMessage: '',
            sortKey: '',
            sortOrders: {}
         }
      },
      created() {
         this.sortBy('name')
      },
      computed: {
         
           sortedItems() {

            return this.items.sort((a, b) => {
               if (a[this.sortKey] > b[this.sortKey]) {
                  return this.sortOrders[this.sortKey]
               } else if (a[this.sortKey] < b[this.sortKey]) {
                  return -this.sortOrders[this.sortKey]
               }
               return 0
            })
         }
      },
      methods: {
         sortBy(key) {
      
            this.sortKey = key
            console.log(this.sortKey)
         
            if (this.sortOrders[key] === 1) {
               this.sortOrders[key] = -1
            } else {
               this.sortOrders[key] = 1
            }
         },
         deleteRecord(id) {
            if (this.confirmation === 'DELETE') {
           
               const index = this.users.findIndex((user) => user.id === id)
               if (index !== -1) {
                  this.users.splice(index, 1)
               }
               this.deleteUser(id)
               .then(() => {
                
                  this.confirmation = ''
                  this.errorMessage = ''
                  this.showModal = false
               })
               .catch((error) => {
             
                  console.error(error)
               })
            }else{
               this.errorMessage = 'Por favor ingresa la palabra "DELETE" para confirmar la eliminación.'
            }
         },
        deleteUser(id){
            return axios.delete(`http://localhost:3000/users/${id}`);
            /*try {
               await axios.delete(`http://localhost:3000/users/${id}`);
               this.users = this.users.filter(user => user.id !== id)
            } catch (error) {
               console.log(error);
            } */
         },
      },
      props: {
         users: {
            type: Array,
            required: true,
         },
      }
   }
</script>