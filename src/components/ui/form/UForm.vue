<template>
  <form class="u-form" novalidate autocomplete="off" @submit.prevent>
    <slot />
  </form>
</template>

<script>

export default {
  name: 'UForm',

  emits: ['submit']
}

</script>
