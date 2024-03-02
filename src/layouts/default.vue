<template>
  <div class="flex flex-none min-h-screen w-full">
    <HeaderComponent />
    <div class="flex-none w-[240px] z-10 bg-bg-primary fixed top-12 primary-shadow sidebar">
      <PMenu class="sidebar-menu px-6" :model="items" />
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/data/auth/auth.store'
const { t } = useI18n()
const isTrue = ref(true)
const items = computed(() => [
  {
    label: t('sidebar.home'),
    items: [
      {
        label: t('sidebar.dashboard'),
        icon: 'i-figma:sliders',
        to: '/',
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: t('sidebar.management'),
    items: [
      {
        label: t('sidebar.categories'),
        icon: 'i-figma:grid',
        to: '/categories',
      },
      {
        label: t('sidebar.groups'),
        icon: 'i-figma:users',
        to: '/groups',
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: t('sidebar.users'),
    items: [
      {
        label: t('sidebar.reported_users'),
        icon: 'i-figma:user-check',
        to: '/reported-users'
      },
      {
        label: t('sidebar.banned_users'),
        icon: 'i-figma:user-x',
        to: '/banned-users',
      },
      {
        label: t('sidebar.verified_users'),
        icon: 'i-figma:user-check',
        to: '/verify-users',
      },
    ],
  },
])
</script>

<style scoped lang="scss">
.sidebar{
  height: calc(100vh - 3rem);
  -webkit-box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.25);
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.25);
}
:deep(.bell-btn) {
  --at-apply: 'h-12 w-12 btn-flat-primary !rounded-full  !bg-bg-secondary-dark relative overflow-visible';

  .p-badge {
    --at-apply: 'w-4 h-4 !absolute !-bottom-.5 !-right-.5 bg-error text-white';
  }
}
:deep(.sidebar-menu) {
  --at-apply: 'w-full border-none text-text-primary';
  a {
    --at-apply: 'w-full text-sm flex flex-none items-center rounded-lg my-6';
    &.router-link-active {
      --at-apply: 'text-text-secondary bg-primary/80 px-4 py-3';
      .p-menuitem{
        &-icon{
          --at-apply: 'text-text-secondary/80';
        }
        &-text{
          --at-apply: 'text-text-secondary/80';
        }
      }
    }
    .p-menuitem-icon {
      --at-apply: 'text-xl text-text-primary/50';
    }
  }

  .p-menu{
    &-separator {
      --at-apply: 'mt-6 mb-4'
    }
  }

  .p-menuitem{
    --at-apply: 'rounded-lg';
    &-icon{
       --at-apply: 'text-text-primary w-5 h-5';
    }
    &-text{
      --at-apply: 'text-text-primary'
    }
  }
  .p-submenu-header {
    --at-apply: 'text-text-primary bg-transparent font-bold text-sm p-0';
    &:first-child{
      --at-apply: 'mt-4'
    }
  }
  .p-menuitem-text{
    --at-apply: 'text-text-primary/80 text-sm font-normal'
  }
}
</style>
