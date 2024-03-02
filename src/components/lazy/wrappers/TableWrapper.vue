<template>
  <div>
    <div class="flex items-center justify-between">
       <div class="flex items-center">
        <div class="title text-4xl font-bold text-primary my-4">{{ title }}</div>
        <div v-if="subtitle" class="flex items-center">
          <PDivider layout="vertical" />
          <div class="text-sm text-text-primary-light">{{ subtitle }}</div>
        </div>
       </div>
       <div class="flex items-center space-x-4">
        <FilterComponent v-if="showFilter" @on-filter="filter"/>
        <PButton v-if="btnLabel" icon="i-figma:plus" class="min-h-[32px] h-[32px] text-sm" :label="btnLabel" @click="emits('btn-click')"></PButton>
        <SearchInput
          :search-placeholder="searchPlaceholder"
          @search="search($event)"
        />
       </div>
    </div>
      <TableWrapperSkeleton v-if="loading" :columns="columnsData"></TableWrapperSkeleton>
      <div v-else>
        <div v-if="data.content && data.content.length > 0">
          <PDataTable
            class="px-6 pb-6 pt-2 primary-shadow rounded-2xl"
            :value="data.content"
            dataKey="id"
            responsiveLayout="scroll"
            v-model:selection="selected"
            :selectionMode="selection ? 'single' : null"
          >
            <PColumn v-for="(col, index) in columnsData" :key="index" :class="col.class">
              <template #header>
                <div v-if="col.sortable" @click="sort(col)" class="flex items-center cursor-pointer">
                  <div>{{ $t(col.header) }}</div>
                  <div
                    class="i-figma:swap-vertical text-text-secondary-light w-4 h-4 me-2"
                    :class="col.sorted ? 'bg-primary' : ''"
                  >
                  </div>
                </div>
                <div v-else>{{ $t(col.header) }}</div>
              </template>
              <template #body="slotProps">
                <TableCell @refresh="refresh" :state="state" :data="slotProps" :column="col" />
              </template>
            </PColumn>
          </PDataTable>
        </div>
        <div v-else>
          <EmptyState :title="emptyTitle" :subtitle="emptySubtitle" :icon="emptyIcon"></EmptyState>
        </div>
      </div>
      <Paginator v-if="isPaginator" :data="data" @fetch="fetch($event)"></Paginator>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { IColumn } from '@/data/column/column.interface'
import { useGroupsStore } from '@/data/groups/groups.store'
import { useCategoriesStore } from '@/data/categories/categories.store'
import { usePersonsStore } from '@/data/persons/persons.store'
import moment from 'moment/min/moment-with-locales'
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const $groups = useGroupsStore()
const $categories = useCategoriesStore()
const $persons = usePersonsStore()
const selected = ref()
const rows = ref(10)
const isPaginator = computed(() => data.value.totalElements > rows.value)
const emits = defineEmits(['sort', 'search', 'btn-click', 'selected'])
const props = defineProps({
  columns: {
    type: Array as PropType<IColumn[]>,
    required: false,
    default: undefined,
  },
  title: {
    type: String,
    required: false,
    default: ''
  },
  subtitle: {
    type: String,
    required: false,
    default: ''
  },
  searchPlaceholder: {
    type: String,
    required: false,
    default: ''
  },
  emptyTitle: {
    type: String,
    required: false,
    default: undefined
  },
  emptySubtitle: {
    type: String,
    required: false,
    default: undefined
  },
  emptyIcon: {
    type: String,
    required: false,
    default: undefined
  },
  btnLabel: {
    type: String,
    required: false,
    default: undefined
  },
  state: {
    type: String,
    required: true
  },
  params: {
    type: Object as PropType<any>,
    required: false,
    default: {
      sort: 'createdAt,asc',
      size: 10,
    }
  },
  showFilter: {
    type: Boolean,
    required: false,
    default: false
  },
  selection: {
    type: Boolean,
    required: false,
    default: false
  }
})

const data = computed(() => {
  switch (props.state) {
    case 'groups': return $groups.groups
    case 'categories': return $categories.categories
    case 'persons': return $persons.persons
    case 'bannedPersons': return $persons.bannedPersons
    case 'reportedUsers': return $persons.reportedUsers
    case 'complaints': return $persons.complaints
  }
})
const columnsData = ref(props.columns || [] as IColumn[])

const refresh = () => {
  const { page } = route.query
  fetch({ page })
}
const fetch = async (params = {}) => {
  loading.value = true
    switch (props.state) {
      case 'groups':
        await $groups.getGroups({ ...params, ...props.params, ...filterParams })
        break
      case 'categories':
        await $categories.getCategories({...params, ...props.params, ...filterParams })
        break
      case 'persons':
        await $persons.getPersons({...params, ...props.params, ...filterParams})
        break
      case 'bannedPersons':
        await $persons.getBannedPersons({...params, ...props.params, ...filterParams})
        break
      case 'reportedUsers':
        await $persons.getReportedUsers({ ...params, ...props.params, ...filterParams })
        break
      case 'complaints':
        await $persons.getComplaints({ ...params, ...props.params, ...{ personIds: Number(route.params.id) }, ...filterParams })
        break
  }
  loading.value = false
}
const search = (text: any) => {
  fetch({
    query: text
  })
}
interface IFilter {
  personStatus: 'Any | Active | Banned',
  fromDate: string,
  toDate: string
}
const filterParams = reactive({
  personStatus: 'ANY',
  fromDate: '',
  toDate: ''
})
const filter = (filter: IFilter) => {
  filterParams.personStatus = filter.personStatus.toUpperCase()
  if (filter.fromDate && filter.toDate) {
    filterParams.fromDate = moment(filter.fromDate).format('YYYY-MM-DD'),
    filterParams.toDate = moment(filter.toDate).format('YYYY-MM-DD')
  } else {
    const today = new Date()
    filterParams.fromDate = moment(today).format('YYYY-MM-DD')
    filterParams.toDate = moment(new Date(new Date().setDate(today.getDate() - 30))).format('YYYY-MM-DD')
  }
  fetch()
}
const sort = (column: IColumn) => {
  columnsData.value.forEach((column: IColumn) => { column.sorted = false })
  column.sorted = true
  emits('sort', column)
}

watch(selected, () => {
  emits('selected', selected.value)
})

onMounted(() => {
  // remove router params / query if no active filters
 if ((!filterParams.fromDate || !filterParams.toDate) && props.showFilter) {
  router.replace({ 'query': undefined, 'params': undefined })
  fetch()
  return
 }
 const { page } = route.query
 fetch({ page })
})
</script>
<style scoped lang="scss">
 :deep(.p-datatable) {
  & .p-datatable-thead {
    & > tr {
      & > th {
        --at-apply: 'text-primary text-sm';
      }
    }
  }
  & .p-datatable-tbody {
    & > tr {
      & > td {
        --at-apply: 'py-3';
      }
    }
  }
 }
</style>