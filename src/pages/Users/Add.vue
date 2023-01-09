<script setup>
   import Header  from '@/components/Header/Header.vue'
</script>

<template>
   <Header />
   <div class="container_w">
      <div class="container-wrap w-full mt-7">
         <div class="grid md:grid-cols-4 grid-cols-1">
            <div class="">
               <div class="w-20 h-20 mx-auto rounded-full flex items-center flex-col">
                  <img class="rounded-full h-full w-full object-cover" v-lazy="user.image" />
                
                  <div class="relative w-full">
                     <input ref="fileInput" @change="uploadImage" class="custom-file-input " type="file">
                  </div>
                  
               </div>
              
            </div>
            <div class="col-span-3 md:mt-0 mt-20">
               <div class="text-3xl font-black text-black md:text-left text-center">
                  
                  <div class="font-black text-black" v-if="!user.name"> 
                     AA
                  </div>
                  <span v-if="errors.name" class="text-danger-500 text-xs">{{ errors.name }}</span>
                  {{ user.name }} {{ user.last_name  }}
                  
               </div>
               <div class="grid grid-cols-2 text-black pt-5">
                  <div class="font-black">
                     <div class="font-black">
                        <div class="font-black text-black" v-if="!user.age"> 
                           años
                        </div>
                        <span v-if="errors.age" class="text-danger-500 text-xs">{{ errors.age }}</span>
                        {{  user.age }}
                     </div>
                     <div class="font-black">
                        <div class="font-black text-black" v-if="!user.email"> 
                           email
                        </div>
                        <span v-if="errors.email" class="text-danger-500 text-xs">{{ errors.email }}</span>
                        {{ user.email }}
                     </div>
                     <div class="font-black">
                        <div class="font-black text-black" v-if="!user.nationality"> 
                           nacionalidad
                        </div>
                        <span v-if="errors.nationality" class="text-danger-500 text-xs">{{ errors.nationality }}</span>
                        {{ user.nationality }}
                     </div>
                  </div>
                  <div class="">
                     <div class="font-black">
                        <div class="font-black text-black" v-if="!user.phone"> 
                           Teléfono
                        </div>
                        <span v-if="errors.phone" class="text-danger-500 text-xs">{{ errors.phone }}</span>
                        {{ user.phone }}
                     </div>
                     <div class="font-black">
                        <div class="font-black text-black" v-if="!user.document"> 
                           Cédula
                        </div>
                        <span v-if="errors.document" class="text-danger-500 text-xs">{{ errors.document }}</span>
                        {{ user.document }}
                     </div>
                     <div class="font-black">
                        <div class="font-black text-black" v-if="!user.city"> 
                           residencia
                        </div>
                        <span v-if="errors.city" class="text-danger-500 text-xs">{{ errors.city }}</span>
                        {{ user.city }}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class=" md:px-0 px-5 py-5">
         <h2 class="text-base text-black font-bold">Escribe los datos para agregar a una persona</h2>
      </div>
      <div class="container-wrap w-full">
         <div class="grid grid-cols-2 gap-6 py-4 form-inputs">
            <div class="">
               <div class="">
                  <input  v-model="user.name" type="text" placeholder="Nombre" />
               </div>
               <div class=""><input v-model="user.email" type="text" placeholder="Correo"  /></div>
               <div class=""><input v-model="user.age" type="text" placeholder="Edad" /></div>
               <div class="">
                  <select v-model="user.gender">
                     <option disabled value="">Sexo</option>
                     <option value="1">Masculino</option>
                     <option value="2">Femenino</option>
                  </select>
               </div>
               <div class=""><input v-model="user.nationality" type="text" placeholder="Nacionalidad"  /></div>
               <div class="">
                  <select v-model="user.Cargo">
                     <option disabled value="">Nivel de estudios</option>
                     <option value="1">Superior</option>
                     <option value="2">Intermedio</option>
                  </select>
               </div>
            </div>
            <div class="">
               <div class=""><input v-model="user.last_name" type="text" placeholder="Apellido"  /></div>
               <div class=""><input v-model="user.phone" type="text" placeholder="Teléfono"  /></div>
               <div class=""><input v-model="user.document" type="text" placeholder="Cédula" /></div>
               <div class="">
                  <select v-model="user.CivilStatus">
                     <option disabled value="">Estado civil</option>
                     <option value="1">Casado</option>
                     <option value="2">Soltero</option>
                  </select>
               </div>
               <div class=""><input v-model="user.city" type="text" placeholder="Lugar de residencia"  /></div>
               <div class="">
                  <select v-model="user.Profesion">
                     <option disabled value="">Cargo actual</option>
                     <option value="1">Ingeniero</option>
                  </select>
               </div>
            </div>
         </div>
         

      </div>
      <div class="pt-5 md:pb-0 pb-10 md:px-0 px-5">
         <div class="pt-4 pb-4 flex justify-center">
            <div v-if="successMessage"  v-html="successMessage" class="text-green-500 bg-green-100 px-10 py-4 rounded-full text-center flex items-center justify-center">
              
            </div>
         </div>
         <button class="w-full bg-[#3890FE] text-white py-3  rounded-full font-medium" @click.prevent=" addOrUpdateUser">
               <template v-if="loading">
                  <div role="status" class="flex justify-center">
                     <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200  animate-spin duration-150  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                     </svg>
                     <span class="sr-only">Loading...</span>
                  </div>
               </template>
               <template v-else>
                  {{ buttonText }}
               </template>
         </button>
      </div>
   </div>
