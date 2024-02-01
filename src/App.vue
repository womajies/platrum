<template>
  <main class="container">
    <UButton variant="primary" @click="openModal">Добавить</UButton>

    <UTable @sort-change="customSort" />
    <AddUserModal v-if="showModal" @add-user="closeModal" @before-close="closeModal" />
  </main>
</template>

<script>
import UButton from './components/ui/UButton.vue'
import UTable from './components/ui/UTable.vue'
import AddUserModal from './components/modal/AddUserModal.vue'

export default {
  name: 'App',

  components: {
    UButton,
    UTable,
    AddUserModal
  },

  data() {
    return {
      showModal: false
    }
  },

  methods: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    customSort(sortType) {
      this.$store.dispatch('sortUsers', sortType)
    }
  }
}
</script>

<style lang="scss">
.container {
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>
