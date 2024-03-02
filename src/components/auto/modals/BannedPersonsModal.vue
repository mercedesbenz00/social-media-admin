<template>
  <BaseRenderlessModal :title="$t('banned_persons.modal.title')">
    <div class="flex flex-col p-6 space-y-3">
      <InputField :label="$t('banned_persons.modal.person')" :errors="v$.personId.$errors">
        <p-dropdown
          class="ps-6 search"
          @input="onSearch($event)"
          :options="persons"
          optionLabel="displayName"
          optionValue="id"
          :editable="true"
          v-model="form.personId"
          :placeholder="$t('banned_persons.modal.placeholder.person')"
          :emptyMessage="$t('no_options')"
          :loading="loading"
        />
      </InputField>
    <InputField :label="$t('banned_persons.modal.reason')" :errors="v$.reason.$errors">
      <p-textarea
        class="rounded-3xl min-h-[180px]"
        v-model="form.reason"
        :autoResize="true"
        :placeholder="$t('banned_persons.modal.placeholder.reason')"
      >
      </p-textarea>
    </InputField>
    <InputField :label="$t('banned_persons.modal.days')" :errors="v$.days.$errors">
      <p-input-text
        v-model="form.days"
        :placeholder="$t('banned_persons.modal.placeholder.days')"
        @blur="v$.days.$touch"
      ></p-input-text>
    </InputField>
    <div class="flex justify-end items-center space-x-2">
      <PButton :disabled="v$.$invalid || !v$.$anyDirty" @click="create()" class="btn-primary" :label="$t('banned_persons.modal.create')"></PButton>
      <PButton @click="cancel" class="btn-flat-primary" :label="$t('banned_persons.modal.cancel')"></PButton>
    </div>
    </div>
  </BaseRenderlessModal>
</template>
<script setup lang="ts">
import { usePersonsStore } from "@/data/persons/persons.store"
import useVuelidate from "@vuelidate/core"
import { required, numeric, minValue } from '@/utils/validators.utils'
import { debounce } from 'lodash'
import type { PropType } from "vue"
interface IPerson {
  displayName: string,
  id: number
}
const props = defineProps({
  person: {
    type: Object as PropType<IPerson | undefined>,
    required: false,
    default: undefined
  }
})
const searchValue = ref('')
const $persons = usePersonsStore()
const persons = ref([] as IPerson[])
const loading = ref(false)

const onSearch = debounce(async (event:any) => {
  try {
    loading.value = true
    const response = await $persons.getPersons({ query: event.target.value })
  if (response) persons.value = response.content
  } finally {
    loading.value = false
  }
}, 500)

const form = ref({
  personId: null as null | number,
  reason: '' as string,
  days: 0 as any
})
const rules = computed(() => ({
  personId: { required },
  reason: { required },
  days: { required, numeric, minValue: minValue(1) }
}))

const v$ = useVuelidate(rules.value, form.value, {
  $autoDirty: true,
})

const emit = defineEmits(['cancel', 'create', 'edit', 'remove'])
const cancel = () => {
  emit('cancel')
}
const create = () => {
  form.value.days = Number(form.value.days)
  emit('create', form.value)
}

onMounted(() => {
  if (props.person) {
    persons.value = [...persons.value, ...[props.person]]
    form.value.personId = props.person.id
  }
})
</script>
<style scoped lang="scss">
:deep(h5.label){
  --at-apply: 'px-6'
}
:deep(.modal-title-wrapper){
  --at-apply: 'flex justify-center items-center'
}

:deep(.modal-wrapper){
  --at-apply: 'max-w-[560px]'
}
.search > input {
  --at-apply: 'border-none'
}
</style>