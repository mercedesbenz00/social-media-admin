<template>
  <div class="flex items-center" @click="openSettingsOverlay">
    <PAvatar :image="userAvatar" class="!w-40px !h-40px" shape="circle"></PAvatar>
    <div class="text-2xl text-primary" :class="settingDropdownIcon"></div>
  </div>
  <POverlayPanel
    ref="settingPanel"
    @hide="overlayOpened = false"
    @show="overlayOpened = true"
    @mouseleave="hideOverlay"
    class="setting-p-overlay"
  >
    <div class="settings">
      <div class="settings__header">
        <PAvatar :image="userAvatar" shape="circle" class="me-4"></PAvatar>
        <div class="settings__user">
          <h3>{{ user?.firstName }} {{ user?.lastName }}</h3>
          <p>{{ user?.username }}</p>
        </div>
      </div>
      <PDivider></PDivider>
      <div class="settings__items">
        <div @click="router.push('/settings')">
          <div class="i-heroicons-outline:cog text-primary text-xl me-4"></div>
          <p>{{ $t('profile_dropdown.settings') }}</p>
        </div>
      </div>
      <PDivider></PDivider>
      <div class="settings__items">
        <div>
          <div class="flex">
            <PRadioButton class="me-4" id="en" name="language" value="en" v-model="language" />
            <label class="text-xs cursor-pointer" for="en">{{ $t('en') }}</label>
          </div>
        </div>
        <div>
          <div class="flex cursor-pointer">
            <PRadioButton class="me-4" id="ar" name="language" value="ar" v-model="language" />
            <label class="text-xs cursor-pointer" for="ar">{{ $t('ar') }}</label>
          </div>
        </div>
        <div>
          <div class="flex cursor-pointer">
            <PRadioButton class="me-4" id="kur" name="language" value="kur" v-model="language" />
            <label class="text-xs cursor-pointer" for="kur">{{ $t('kur') }}</label>
          </div>
        </div>
      </div>
      <PDivider></PDivider>
      <div class="settings__items">
        <div>
          <div class="flex">
            <PRadioButton class="me-4" id="light" name="themeMode" value="light" v-model="themeMode" />
            <label class="text-xs cursor-pointer" for="light">{{ $t('profile_dropdown.light') }}</label>
          </div>
        </div>
        <div>
          <div class="flex cursor-pointer">
            <PRadioButton class="me-4" id="dark" name="themeMode" value="dark" v-model="themeMode" />
            <label class="text-xs cursor-pointer" for="dark">{{ $t('profile_dropdown.dark') }}</label>
          </div>
        </div>
      </div>
      <PDivider></PDivider>
      <div class="settings__items">
        <div @click="logout">
          <div class="i-figma:log-out text-primary text-xl me-4"></div>
          <p>{{ $t('profile_dropdown.log_out') }}</p>
        </div>
      </div>
    </div>
  </POverlayPanel>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/data/auth/auth.store'
import { useTheme } from '@/composables/useTheme'
import type { IAuthUser } from '@/data/auth/auth.interface'
const { locale } = useI18n({ useScope: 'global' })

const theme = useTheme()
const settingPanel = ref()
const language = ref(locale.value)
const themeMode = ref(theme.mode)

const userAvatar = computed(() => useAuthStore().getUserAvatar())
const user = computed<IAuthUser>(() => useAuthStore().user as IAuthUser)

const settingDropdownIcon = computed(() => {
  return overlayOpened.value ? 'i-heroicons-outline:chevron-up' : 'i-heroicons-outline:chevron-down'
})

const overlayOpened = ref(false)

const router = useRouter()

const hideOverlay = () => {
  settingPanel.value.hide()
}

function openSettingsOverlay(event) {
  settingPanel.value.show(event, event.target)
}

function changeLanguage() {
  locale.value = language.value
}

function changeThemeMode() {
  theme.change(themeMode.value)
}

watch(language, changeLanguage)

watch(themeMode, changeThemeMode)

function logout() {
  useAuthStore().logout()
}
</script>

<style lang="scss" scoped>
.setting-p-overlay {
  --at-apply: 'card-defaults';
}

.settings {
  --at-apply: 'card-defaults min-w-48 p-4';
  &__header {
    display: flex;
  }

  &__user {
    h3 {
      --at-apply: ' font-semibold text-base mb-1 ';
    }
    p {
      --at-apply: 'text-text-primary-light/60 text-xs ';
    }
    a {
      --at-apply: 'text-primary text-xs';
    }
  }

  &__items {
    & > div {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
      & > {
        p {
          --at-apply: 'text-xs';
        }
      }
    }
  }
}
</style>
