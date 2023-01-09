<script setup>
  import NavBar from '@/components/Navigation/NavBar.vue'
</script>

<template>
  <div class="flex h-screen md:p-5 ">
    <div class="overlay-menu-mobile" @click="toggleMenu">

    </div>
    <div class="w-[120px] fixed left-0 top-0 h-full navbar-mobile"   v-bind:class="{ 'open': isActive }">
      <div class="md:py-5 md:pl-5 h-full ">
        <NavBar />
        
      </div>
      
    </div>
    <main class="md:ml-[120px] bg-white w-full">
      <div class="w-full">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        isActive: false,
        showMenu: false,
      }
    },
    methods: {
      toggleMenu() {
        document.querySelector('.navbar-mobile').classList.remove('open')
        document.querySelector('.overlay-menu-mobile').classList.remove('open')
      },
    },
    
  }

</script>

