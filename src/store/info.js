import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
            
                commit('setInfo', info)
            } catch (error) {
                console.log("fetchInfo", error)
            }
        },
        async updateInfo({dispatch, commit, getters}, updateData) {
            try {
                const uid = await dispatch('getUid')
                const updateInfo = {...getters.info, ...updateData}
                
                await firebase.database().ref(`/users/${uid}/info`).update(updateInfo)
            
                commit('setInfo', updateInfo)
            } catch (error) {
                commit('setError', error)
                throw e
            }
        }
    },
    getters: {
        info(state){
            return state.info
        }
    }
}