import movieService from '@/services/movieService'

export default {
  namespaced: true,
  state: {
    movies: [],
    myList: [],
    fight_club_id: "550",
    selectedMovie: null
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies
    },
    setMyList(state, myList) {
      state.myList = myList
    },
    setSelectedMovie(state, movie) {
      state.selectedMovie = movie 
    }
  },
  actions: {
    async fetchMovies({commit}, {filterBy}) { 
      try {
        const res = await movieService.getMovies(filterBy)
        commit('setMovies', res)
      } catch(err){
        console.error(err);
      }
    },
    async fetchMyList({commit}, {filterBy}) { 
      try {
        const res = await movieService.getMovies(filterBy)
        commit('setMyList', res)
      } catch(err){
        console.error(err);
      }
    },
    async fetchSelectedMovie({commit}, {id}) {
      try {
        const movie = await movieService.getMovieById(id)  
        commit('setSelectedMovie', movie)
      } catch(err){
        console.error(err);
      }
    }
  },
  getters: {
    listByCategory: (state) => (category) => state.movies.filter(movie => movie.category === category),
    myList: (state) => state.myList,
    selectedMovie: state => state.selectedMovie,
  }
}
