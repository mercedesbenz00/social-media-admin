<template>
  <div class="card-defaults p-4">
    <h3 class="font-bold text-lg text-text-primary mb-4 ms-4">{{ $t('update_password.title') }}</h3>
    <form>
      <InputField :label="$t('update_password.old_password')" :errors="v$.oldPassword.$errors">
        <p-password
          v-model="form.oldPassword"
          :feedback="false"
          :placeholder="$t('update_password.enter_current_password')"
          @blur="v$.oldPassword.$touch"
        ></p-password>
      </InputField>
      <p class="py-4 text-sm text-text-secondary-light ms-4">
        {{ $t('update_password.new_password_notif') }}
      </p>
      <InputField :label="$t('update_password.new_password')" :errors="v$.password.$errors">
        <p-password
          v-model="form.password"
          :placeholder="$t('update_password.enter_new_password')"
          @blur="v$.password.$touch"
          :promptLabel="$t('update_password.enter_new_password')"
          :weakLabel="$t('auth.password_weak')"
          :mediumLabel="$t('auth.password_medium')"
          :strongLabel="$t('auth.password_strong')"
        ></p-password>
      </InputField>
      <InputField :label="$t('update_password.confirm_new_password')" :errors="v$.confirmPassword.$errors">
        <p-password
          v-model="form.confirmPassword"
          :feedback="false"
          :placeholder="$t('update_password.re_enter_password')"
          @blur="v$.confirmPassword.$touch"
        ></p-password>
      </InputField>
    </form>
    <div class="mt-6">
      <hr class="border-gray-300 mb-4" />
      <PButton
        :loading="loading"
        :disabled="v$.$invalid"
        @click="updatePassword"
        class="p-button-primary px-8"
        :label="$t('update_password.title')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { required, minLength, match } from '@/utils/validators.utils'
import { useVuelidate } from '@vuelidate/core'
import { helpers, sameAs } from '@vuelidate/validators'
import { usePersonsStore } from '@/data/persons/persons.store'

const { t } = useI18n()

const form = ref({
  oldPassword: '',
  password: '',
  confirmPassword: '',
})

const newPassword = computed(() => form.value.password)

const rules = {
  oldPassword: {
    required,
  },
  password: {
    required,
    minLength: minLength(6),
    match: match(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})./),
  },
  confirmPassword: {
    required,
    samAs: helpers.withMessage(t('update_password.not_match'), sameAs(newPassword)),
  },
}

const v$ = useVuelidate(rules, form, { $autoDirty: true })

const loading = ref(false)

const updatePassword = async () => {
  loading.value = true
  await usePersonsStore().changePassword(form.value)
  loading.value = false
}
</script>
<style scoped lang="scss">
:deep(.label){
  --at-apply: 'my-auto h-8 ps-2 font-semibold'
}
</style>