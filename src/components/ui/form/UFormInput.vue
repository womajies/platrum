<template>
  <label class="input" :class="classes">
    <input :value="modelValue" :type="type" :name="name" @input="handleInput" @focus="handleFocus" @blur="handleBlur"
      class="input__value" :placeholder="placeholder" :disabled="disabled" />
    <span v-if="label" class="input__label">{{ label }}</span>
    <span v-if="error" class="input__error">
      <span class="input__error-hint">{{ error }}</span>
      <UIcon class="input__error-icon" name="error" size="26" />
    </span>
  </label>
</template>

<script>
import UIcon from '@/components/ui/UIcon.vue'

export default {
  name: "UFormInput",

  components: { UIcon },

  props: {
    label: {
      type: String,
      raquired: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
    },
    error: {
      type: String,
    },
    modelValue: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    mask: String,
    name: String,
  },

  emits: ['update:modelValue'],

  data() {
    return {
      isErrorValidation: false,
      isSuccessValidation: false,
      isFocus: false,
    };
  },

  methods: {
    handleInput(evt) {
      this.$emit('update:modelValue', evt.target.value)
    },
    handleFocus() {
      this.isFocus = true;
    },
    handleBlur() {
      this.isFocus = false
    },
  },

  computed: {
    classes() {
      return {
        'input--error': this.error,
        'input--valid': this.isSuccessValidation,
        'input--disabled': this.disabled,
        'input--fill': this.modelValue.length || this.placeholder,
        'input--focus': this.isFocus,
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: rem(400);
  width: 100%;
  background-clip: padding-box;
  border-radius: $border-radius-btn;

  @include on-breakpoint('md') {
    max-width: none;
    width: rem(400);
  }

  &--fill {
    .input__label {
      top: rem(9);
      transform: translateY(0%);
      font-size: rem(12);
      line-height: rem(14);

      @include on-breakpoint('md') {
        font-size: rem(14);
        line-height: rem(16);
      }
    }
  }

  &--error {
    .input__value {
      padding-right: rem(34);

      @include on-breakpoint('md') {
        padding-right: rem(46);
      }
    }

    .input__error {
      &-icon {
        width: rem(18) !important;
        height: rem(18) !important;
        position: absolute;
        right: rem(10);
        top: 50%;
        transform: translateY(-50%);

        @include on-breakpoint('md') {
          width: rem(26) !important;
          height: rem(26) !important;
        }
      }

      &-hint {
        width: rem(150);
        max-width: max-content;
        position: absolute;
        z-index: 1;
        bottom: calc(100% - 0.3rem);
        right: 0;
        transform: translateX(10.5%);
        padding: rem(4) rem(8);
        font-size: rem(14);
        line-height: 120%;
        font-weight: 400;
        text-align: center;
        outline: $border-width solid $accent-color-two;
        background-color: $accent-color;
        border-radius: $border-radius-btn;
        color: $accent-color-two;

        @include on-breakpoint('md') {
          transform: translateX(calc(50% - 1.45rem));
          padding: rem(10) rem(12);
        }

        &::before {
          content: "";
          position: absolute;
          bottom: rem(-7);
          right: 23.5%;
          transform: translateX(50%);
          border-radius: 50%;
          border-top-width: rem(13);
          border-left-width: rem(13);
          border-right-width: rem(13);
          border-color: $accent-color transparent transparent transparent;

          @include on-breakpoint('md') {
            right: 50%;
          }
        }
      }
    }
  }

  &:not(.input--disabled).input--focus {
    .input__label {
      top: rem(9);
      transform: translateY(0%);
      font-size: rem(12);
      line-height: rem(14);

      @include on-breakpoint('md') {
        font-size: rem(14);
        line-height: rem(16);
      }
    }
  }

  &--disabled {
    .input__value {
      background-color: #333333;
      color: #dadada;
    }

    .input__label {
      color: rgba(#dadada, 0.5);
    }
  }

  &__value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: rem(52);
    padding: rem(25) rem(16) rem(9);
    font-size: rem(16);
    line-height: rem(18);
    font-weight: 400;
    border-radius: $border-radius-btn;
    background: $accent-color-two;
    color: $accent-color-four;
    border: $border-width-2x solid $accent-color-four;
    transition: border-color $transition-timing-function $transition-duration;

    @include on-breakpoint('md') {
      min-height: rem(60);
      padding: rem(27) rem(20) rem(9);
      font-size: rem(18);
      line-height: rem(24);
    }

    &::placeholder {
      font-size: rem(16);
      line-height: rem(18);
      font-weight: 400;
      color: $accent-color-four;

      @include on-breakpoint('md') {
        font-size: rem(18);
        line-height: rem(24);
      }
    }

    &:not(&[disabled]):hover {
      border: $border-width-2x solid $btn-focus-color;
    }

    &:not(&[disabled]):focus {
      border: $border-width-2x solid $btn-focus-color;
;
      &+.input__label {
        top: rem(9);
        transform: translateY(0%);
        font-size: rem(12);
        line-height: rem(14);

        @include on-breakpoint('md') {
          font-size: rem(14);
          line-height: rem(16);
        }
      }
    }
  }

  &__label {
    position: absolute;
    left: rem(16);
    top: 50%;
    transform: translateY(-50%);
    font-size: rem(16);
    line-height: normal;
    font-weight: 400;
    color: rgba($accent-color-three, 0.5);
    cursor: text;
    transition: transform $transition-duration $transition-timing-function, top $transition-duration $transition-timing-function, font-size $transition-duration $transition-timing-function;

    @include on-breakpoint('md') {
      left: rem(20);
      font-size: rem(18);
    }
  }
}
</style>