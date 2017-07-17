import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0,
    transitionName: 'translateX',
    isback: false,//点击回退按钮传值给transition做是否后退判断
    userinfo: JSON.parse(localStorage.getItem('userinfo')) || {},//个人信息
    mask: false,//遮罩
    scroll: 0,//滚动条距离顶部高度缓存
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
    },
    iosDialog1: {
        open: false,
        title: '提示',
        text: '是否确认',
        primary: () => {},
        default: () => {
            state.iosDialog1.open = false
        }
    },
    currentView: 'project',//首页选项卡
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
    SCROLL (state, num) {
        state.scroll = num
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
    IOSDIALOG1 (state, arg) {
        state.iosDialog1 = arg
    },
    CURRENTVIEW (state, type) {
        state.currentView = type
    }
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
                if (typeof arg[3] == 'function') {
                    arg[3]()
                }
            }, parseInt(arg[1]) || 2000)
        }
        commit('TOAST', {
            open: true,
            sw: arg[0] || false,
            text: arg[2] || (arg[0] || false?'成功':'失败'),
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
        if (typeof arg[2] == 'function') {
            arg[2]()
        }
    },
    iosDialog1 ({ commit }, arg = []) {
        commit('IOSDIALOG1', {
            open: arg[0] || false,
            title: arg[1] || '提示',
            text: arg[2] || '是否确认',
            primary: typeof arg[3] == 'function' ? arg[3] : () => {},
            default: typeof arg[4] == 'function' ? arg[3] : () => {}
        });
    },
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
