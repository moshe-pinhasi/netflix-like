<template>
  <i :class="[name, tag]"></i>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'fas'
    }
  }
}
</script>