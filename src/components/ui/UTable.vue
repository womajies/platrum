<template>
  <table class="table">
    <thead>
      <tr align="left">
        <th @click="sortByName">
          Имя
          <span class="caret-wrapper">
            <i :class="{active: order === 'ascending' && prop === 'name'}" class="sort-caret ascending" @click.stop="sortByNameAscending"></i>
            <i :class="{active: order === 'descending' && prop === 'name'}" class="sort-caret descending" @click.stop="sortByNameDescending"></i>
          </span>
        </th>
        <th @click="sortByPhone">
          Телефон
          <span class="caret-wrapper">
            <i :class="{active: order === 'ascending' && prop === 'phone'}" class="sort-caret ascending" @click.stop="sortByPhoneAscending"></i>
            <i :class="{active: order === 'descending' && prop === 'phone'}" class="sort-caret descending" @click.stop="sortByPhoneDescending"></i>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <UTableRow v-for="user in getUsers" :key="user.id" :item="user"></UTableRow>
      <tr v-if="getUsers.length === 0">
        <td colspan="2">Нет данных...<br><br>Добавьте пользователя</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import UTableRow from '@/components/ui/UTableRow'
import { mapGetters } from 'vuex'

export default {
  name: "UTable",

  components: { UTableRow },

  emits: ['sort-change'],

  data () {
    return {
      order: null,
      prop: null
    }
  },

  computed: {
    ...mapGetters(['getUsers'])
  },

  methods: {
    sortByName() {
      if (this.order === 'ascending') {
        this.order = 'descending'
      } else if (this.order === 'descending') {
        this.order = null
      } else {
        this.order = 'ascending'
      }
      this.prop = 'name'
      this.$emit('sort-change', { prop: this.prop, order: this.order })
    },
    sortByPhone() {
      if (this.order === 'ascending') {
        this.order = 'descending'
      } else if (this.order === 'descending') {
        this.order = null
      } else {
        this.order = 'ascending'
      }
      this.prop = 'phone'
      this.$emit('sort-change', { prop: this.prop, order: this.order })
    },
    sortByNameAscending() {
      this.order = 'ascending'
      this.prop = 'name'
      this.$emit('sort-change', { prop: this.prop, order: this.order })
    },
    sortByNameDescending() {
      this.order = 'descending'
      this.prop = 'name'
      this.$emit('sort-change', { prop: this.prop, order: this.order })
    },
    sortByPhoneAscending() {
      this.order = 'ascending'
      this.prop = 'phone'
      this.$emit('sort-change', { prop: this.prop, order: this.order })
    },
    sortByPhoneDescending() {
      this.order = 'descending'
      this.prop = 'phone'
      this.$emit('sort-change', { prop: this.prop, order: this.order })
    },
  }
};
</script>

<style lang="scss" scoped>
.table {
  max-width: rem(600);
  width: 100%;
  margin-top: rem(40);
  border: $border-width-2x solid $accent-color-four;
  border-radius: $border-radius;
  border-spacing: 0;

  tr {
    display: flex;
    width: 100%;
  }

  th {
    position: relative;
    width: 50%;
    padding: rem(20);
    color: $accent-color-four;
    font-size: rem(20);
    cursor: pointer;
    user-select: none;
    border-bottom: $border-width-2x solid $accent-color-four;

    &:not(:last-child) {
      border-right: $border-width-2x solid $accent-color-four;
    }
  }

  .caret-wrapper {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: rem(24);
    height: rem(34);
    vertical-align: middle;
    cursor: pointer;

    .sort-caret {
      width: 0;
      height: 0;
      border: rem(10) solid transparent;
      position: absolute;
      left: 7px;

      &.ascending {
        border-bottom-color: #c0c4cc;
        top: -3px;

        &.active {
          border-bottom-color: $accent-color-four;
        }
      }

      &.descending {
        border-top-color: #c0c4cc;
        bottom: -3px;

        &.active {
          border-top-color: $accent-color-four;
        }
      }
    }
  }
}
</style>
