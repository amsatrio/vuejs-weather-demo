<template>
    <div class="ps-16 py-1 flex flex-row justify-start space-x-4 items-center">
        <div>
            <i class="fa-solid fa-dot-circle"></i>
        </div>
        <div>{{ title }}</div>
    </div>
</template>

<script setup>

defineProps({
    title: {
    type: [String, null],
    required: true
  }
})
</script>

<style lang="scss" scoped></style>