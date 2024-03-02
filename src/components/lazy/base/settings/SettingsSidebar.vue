<template>
  <div class="left-sidebar">
    <RouterLink to="/settings" class="left-sidebar__item">
      <div class="i-heroicons-outline:users text-primary text-xl me-4"></div>
      <p>{{ $t('settings.edit_my_profile') }}</p>
    </RouterLink>
    <RouterLink to="/settings/manage-interests" class="left-sidebar__item">
      <div class="i-heroicons-outline:star text-primary text-xl me-4"></div>
      <p>{{ $t('settings.manage_interests') }}</p>
    </RouterLink>
    <RouterLink class="left-sidebar__item" to="/settings/settings">
      <div class="i-heroicons-outline:cog text-primary text-xl me-4"></div>
      <p>{{ $t('settings.title') }}</p>
    </RouterLink>
    <RouterLink class="left-sidebar__item" to="/settings/muted-people">
      <div class="i-heroicons-outline:volume-off text-primary text-xl me-4"></div>
      <p>{{ $t('settings.muted_title') }}</p>
    </RouterLink>
    <RouterLink class="left-sidebar__item" to="/settings/blocked-people">
      <div class="i-heroicons-outline:x-circle text-primary text-xl me-4"></div>
      <p>{{ $t('settings.blocked_title') }}</p>
    </RouterLink>
    <RouterLink class="left-sidebar__item" to="/settings/invite-friends">
      <div class="i-heroicons-outline:user-add text-primary text-xl me-4"></div>
      <p>{{ $t('settings.invite_friends') }}</p>
    </RouterLink>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.left-sidebar {
  --at-apply: 'card-defaults p-4 min-w-64 max-h-300px';
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
  }
}
</style>
