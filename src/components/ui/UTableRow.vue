<template>
  <tr class="u-table-row">
    <td :class="{ 'boss': isBoss }" class="u-table-row__name" @click="toggle">
      <span v-if="indent" :style="{'padding-left': indent + 'px'}"></span>
      {{ item.name }}
      <span v-if="isBoss">[{{ isOpen ? '-' : '+' }}]</span>
    </td>
    <td>{{ item.phone }}</td>
    <div class="u-table-row__subrow" v-show="isOpen" v-if="isBoss">
      <UTableRow v-for="subitem in item.children" :item="subitem" :key="subitem.id" :indent="indent + 16" />
    </div>
  </tr>
</template>

<script>
export default {
  name: 'UTableRow',
  props: {
    item: Object,
    indent: {
      type: Number,
      default: 0,
      required: false
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    isBoss() {
      return this.item.children && this.item.children.length
    }
  },
  methods: {
    toggle() {
      if (this.isBoss) {
        this.isOpen = !this.isOpen
      }
    },
  }
}
</script>

<style lang="scss">
.u-table-row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  td::first-letter {
    text-transform: uppercase;
  }

  &__subrow {
    width: 100%;
  }
}

.boss:hover {
  cursor: pointer;
}

td {
  width: 50%;
  padding: rem(20);
  color: $accent-color-four;
  font-size: rem(20);

  &:not(:last-of-type) {
    border-right: $border-width-2x solid $accent-color-four;
  }
}

tr:not(:last-child) td {
  border-bottom: $border-width-2x solid $accent-color-four;
}
</style>
