<template>
  <div id="app">
    <div class="nav">
      <AppHeader />
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: {
    AppHeader
  }
}
</script>
<style lang="scss">
#app {
}

.nav {
  position: fixed;
  width: 100%;
  z-index: 2;
}

.main-content {
  height: 100%;
  padding: 80px 30px 0 30px;
}
</style>
