<template>
   <div class="text-black flex md:flex-row md:items-start items-center flex-col w-full">
      <div class=" text-center md:my-0 my-4 md:text-left md:mr-auto">
         Página {{ currentPage }} de {{ totalPages }}
      </div>
      <div class="pagination">
         
         <button v-if="currentPage > 1" @click="pageChanged(currentPage - 1)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-[#d5d5d5] fill-transparent">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
         </button>
         <div class="px-3 number-pagination">
            <button v-for="page in pages" :key="page" :class="{ active: page === currentPage }" @click="pageChanged(page)">
            {{ page }}
         </button>
         </div>
         <button v-if="currentPage < pageCount" @click="pageChanged(currentPage + 1)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-[#d5d5d5] fill-transparent">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
         </button>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    pageSize: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    },
    pageCount() {
      return Math.ceil(this.total / this.pageSize)
    },
    pages() {
      const pages = []
      for (let i = 1; i <= this.pageCount; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    pageChanged(page) {
      this.currentPage = page
      this.$emit('page-changed', page)
    }
  }
}
</script>