<template>
  <BaseRenderlessModal :title="editMode ? $t('groups.modal.edit') : $t('groups.modal.create')">
    <div class="p-6 flex flex-col lg:space-y-2 2xl:space-y-4">
      <InputField :label="$t('groups.modal.name')" :errors="v$.name.$errors">
        <p-input-text
          id="name"
          v-model="form.name"
          :placeholder="$t('groups.modal.placeholder.name')"
          @blur="v$.name.$touch"
        >
        </p-input-text>
      </InputField>
      <div>
        <InputField :label="$t('groups.modal.categories')" :errors="v$.categories.$errors">
          <p-dropdown
            id="categories"
            @change="chooseCategory($event)"
            :filter="true"
            :options="categories"
            optionLabel="name"
            :placeholder="$t('groups.modal.placeholder.categories')"
            @blur="v$.categories.$touch"
            :emptyMessage="$t('no_options')"
          />
      </InputField>
      <div class="flex items-center max-w-[408px] flex-wrap" v-if="form.categories.length > 0">
        <div @click="removeChoosedCategory(category)" class="primary-shadow flex items-center py-1 px-3 rounded-2xl cursor-pointer me-2 my-2" v-for="(category, index) in form.categories" :key="index">
          <div class="i-figma:x w-4 h-4 me-1"></div>
          <div class="text-xs">
            {{ category.name }}
          </div>
        </div>
      </div>
      </div>
      <InputField :label="$t('groups.modal.about')">
          <p-textarea
            id="about"
            class="rounded-3xl min-h-[180px]"
            v-model="form.description"
            :autoResize="true"
            :placeholder="$t('groups.modal.placeholder.about')"
          ></p-textarea>
      </InputField>
        <div class="px-6">
          <div class="mb-2 text-sm">{{ $t('groups.modal.permissions.title') }}</div>
          <div class="flex space-x-6">
            <div class="flex items-center">
              <PRadioButton class="me-2" id="permissions" name="permissions" value="ALL" v-model="form.postingPermission" />
              <label class="text-sm">{{ $t('groups.modal.permissions.all') }}</label>
            </div>
            <div class="flex items-center">
              <PRadioButton class="me-2" id="permissions" name="permissions" value="ADMIN_ONLY" v-model="form.postingPermission" />
              <label class="text-sm">{{ $t('groups.modal.permissions.admin_only') }}</label>
            </div>
            <div class="flex items-center">
              <PRadioButton class="me-2" id="permissions" name="permissions" value="WITH_APPROVAL" v-model="form.postingPermission" />
              <label class="text-sm">{{ $t('groups.modal.permissions.with_approval') }}</label>
            </div>
          </div>
        </div>
        <div class="px-6">
          <div class="mb-2 text-sm">{{ $t('groups.modal.access.title') }}</div>
          <div class="flex items-center space-x-6">
            <div class="flex items-center">
              <PRadioButton class="me-2" id="access" name="access" value="PUBLIC" v-model="form.accessType" />
              <label class="text-sm">{{ $t('groups.modal.access.public') }}</label>
            </div>
             <div class="flex items-center">
              <PRadioButton class="me-2" id="access" name="access" value="PRIVATE" v-model="form.accessType" />
              <label class="text-sm">{{ $t('groups.modal.access.private') }}</label>
            </div>
          </div>
        </div>
        <div class="flex items-center mt-2" :class="editMode ? 'justify-between' : 'justify-end'">
          <PButton v-if="editMode" @click="remove" class="btn-outlined-error" :label="$t('categories.modal.remove')"></PButton>
          <div class="flex items-center space-x-2">
            <PButton :disabled="v$.$invalid || !v$.$anyDirty" @click="editMode ? edit() : create()" class="btn-primary" :label="editMode ? $t('groups.modal.edit') : $t('groups.modal.create')"></PButton>
            <PButton @click="cancel" class="btn-flat-primary" :label="$t('groups.modal.cancel')"></PButton>
          </div>
        </div>
    </div>
  </BaseRenderlessModal>
</template>
<script setup lang="ts">
import type { ICategory } from "@/data/categories/categories.interface"
import { useCategoriesStore } from "@/data/categories/categories.store"
import { useVuelidate } from '@vuelidate/core'
import { required } from '@/utils/validators.utils'
import type { PropType } from "vue"
import type { IGroup } from "@/data/groups/groups.interface"

const $categories = useCategoriesStore()
const props = defineProps({
  editMode: {
    type: Boolean,
    required: false,
    default: false
  },
  data: {
    type: Object as PropType<IGroup>,
    required: false
  }
})

const emit = defineEmits(['cancel', 'create', 'edit', 'remove'])
const cancel = () => {
  emit('cancel')
}

const edit = () => {
  const data = JSON.parse(JSON.stringify(form.value))
  data.categories = data.categories.map((category: ICategory) => category.id)
  emit('edit', data)
}

const remove = () => {
  emit('remove', props.data!.id)
}

const create = () => {
  const data = JSON.parse(JSON.stringify(form.value))
  data.categories = data.categories.map((category: ICategory) => category.id)
  emit('create', data)
}
const form = ref({
  id: null as null | number,
  name: '',
  categories: [] as any,
  accessType: 'PUBLIC' as string | undefined,
  postingPermission: 'ALL' as string | undefined,
  description: ''
})

onMounted(() => {
  if (props.editMode && props.data) {
    form.value.name = props.data.name
    form.value.categories = props.data.categories
    form.value.accessType = props.data.accessType
    form.value.id = props.data.id
    form.value.postingPermission = props.data.postingPermission
    form.value.description = props.data.description
  }
})

const rules = {
  name: {
    required,
  },
  categories: {
    required,
  }
}
const v$ = useVuelidate(rules, form, {
  $autoDirty: true,
})
const choosedCategory = ref([] as ICategory[])
const categories = ref([] as ICategory[])
const chooseCategory = (event) => {
  form.value.categories.push(event.value)
  categories.value = categories.value.filter((category: ICategory) => category.id !== event.value.id)
}
const removeChoosedCategory = (item: ICategory) => {
  form.value.categories = form.value.categories.filter((category: ICategory) => category.id !== item.id)
}
const fetchCategories = async () => {
  const response = await $categories.getCategories({
    skipParent: true,
    size: 1000
  })
  if (response) categories.value = response.content
}

onMounted(() => {
  fetchCategories()
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