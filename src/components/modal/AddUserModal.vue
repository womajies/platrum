<template>
  <UModal class="add-user-modal" form @submit="submitAddUserForm">
    <template v-slot:header>
      <h2 class="modal__title">Добавление пользователя</h2>
    </template>

    <UFormInput v-model="form.name" label="Имя" name="name" :error="errors.name" @input="errors.name = ''" />

    <UFormInput v-model="form.phone" label="Телефон" name="phone" :error="errors.phone" type="tel"
      v-mask="'+7(###)-###-##-##'" @input="errors.phone = ''" />

    <UFormSelect v-model="form.boss" :options="getUsersWithChildren" :error="errors.boss"
      @input="errors.boss = ''" />

    <UButton type="submit" variant="primary" :disabled="!isValid" :loading="isLoading">Сохранить</UButton>
  </UModal>
</template>

<script>
import UModal from '@/components/ui/UModal';
import UButton from '@/components/ui/UButton';
import UFormInput from '@/components/ui/form/UFormInput';
import UFormSelect from '@/components/ui/form/UFormSelect';
import { mapGetters } from 'vuex';
import { nanoid } from 'nanoid'

export default {
  name: 'AddUserModal',

  components: {
    UModal,
    UButton,
    UFormInput,
    UFormSelect
  },

  data() {
    return {
      isValid: false,
      isLoading: false,
      form: {
        id: '',
        name: '',
        phone: '',
        boss: null,
      },
      errors: {
        name: '',
        phone: '',
        boss: null,
      },
    }
  },

  emits: ['add-user'],

  watch: {
    form: {
      handler(newValue) {
        if (newValue.name?.length >= 3 && newValue.phone?.length === 17) {
          this.isValid = true
        } else {
          this.isValid = false
        }
      },
      deep: true
    }
  },

  methods: {
    async submitAddUserForm() {
      try {
        this.isLoading = true;

        const user = {
          id: nanoid(),
          name: this.form.name,
          phone: this.form.phone,
          boss: this.form.boss,
          children: []
        }

        if (this.form.name?.length >= 3 && this.form.phone?.length > 1) {
          this.isValid = true
        }

        // just fake request for show loading effect
        await fetch('https://dummyjson.com/users/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        })
          .then(async (response) => {
            if (response.ok) {
              // await response.json();

              this.$store.dispatch('addUser', user)
              this.$emit('add-user');
            } else {
              this.isValid = false;

              for (let key in response.data?.error) {
                this.errors[key] = response.data?.error[key][0];
              }

              console.error(response.statusText);
            }
          })
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  },

  computed: {
    ...mapGetters(['getUsersWithChildren'])
  }
}
</script>
