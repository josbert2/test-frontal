<template>
   <div class="" v-for="user in usersList" :key="user.id">
         <router-link :to="{ name: 'contact', params: { id: user.id } }">
            <div class="flex items-center bg-white rounded-lg mb-4 py-5 px-4">
               <div class="">
                  <div class="w-11 h-11 rounded-full flex items-center">
                     <img class="rounded-full h-full w-full object-cover" v-lazy="user.image" />
                  </div>
               </div>
            <div class=" ml-2">
               <div class="font-black text-gray-600 text-base">
                  {{ user.name }} {{ user.lastname }}
               </div>
               <div class="">
                  {{ user.name }} {{ user.lastname }}
               </div>
            </div>
            </div>
         </router-link>
   </div>
</template>
<script>


   export default {
      name: 'ListUsers',
      props: {
         usersList: {
            type: Array,
            required: true
         }
      }
   }

</script>