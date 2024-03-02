<template>
  <BaseRenderlessModal :title="editMode ? $t('categories.modal.edit') : $t('categories.modal.create')">
    <div class="p-6 flex flex-col lg:space-y-3 2xl:space-y-6">
      <InputField :label="$t('categories.modal.name')" :errors="v$.name.$errors">
        <p-input-text
          id="name"
          v-model="form.name"
          :placeholder="$t('categories.modal.placeholder.name')"
          @blur="v$.name.$touch"
        >
        </p-input-text>
      </InputField>
      <InputField :label="$t('categories.modal.type')" :errors="v$.type.$errors">
        <p-dropdown
          v-model="form.type"
          optionLabel="label"
          optionValue="value"
          :options="permissions"
          :placeholder="$t('categories.modal.placeholder.type')"
          @blur="v$.type.$touch"
          :emptyMessage="$t('no_options')"
        />
      </InputField>
      <InputField v-if="isChild" :label="$t('categories.modal.root')" :errors="v$.parentCategoryId.$errors">
        <p-dropdown
          v-model="form.parentCategoryId"
          :filter="true"
          :options="parentCategories"
          optionLabel="name"
          optionValue="id"
          :placeholder="$t('categories.modal.placeholder.root')"
          @blur="v$.parentCategoryId.$touch"
          :emptyMessage="$t('no_options')"
        />
      </InputField>
      <div class="flex items-center" :class="editMode ? 'justify-between' : 'justify-end'">
        <div class="me-4" v-if="editMode">
          <PButton @click="remove" class="btn-outlined-error" :label="$t('categories.modal.remove')"></PButton>
        </div>
        <div class="flex items-center space-x-2">
           <PButton :disabled="v$.$invalid || !v$.$anyDirty" @click="editMode ? edit() : create()" class="btn-primary" :label="editMode ? $t('categories.modal.edit') : $t('categories.modal.create')"></PButton>
           <PButton @click="cancel" class="btn-flat-primary" :label="$t('categories.modal.cancel')"></PButton>
        </div>
      </div>
    </div>
  </BaseRenderlessModal>
</template>
<script setup lang="ts">
import { useCategoriesStore } from "@/data/categories/categories.store"
import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf } from '@/utils/validators.utils'
import type { PropType } from "vue"
import type { ICategory } from "@/data/categories/categories.interface"

const $categories = useCategoriesStore()
const props = defineProps({
  editMode: {
    type: Boolean,
    required: false,
    default: false
  },
  data: {
    type: Object as PropType<ICategory>,
    required: false
  }
})

const emit = defineEmits(['cancel', 'create', 'edit', 'remove'])
const cancel = () => {
  emit('cancel')
}
const create = () => {
  emit('create', form.value)
}

const edit = () => {
  emit('edit', form.value)
}

const remove = () => {
  emit('remove', props.data!.id)
}

const permissions = ref([
  {label: 'ROOT', value: 'ROOT'},
  {label: 'CHILD', value: 'CHILD'}
])
const form = ref({
  id: null as null | number,
  name: '' as string,
  type: '' as string,
  parentCategoryId: null as null | number
})

const isChild = computed(() => {
  return form.value.type === 'CHILD'
})
const parentCategories = ref([] as ICategory[])
const rules = computed(() => ({
  name: { required },
  type: { required },
  parentCategoryId: {
    required: requiredIf(() => {
      return isChild.value
    })
  }
}))

const getParentCategories = async () => {
  const response = await $categories.getParentCategories()
  if (response) parentCategories.value = response.content
}
const v$ = useVuelidate(rules.value, form.value, {
  $autoDirty: true,
})

onMounted(() => {
  getParentCategories()
  if (props.editMode && props.data) {
    form.value.name = props.data.name
    form.value.type = props.data.parentCategory ? 'CHILD' : 'ROOT'
    form.value.parentCategoryId = props.data.parentCategory.id ?? null
    form.value.id = props.data.id
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
</style>