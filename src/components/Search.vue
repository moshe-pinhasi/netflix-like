<template>
  <div class="search" :class="{focused: focused, 'not-empty': text}">
    <input v-model="text" @input="$emit('change', text)" @focus="onFocused" @blur="onBlur" placeholder="Search" />
    <Icon name="fa-search" />
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  name: "Search",
  components: {
    Icon
  },
  data() {
    return {
      text: "",
      focused: false
    }
  },
  methods: {
    onFocused() {
      this.focused = true
    },
    onBlur() {
      this.focused = false
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  width: 100px;
  position: relative;
  border-bottom: 1px solid $color-grey-light-2;
  transition: width .3s;

  &.focused, &.not-empty {
    width: 300px;
  }

  input {
    width: 100%;
    height: 3rem;
    padding: 0 20px 0 0;
    border: none;
    background: transparent;
    color: $color-grey-light-2;
    outline: none;
  }

  .fas {
    position: absolute;
    top: 8px;
    right: 4px;
    font-size: 1.5rem;
    color: $color-grey-light-2;
  }
}
</style>