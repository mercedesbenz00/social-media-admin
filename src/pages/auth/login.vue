<template>
  <ElevatedCard :elevated="false" :title="$t('auth.login_title')" :subtitle="$t('auth.login_subtitle')">
    <div class="w-full flex flex-col flex-none h-full">
      <div class="flex flex-col flex-1 justify-center" @keyup.enter.prevent="login">
        <InputField :label="$t('auth.credentials_label')" :errors="v$.credential.$errors">
          <template #leading>
            <div class="i-figma:user text-2xl"></div>
          </template>
          <p-input-text
            id="credential"
            v-model="data.credential"
            :placeholder="$t('auth.credentials_placeholder')"
            @blur="v$.credential.$touch"
          ></p-input-text>
        </InputField>
        <InputField :label="$t('auth.password_label')" :errors="v$.password.$errors">
          <template #leading>
            <div class="i-figma:unlock text-2xl"></div>
          </template>
          <p-password
            v-model="data.password"
            toggle-mask
            :feedback="false"
            :placeholder="$t('auth.password_placeholder')"
            @blur="v$.password.$touch"
          ></p-password>
        </InputField>
      </div>
      <div class="block mt-12 space-y-4">
        <PButton
          :loading="data.loading"
          class="btn-primary login-button"
          :label="$t('auth.login_button')"
          @click="login"
        ></PButton>
      </div>
    </div>
  </ElevatedCard>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@/utils/validators.utils'
import { useAuthStore } from '@/data/auth/auth.store'
import { useMainStore } from '@/data/main.store'
import { i18n } from '@/plugins/0/i18n.plugin'

const auth = useAuthStore()
const isAdmin = computed(() => auth.isAdmin)
const router = useRouter()
const route = useRoute()

const data = reactive({
  loading: false,
  credential: '',
  password: '',
  remember: true,
})
const rules = {
  credential: {
    required,
  },
  password: {
    required,
    minLength: minLength(6),
  },
}

const v$ = useVuelidate(rules, data, {
  $autoDirty: true,
})

const login = async () => {
  if (!(await v$.value.$validate())) return
  try {
    data.loading = true
    const token = await auth.token({
      credential: data.credential,
      password: data.password,
    })
    router.push(route.query.redirect?.toString() ?? '/')
  } finally {
    data.loading = false
  }
}
</script>

<style scoped lang="scss">
.login-button {
  --at-apply: 'w-full h-12';
  --at-apply: ' flex-center-none text-lg font-semibold ';
}
</style>
