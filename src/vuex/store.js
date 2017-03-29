import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0,
    transitionName: 'translateX',
    isback: false,//点击回退按钮传值给transition做是否后退判断
    userinfo: {},//个人信息
    mask: false,//遮罩
    toast: {//成功提示
        open: false,
        sw: true,
        text: '成功'
    },
    loadingToast: {//加载提示
        open: false,
        text: '请稍后...'
    },
    dialog: {
        open: false,
        text: ''
    }
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
    SETTRANSITIONNAME (state, name) {
        state.transitionName = name;
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
    TOAST (state, arg) {
        state.toast = arg
    },
    LOADINGTOAST (state, arg) {
        state.loadingToast = arg
    },
    DIALOG (state, arg) {
        state.dialog = arg
    },
}

const actions = {
    updateActiveNote ({ commit }, ) {
        commit('ADD');
    },
    mask ({ commit }, bool) {
        commit('MASK', bool);
        return this;
    },
    toast ({ commit }, arg = []) {
        if (!state.toast.open) {
            setTimeout(function(){
                commit('TOAST', {
                    open: false,
                    sw: arg[0] || false
                });
                if (arg[0] == true) {
                    if (typeof arg[3] == 'function') {
                        arg[3]()
                    }
                }
            }, parseInt(arg[1]) || 2000)
        }
        commit('TOAST', {
            open: true,
            sw: arg[0] || false,
            text: arg[2] || '成功',
        });
    },
    loadingToast ({ commit }, arg = []) {
        commit('LOADINGTOAST', {
            open: arg[0] || false,
            text: arg[1] || '请稍后...',
        });
    },
    dialog ({ commit }, arg = []) {
        commit('DIALOG', {
            open: arg[0] || false,
            text: arg[1] || '',
        });
    },
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
