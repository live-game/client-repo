import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomId: '',
    playerNum: 0
  },
  mutations: {
    mutateRoomId (state, roomId) {
      state.roomId = roomId
    },
    mutatePlayerNum (state, playerNum) {
      state.playerNum = playerNum
    }
  },
  actions: {
    updateRoomId (context, roomId) {
      context.commit('mutateRoomId', roomId)
    },
    updatePlayerNum (context, playerNum) {
      context.commit('mutatePlayerNum', playerNum)
    }
  }
})
