<template>
  <div class="select" :class="classes">
    <button type="button" class="select__header" :style="options.length === 0 ? { cursor: 'not-allowed' } : ''"
      :disabled="options.length === 0" @focus="handleFocus" @blur="handleBlur" @click="toggleOptions">
      <div class="selected__option">
        {{ selectedOptionName || 'Начальник' }}
      </div>
      <div class="select__icon">
        <img :class="{ 'rotate-180': showOptions }" src="@/assets/images/arrow-down.svg" alt="Arrow down">
      </div>
    </button>
    <transition name="fade">
      <div class="select__options" v-show="showOptions">
        <button v-for="option in options" :key="option.id" class="select__option"
          :class="{ 'select__option--active': option.id === selectedOptionType }" type="button"
          @click="selectOption(option.id)">
          {{ option.name }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "UFormSelect",

  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    error: {
      type: String,
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      showOptions: false,
      isFocus: false,
    };
  },

  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside);
  },

  computed: {
    selectedOptionName() {
      let option;
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].id === this.modelValue) {
          option = this.options[i].name;
        }
        continue;
      }
      return option;
    },

    selectedOptionType() {
      return this.modelValue
    },

    classes() {
      return {
        'select--focus': this.isFocus,
        'select--error': this.error,
        'select--placeholder': !this.selectedOptionName,
      }
    },
  },

  methods: {
    handleKeyDown(e) {
      if (e.keyCode === 27) this.showOptions = false;
    },

    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showOptions = false;
      }
    },

    toggleOptions() {
      this.showOptions = !this.showOptions;
    },

    selectOption(option) {
      this.$emit('update:modelValue', option);
      this.showOptions = false;
    },

    handleFocus() {
      this.isFocus = true;
    },

    handleBlur() {
      this.isFocus = false
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  display: inline-block;
  max-width: rem(400);
  width: 100%;
  background-color: $accent-color-two;
  color: $accent-color-four;
  border-radius: $border-radius-btn;
  border: $border-width-2x solid $accent-color-four;
  transition: border-color $transition-timing-function $transition-duration;

  @include on-breakpoint('md') {
    max-width: none;
    width: rem(400);
  }

  &:hover {
    border: $border-width-2x solid $btn-focus-color;
  }

  &.select--focus {
    border: $border-width-2x solid $btn-focus-color;
  }

  &.select--placeholder {
    .selected__option {
      font-size: rem(14);
      line-height: rem(16);
      font-weight: 400;
      color: rgba($accent-color-four, 0.5);

      @include on-breakpoint('md') {
        font-size: rem(16);
        line-height: rem(18);
      }
    }
  }

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: rem(52);
    padding: rem(10) rem(12) rem(10) rem(16);
    cursor: pointer;

    @include on-breakpoint('md') {
      min-height: rem(60);
      padding: rem(10) rem(16) rem(10) rem(20);
    }
  }

  .selected__option {
    font-size: rem(16);
    line-height: normal;
    font-weight: 400;
    color: $accent-color-four;

    @include on-breakpoint('md') {
      font-size: rem(20);
    }

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__options {
    position: absolute;
    z-index: 10;
    top: calc(100% + 9px);
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    background-color: $accent-color-two;
    outline: $border-width-2x solid $accent-color-four;
    border-radius: $border-radius-btn;
  }

  &__option {
    width: 100%;
    padding: rem(8) rem(16);
    font-size: rem(16);
    line-height: normal;
    font-weight: 400;
    text-align: left;
    color: $accent-color-four;
    border: $border-width solid $accent-color-four;
    transition: border-color $transition-duration $transition-timing-function;

    @include on-breakpoint('md') {
      padding: rem(10) rem(18);
      font-size: rem(20);
    }


    &:hover:not(.select__option--active),
    &:focus:not(.select__option--active) {
      border-color: $btn-focus-color;
    }

    &:first-child {
      border-top-left-radius: $border-radius-btn;
      border-top-right-radius: $border-radius-btn;
    }

    &:last-child {
      border-bottom-left-radius: $border-radius-btn;
      border-bottom-right-radius: $border-radius-btn;
    }

    &::first-letter {
      text-transform: uppercase;
    }

    &--active {
      background-color: $accent-color-two;
      cursor: not-allowed;
    }
  }

  &__icon {
    width: rem(10);
    height: rem(7);
    margin-left: rem(10);

    @include on-breakpoint('md') {
      width: rem(14);
      height: rem(9);
    }

    img {
      transition: transform $transition-duration $transition-timing-function;
    }
  }

  .rotate-180 {
    transform: rotate(180deg);
  }
}
</style>