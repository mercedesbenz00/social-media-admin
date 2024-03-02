<template>
  <PPaginator
      class="paginator max-w-[672px] mx-auto"
      ref="paginator"
      v-model:first="first"
      :rows="pageSize"
      :totalRecords="totalRecords"
      @page="onPage($event)"
      template="PageLinks"
    >
      <template #start>
        <div @click="onPrev" class="flex items-center cursor-pointer">
          <div class="i-figma:chevron-left me-2 w-4 h-4"></div>
          <div>{{ $t('previous') }}</div>
        </div>
      </template>
      <template #end>
        <div @click="onNext" class="flex items-center cursor-pointer">
          <div>{{ $t('next') }}</div>
          <div class="i-figma:chevron-right ms-2 w-4 h-4"></div>
        </div>
      </template>
  </PPaginator>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
const route = useRoute()
const router = useRouter()
const first = ref(0)
const perPage = ref(10)
const currentPage = ref(0)
const paginator = ref()

const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  }
})
const emit = defineEmits(['fetch'])

const totalRecords = computed(() => props.data.totalElements ?? 0 )
const pageSize = computed(() => props.data.pageable?.pageSize ?? 0)
const onPrev = (e) => { paginator.value.changePageToPrev(e) }
const onNext = (e) => { paginator.value.changePageToNext(e) }
const onPage = ($event) => {
  const { page } = $event
  const query = { page }
  const { path } = route
  page > 0 ? router.push({ path, query }) : router.push({ path })
  currentPage.value = page
}

watch(currentPage, () => {
  emit('fetch', {
    sort: 'createdAt,asc',
    page: currentPage.value ? currentPage.value : null,
    size: perPage.value
  })
})

onMounted(() => {
  const { page } = route.query
  if (page) {
    first.value = Number(page) * perPage.value
    currentPage.value = Number(page)
    return
  } else currentPage.value = 0
})
</script>
