import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0,
    isback: false,//点击回退按钮传值给transition做是否后退判断
    userinfo: {},//个人信息
    mask: false,//遮罩
    toast: {
        open: false,
        text: '已完成'
    },//成功提示
    loadingToast: {
        open: false,
        text: '数据加载中'
    },//加载提示
}

const getters = {
    countpush: state => {
    	return state.count = 10
    }
}

const mutations = {
    ADD (state) {
        state.count++
    },
    SETUSERINFO (state, data) {
        state.userinfo = data
    },
    ISBACK (state, bool) {
        state.isback = bool
    },
    MASK (state, bool) {
        state.mask = bool
    },
    TOAST (state, bool) {
        state.toast = bool
    },
    LOADINGTOAST (state, bool) {
        state.loadingToast = bool
    },
}

const actions = {
    updateActiveNote ({ commit }, ) {
        commit('ADD');
    },
    mask ({ commit }, bool) {
        commit('MASK', bool);
    },
    toast ({ commit }, bool) {
        commit('TOAST', bool);
    },
    loadingToast ({ commit }, bool) {
        commit('LOADINGTOAST', bool);
    },
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
