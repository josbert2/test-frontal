

<template>
      <div class="py-4 px-3 flex items-center">
         <div class="form-control mb-none  md:block hidden">
            <div class="relative">
               <input placeholder="Search" v-model="searchType"  type="text" class="tw-input search-type">
               <div class="absolute top-2/4 left-3 transfrom -translate-y-2/4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#999999" class="w-6 h-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
               </div>
            </div>
         </div>
         <div class="ml-auto md:block hidden">
            <div class="flex">
               <div class="flex items-center pr-7">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-11 h-11 text-primary-500 fill-transparent">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                  </svg>
               </div>
               <div @click="viewProfile" class="cursor-pointer">
                  <div class="pr-4" >
                     <h3 class="text-xl text-black/50 font-bold">
                        {{ username}}
                     </h3>
                     <p class="text-base text-gray-500 text-right">
                        {{  lastname  }}
                     </p>
                  </div>
               </div>
               <div class="avatar-container w-11 h-11 rounded-full">
                  <img class="rounded-full h-full w-full" v-lazy="image" />
               </div>
            </div>
         </div>
         <div class="md:hidden block">
            <button class="text-black" @click="toggleMenu">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
               </svg>
            </button>
         </div>
      </div>
</template>

<script>
   import axios from 'axios'
   export default{
      data(){
         return{
            username: '',
            lastname: '',
            userId : '',
            image: '',
            searchType: ''
           
         }
      },
   
      methods: {
         async getUserBylocalStorage(){
            if (localStorage.getItem('access_token')){
               const email = localStorage.getItem('access_token')
               const response = await axios.get('http://localhost:3000/users' + '?email=' + email)
               this.username = response.data[0].name
               this.lastname = "asdasd"
               this.image = response.data[0].image
               this.userId = response.data[0].id
            }
          
         },
         viewProfile(){
            this.$router.push({ name: 'contact', params: { id: this.userId } })
         },
         toggleMenu(){
            document.querySelector('.navbar-mobile').classList.toggle('open')
            document.querySelector('.overlay-menu-mobile').classList.toggle('open')
         }
      },
      mounted(){
         this.getUserBylocalStorage()
      }
      
      
   }
</script>