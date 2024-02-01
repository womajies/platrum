<template>
  <transition name="modal-fade">
    <div v-if="isOpened" class="modal" :class="modalClasses" @mousedown="handleMouseDownContainer" @click.stop>
      <div class="modal__wrapper">
        <component :is="form ? 'UForm' : 'div'" :class="modalSize" class="modal__body">
          <UButton class="modal__close" type="button" @click="close">
            <template v-slot:prepend>
              <slot name="close">
                <UIcon class="modal__close-icon" name="close" />
              </slot>
            </template>
          </UButton>

          <slot name="header"></slot>

          <slot></slot>
        </component>
      </div>
    </div>
  </transition>
</template>

<script>
import UButton from '@/components/ui/UButton.vue'
import UIcon from '@/components/ui/UIcon.vue'
import UForm from '@/components/ui/form/UForm.vue'

export default {
  name: 'UModal',

  components: { UButton, UIcon, UForm },

  props: {
    size: {
      type: String,
      default: 'small',
      validator: (v) => ['small', 'medium', 'large'].includes(v),
    },

    form: Boolean,

    customHeight: {
      type: Number,
      default: null,
    },
    customWidth: {
      type: Number,
      default: null,
    },
    maxHeight: {
      type: Number,
      default: null,
    },
  },

  emits: ['before-close'],

  data() {
    return {
      isOpened: false,
    }
  },

  computed: {
    modalClasses() {
      return {
        active: this.isOpened,
      }
    },

    modalSize() {
      return `modal__body--${this.size}`
    }
  },

  created() {
    this.show()
  },

  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
  },

  beforeUnmount() {
    this.close()
    document.removeEventListener('keydown', this.handleKeyDown);
  },

  methods: {
    handleKeyDown(e) {
      if (e.keyCode === 27) this.close();
    },

    handleMouseDownContainer(event) {
      if (event.target.classList.contains('modal') || event.target.classList.contains('modal__wrapper')) {
        this.close()
      }
    },

    show() {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
      // this.$emit('before-open', this.$props)
      this.isOpened = true
    },

    close() {
      document.body.style.overflow = ''
      document.body.style.height = '100%'
      this.$emit('before-close')
      this.isOpened = false
    },
  },
};
</script>
<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  // display: none;
  overflow: auto;
  padding-top: rem(20);
  background-color: rgba($accent-color, 0.5);

  @include on-breakpoint('md') {
    padding: rem(20);
    background-color: rgba($accent-color, 0.85);
  }

  &.active {
    display: flex;
    align-items: center;
  }

  &__wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 5px;
    overflow: hidden auto;

    @include on-breakpoint('md') {
      width: calc(100% + 4px);
      align-items: center;
      justify-content: center;
    }
  }

  &__body {
    position: relative;
    display: grid;
    gap: rem(14);
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 100%;
    padding: rem(30) rem(20);
    margin: auto 0 0 0;
    // overflow-x: hidden;
    background-color: $accent-color;
    border-radius: $border-radius-modal $border-radius-modal 0 0;

    @include on-breakpoint('md') {
      gap: rem(18);
      width: 100%;
      max-width: rem(600);
      padding: rem(50) rem(20);
      margin: auto;
      border-radius: $border-radius-modal;
    }

    &::before {
      content: '';
      position: absolute;
      top: -2px;
      right: -2px;
      bottom: 0;
      left: -2px;
      z-index: -1;
      border-radius: $border-radius-modal $border-radius-modal 0 0;
      background: linear-gradient(90deg,
          #c9b075 0%,
          #fff 32.05%,
          #d3c8b1 57.29%,
          #b09d62 100%);

      @include on-breakpoint('md') {
        bottom: -2px;
        border-radius: $border-radius-modal;
      }
    }
  }

  &__title {
    margin-bottom: rem(6);
    font-size: rem(28);
    line-height: 130%;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    color: $accent-color-four;

    @include on-breakpoint('md') {
      font-size: rem(40);
    }
  }

  &__text {
    font-size: rem(16);
    font-weight: 400;
    line-height: 140%;
    text-align: center;
    color: $white-color;

    @include on-breakpoint('md') {
      font-size: rem(18);
    }

    a {
      text-decoration: underline;
      transition: color $transition-duration $transition-timing-function;

      &:hover {
        color: $accent-color;
      }
    }
  }

  .modal__close {
    position: absolute;
    top: rem(10);
    right: rem(10);
    padding: rem(10);

    @include on-breakpoint('md') {
      top: rem(20);
      right: rem(20);
    }

    &:hover {
      color: $white-color;
    }

    &-icon {
      width: rem(12) !important;
      height: rem(12) !important;

      @include on-breakpoint('md') {
        width: rem(22) !important;
        height: rem(22) !important;
      }
    }
  }
}
</style>
