
import storageService from '@/services/storageService'

export default {
  namespaced: true,
  state: {
    user: storageService.load('user')
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      storageService.save('user', user)
    },
  },
  actions: {
    async login({commit}, {name}) { 
      try {
        if (!name) throw "name can't be empty"
        commit('setUser', {name, likes: []})
      } catch(err){
        console.error(err);
      }
    },
    toggleMovieLiked({commit, state, dispatch}, {movieId}) {
      const found = state.user.likes.find(id => id === movieId)
      let user = JSON.parse(JSON.stringify(state.user));
      if (found)
        user.likes = user.likes.filter(id => id !== movieId)
      else
        user.likes.push(movieId)

      commit('setUser', user)
      dispatch({type: 'moviesModule/fetchMyList', filterBy: {ids: user.likes}}, {root: true})
    }
  },
  getters: {
    user: (state) => state.user,
  }
}
