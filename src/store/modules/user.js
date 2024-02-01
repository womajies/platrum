export default {
  // namespaced: true,
  state: {
    users: JSON.parse(localStorage.getItem('users')) || [],
  },

  mutations: {
    ADD_USER (state, payload) {
      function findBossById(array, id) {
        let result
        for (let obj of array) {
          if (obj.id === id) {
            return obj
          }
          if (obj.children?.length !== 0) {
            result = findBossById(obj.children, id)
            if (result) {
              return result
            }
          }
        }
        return result
      }

      const boss = findBossById(state.users, payload.boss)
      if (boss) {
        boss.children.push(payload)
      } else {
        state.users.push(payload)
      }
      localStorage.setItem('users', JSON.stringify(state.users))
    },

    SORT_USERS({users}, {prop, order}) {
      if (!order) return

      if (order === 'ascending') {
        users.sort(ascendingSort);
      }
      if (order === 'descending') {
        users.sort(descendingSort);
      }

      function ascendingSort(a, b) {
        if (a.children.length > 1) {
          a.children.sort(ascendingSort);
        }
        if (a[prop] < b[prop]) {
          return -1;
        }
        if (a[prop] > b[prop]) {
          return 1;
        }
        return 0;
      }

      function descendingSort(a, b) {
        if (a.children.length > 1) {
          a.children.sort(descendingSort);
        }
        if (a[prop] > b[prop]) {
          return -1;
        }
        if (a[prop] < b[prop]) {
          return 1;
        }
        return 0;
      }
    },
  },

  getters: {
    getUsers (state) {
      return state.users
    },
    getUsersWithChildren (state) {
      let result = []

      function findAllUsers(array) {
        for (let obj of array) {
          result.push(obj)

          if (obj.children?.length !== 0) {
            findAllUsers(obj.children)
          }
        }
        return result
      }

      return findAllUsers(state.users)
    }
  },

  actions: {
    addUser ({ commit }, user) {
      commit('ADD_USER', user)
    },
    sortUsers ({ commit }, payload) {
      commit('SORT_USERS', payload)
    },
  }
}
