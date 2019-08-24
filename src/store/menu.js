export default {
    state: {
        menu: []
    },
    mutations: {
        setMent () {
            this.state.index.menu = JSON.parse(localStorage.getItem('menu'))
        }
    },
    actions: {
        getMenuData (context) {
            context.commit('setMent')
        }
    }
}
