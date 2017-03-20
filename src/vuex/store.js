import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0
}

const getters = {
    countpush: state => {
    	return state.count = 10
    }
}

const mutations = {
    ADD (state) {
        state.count++
    }
}

const actions = {
    updateActiveNote ({ commit }, ) {
        commit('ADD');
        console.log(state.count)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
