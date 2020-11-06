<template>
  <div class="app-header u-flex u-flex-center-horaizental u-space-between">
    <router-link :to="{name: 'home'}">
      <img alt="App logo" class="logo" src="@/assets/images/logo.png" />
    </router-link>
    <div class="right-content u-flex">
      <ul class="u-flex u-flex-center-horaizental" v-if="user">
        <li class="action-item"><Search @change="search" /></li>
        <li class="action-item notification">
          <router-link :to="{name: 'my-list'}">
            <Icon name="fa-bell"/>
            <span v-if="userLikesCount > 0" class="notification-size">{{userLikesCount}}</span>
          </router-link>
        </li>
        <li class="action-item user-name">
          <span>Hello Moshe</span>
          <Icon name="fa-chevron-down"/>
        </li>
      </ul>

      <ul class="u-flex u-flex-center-horaizental login-box" v-else>
        <li class="action-item">
          <input v-model="username" placeholder="Enter your name" />
        </li>
        <li class="action-item"><button class="btn btn-link btn-primary-color" @click="onLogin">login</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Search from './Search'
import Icon from '@/components/Icon'

export default {
  name: "AppHeader",
  components: {
    Search,
    Icon,
  },
  data() {
    return {
      username: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters['userModule/user']
    },
    userLikesCount() {
      return this.user ? this.user.likes.length : 0
    }
  },
  methods: {
    search(term) {
      console.log('term', term)
    },
    onLogin() {
      this.$store.dispatch({type: 'userModule/login', name: this.username})
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  padding: 10px 20px;
  background-color: $color-black;
  font-family: $font-primary;

  .logo {
    width: 100px;
  }

  .right-content {
    font-size: 1.6rem;

    .action-item {
      margin: 0 0 0 15px;
      color: $color-white;
      cursor: pointer;
    }

    .login-box {
        input {
        width: 100%;
        height: 3rem;
        padding: 0 20px 0 0;
        border: none;
        border-bottom: 1px solid;
        background: transparent;
        color: $color-grey-light-2;
        outline: none;
      }
    }

    .user-name {
      span {
        margin: 0 5px 0 0;
      }

      .fas {
        font-size: 1.5rem;
      }
    }

    .notification {
      position: relative;

      .notification-size {
        position: absolute;
        bottom: -2px;
        right: -7px;
        width: 13px;
        height: 13px;
        color: #fff;
        background-color: #e50914;
        border-radius: 50%;
        font-size: 9px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .fas {
        color: $color-grey-light-1;
      }
    }
  }
}
</style>