</template>

<script>
   

   import axios from 'axios'
   import fs from 'fs';

   export default {
      name: 'Add',
      props: {
         mode: {
            type: String,
            required: true
         }
      },
      data(){
         return {
            buttonText: 'AGREGAR CONTACTO',
            successMessage: '',
            user: {
               id: '',
               name: '',
               last_name: '',
               image: 'https://eu.ui-avatars.com/api/?name=AA&size=250',
               age: '',
               email: '',
               nationality: '',
               phone: '',
               document: '',
               city: '',
               gender: '',
               CivilStatus: '',
               Profesion: '',
               Cargo: '',
               updateAt: '',

            },
            mode: '',
            loading: false,
            lastId: '',
            errors: {}
         }
      },
      computed:{
         routeMode() {
            return this.$route.params.mode;
         }
      },
      created(){
         
         if (this.$route.params.mode === 'edit') {
            this.buttonText = 'EDITAR CONTACTO'
            this.mode = 'edit'
            try{
               ;
               const response = axios.get(`http://localhost:3000/users/${this.$route.params.id}`).then(response => {
                  this.user = response.data;
               });
               console.log(response)
            }
            catch(error){
               console.log(error)
            }
         }
      },
      methods: {
         addOrUpdateUser() {
            this.loading = true;
            this.successMessage = '';
            setTimeout(async () => {
           
               if (this.mode === 'edit') {
                  await this.updateUser();
               } else {
                  await this.addUser();
               }
               this.loading = false;
            }, 1000);
         },
         async addUser(){
            this.errors = this.validateForm()
            if (Object.keys(this.errors).length === 0) {
               try {
                  this.lastId = this.getLastIdBD()
                  const response = await axios.post('http://localhost:3000/users', this.user);
                  const users = response.data;
                  this.successMessage = `
                     <span>¡Tu usuario fue agregado exitosamente!</span>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-2">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                     </svg>

                     `;
                  const fields = document.querySelectorAll('.form-inputs input');
                  for (const field of fields) {
                     field.value = '';
                  }

               } catch (error) {
                  console.log(error)
               }
            } else {
               // Form is invalid, display error messages
            }
         },
         async updateUser() {
            try {
               this.user.updateAt = Date.now()
               const response = await axios.put(`http://localhost:3000/users/${this.$route.params.id}`, this.user);
               this.user = response.data;
               this.successMessage = `
                  <span>¡Tu usuario fue editado exitosamente!</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
               `;
               const fields = document.querySelectorAll('.form-inputs input');
            } catch (error) {
               console.error(error);
            }
         },
         getLastIdBD(){
            const lastId = axios.get('http://localhost:3000/users')
            .then(response => {
               const users = response.data;
               const lastId = users[users.length - 1].id
               return lastId
            })
            .catch(error => {
               console.log(error)
            })
        

         },
         uploadImage(){
            const file = this.$refs.fileInput.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
               this.user.image = reader.result
            }
         },
         validateForm() {
            const errors = {}
            if (!this.user.name) {
               errors.name = 'Name is required'
            }
            if (!this.user.email) {
               errors.email = 'Email is required'
            }
            if (!this.user.age) {
               errors.age = 'Age is required'
            }
            if (!this.user.gender) {
               errors.gender = 'Gender is required'
            }
            if (!this.user.nationality) {
               errors.nationality = 'Nationality is required'
            }
            if (!this.user.Cargo) {
               errors.Cargo = 'Level of education is required'
            }
            if (!this.user.phone) {
               errors.phone = 'Phone is required'
            }
            if (!this.user.document) {
               errors.document = 'Document is required'
            }
            if (!this.user.city) {
               errors.city = 'Residence is required'
            }
            return errors
         }
      },
      watch: {
         'user.name': function (val) {
            if (val) {
               delete this.errors.name
            } else {
               this.errors.name = 'Name is required'
            }
         },
         'user.email': function (val) {
            if (val) {
               delete this.errors.email
            } else {
               this.errors.email = 'Email is required'
            }
         },
         'user.image': function (val) {
            if (val) {
               delete this.errors.image
            } else {
               this.errors.image = 'Image is required'
            }
         },
         'user.age': function (val) {
            if (val) {
               delete this.errors.age
            } else {
               this.errors.age = 'Age is required'
            }
         },
         'user.phone': function (val) {
            if (val) {
               delete this.errors.phone
            } else {
               this.errors.phone = 'Phone is required'
            }
         },
         'user.document': function (val) {
            if (val) {
               delete this.errors.document
            } else {
               this.errors.document = 'Document is required'
            }
         },
         'user.city': function (val) {
            if (val) {
               delete this.errors.city
            } else {
               this.errors.city = 'City is required'
            }
         },
         'user.gender': function (val) {
            if (val) {
               delete this.errors.gender
            } else {
               this.errors.gender = 'Gender is required'
            }
         }

         

         
      }
   }
</script>
<style>
   .container_w{
      max-width: 800px;
      margin: 0 auto;
   }


</style>