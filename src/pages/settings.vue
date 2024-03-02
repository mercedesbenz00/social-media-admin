<template>
  <PageWrapper>
    <div class="w-full flex flex-col flex-1">
      <div class="mb-4 font-bold text-3xl flex justify-between px-8">
        <span>{{ $t('edit_profile.title') }}</span>
      </div>
      <p
        v-if="me"
        class="pb-4 text-sm text-text-secondary-light ps-8"
        v-html="$t('edit_profile.subtitle', {email: me.email, username: me.username})"
      >
      </p>
      <EditProfile></EditProfile>
      <UpdatePassword class="mt-8"></UpdatePassword>
    </div>
  </PageWrapper>
</template>
<script setup lang="ts">
import {useAuthStore} from "@/data/auth/auth.store";

const me = computed(() => useAuthStore().user)
</script>
