<template>
  <div class="p-invalid">
    <h5 v-if="label" class="label">{{ label }}</h5>
    <div v-else-if="align" class="h-8"></div>
    <div class="min-h-12 mb-2 input-field-inner">
      <component
        :is="pComponent"
        v-if="child"
        v-model="value"
        v-bind="{ ...$attrs, ...$lodash.omit(child, 'type') }"
        :class="[child.class, { 'p-invalid': errors && errors.length }]"
      ></component>
      <div v-else :class="{ invalid: errors && errors.length }">
        <slot></slot>
      </div>
      <div v-if="errors && errors.length">
        <p v-for="error of errors" :key="error.$uid" class="text-error text-start text-xs">{{ error.$message }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { ErrorObject } from '@vuelidate/core'
import type { PropType } from 'vue'

interface IPrimeComponent {
  type: string
  label?: string
  align?: boolean
  placeholder?: string
  class?: string
  init?: any
}
const PRIME_PREFIX = 'p-'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: undefined,
    },
    align: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array as PropType<Array<ErrorObject>>,
      default: undefined,
    },
    child: {
      type: Object as PropType<IPrimeComponent>,
      default: undefined,
    },
  },
  emits: ['input'],
  setup() {
    return {
      prefix: PRIME_PREFIX,
    }
  },
  data() {
    return {
      value: this.child?.init,
    }
  },
  computed: {
    pComponent() {
      return this.child ? this.prefix + this.child.type : undefined
    },
  },
  watch: {
    value(newValue) {
      this.$emit('input', newValue)
    },
  },
})
</script>

<style scoped lang="scss">
.label {
  --at-apply: h-8 my-auto font-semibold;
}
:deep(.p-component) {
  --at-apply: w-full;
}
.invalid {
  :deep(.p-component) {
    --at-apply: border-error;
  }
}

.input-field-inner {
  :deep(.p-inputtext){
    --at-apply:'h-unset';
  }
}
</style>
