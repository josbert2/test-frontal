<script setup>
   import Header from '@/components/Header/Header.vue'
</script>
<template>
   <Header />

   <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div class="col-span-2">
         <div class=" bg-primary-500 rounded-lg px-6 py-5">
            <div class="grid grid-cols-4">
               <div class="">
                  <div class="w-32 h-32 rounded-full flex items-center">
                     <img class="rounded-full h-full w-full" v-lazy="user.image" />
                  </div>
               </div>
               <div class="col-span-3">
                  <div class="text-3xl font-black text-white">
                     {{ user.name }}
                  </div>
                  <div class="grid grid-cols-2 text-white pt-5">
                     <div class="">
                        <div class="">
                           {{  user.age }} años
                        </div>
                        <div class="">
                           {{ user.email }}
                        </div>
                        <div class="">
                           {{ user.nationality }}
                        </div>
                     </div>
                     <div class="">
                        <div class="">
                           Telef: {{ user.phone }}
                        </div>
                        <div class="">
                           Cédula: {{ user.document }}
                        </div>
                        <div class="">
                           Vive en {{ user.city }}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="container-wrap  w-full mt-7 ">
            <div class="grid grid-cols-2 gap-6 py-4 form-inputs">
               <div class="">
                  <div class="">
                     <input type="text" readonly v-bind:value="user.name" />
                  </div>
                  <div class="">
                     <input type="text" readonly v-bind:value="user.email" />
                  </div>
                  <div class="">
                     <input type="text" readonly v-bind:value="user.age" />
                  </div>
                  <div class="">
                     <input type="text" readonly v-bind:value="user.gender" />
                  </div>
                  <div class="">
                     <input type="text" readonly v-bind:value="user.nationality" />
                  </div>
                  <div class="">
                     <input type="text" readonly v-bind:value="user.Profesion" />
                  </div>
               </div>
               <div class="">
                  <div class="">
                     <input type="text" readonly v-bind:value="user.lastName" />
                  </div>
                  <div class="">
                     <input type="text" readonly v-bind:value="user.phone" />
                  </div>
                  <div class="">
                     <input type="text" readonly v-bind:value="user.document" />
                  </div>
                  <div class="">
                     <input type="text" readonly v-bind:value="user.statusCivil" />
                  </div>
                  <div class="">
                     <input type="text" readonly v-bind:value="user.city" />
                  </div>
                  <div class="">
                     <input type="text" readonly v-bind:value="user.Cargo" />
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="flex flex-col h-full">
         <div class="h-full">
            <div class="container-wrap w-full h-[90%] mb-3">
               <div class="py-3 pt-5">
                  <h2 class="text-secondary-500 text-base font-bold mb-4 text-center">Actividad reciente</h2>
               </div>
               <div class="">
                  <div class="flex flex-col border-t pt-4 border-primary-500 border-b pb-4">
                     <span>Nombre actualizado el 01/11/2022 a</span>
                     <span class="text-primary-500 font-bold">Maria</span>
                  </div>
               </div>
               
            </div>
            <div class="mt-auto">
               <button class="w-full uppercase bg-[#3890FE] text-white py-3 rounded-full font-medium" @click="goBack">Regresar</button>
            </div>
         </div>
      </div>
       
   </div>

</template>
<script>
import axios from 'axios'
   export default {
         data() {
            return {
               user: {}
            }
         },
         computed: {
            userId() {
               return this.$route.params.id
            }
         },
         created(){
            this.getUser()
         },
         methods: {
            async getUser(){
               try {
                  const response = await axios.get(`http://localhost:3000/users/${this.userId}`)
                  this.user = response.data
               } 
               catch (error) {
                  console.log(error)
               }
               
            },
         
            goBack() {
               this.$router.go(-1)
            }
          
         }
   }

   
</script>