<template>
  <div>
    <div class="mb-6 text-xs">User status</div>
    <div class="space-y-6">
      <div class="flex items-center">
        <PRadioButton inputId="any" v-model="status" name="status" value="Any"/>
        <label class="ms-2 text-sm" for="any">Any</label>
      </div>
      <div class="flex items-center">
        <PRadioButton inputId="active" v-model="status" name="status" value="Active" />
        <label class="ms-2 text-sm" for="active">Active</label>
      </div>
      <div class="flex items-center">
        <PRadioButton inputId="banned" v-model="status" name="status" value="Banned" />
        <label class="ms-2 text-sm" for="banned">Banned</label>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const status = ref('Any')
const emits = defineEmits(['onChange'])

watch(status, () => {
  emits('onChange', status.value)
})
</script>
