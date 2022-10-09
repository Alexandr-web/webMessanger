const host = require("../server/host");

export default {
  state: () => ({ activeRoom: null, }),
  getters: { getActiveRoom: (state) => state.activeRoom, },
  mutations: {
    setActiveRoom(state, val) {
      state.activeRoom = val;
    },
  },
  actions: {
    async create({}, { fd, token, }) {
      try {
        const res = await fetch(`${host}/room/create`, {
          method: "POST",
          headers: {
            "Accept-Type": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
          body: JSON.stringify(fd),
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },

    async getMessages({}, id) {
      try {
        const res = await fetch(`${host}/room/api/${id}/messages`, {
          method: "GET",
          headers: { "Accept-Type": "application/json", },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },

    async getByTitle({}, { token, title, }) {
      try {
        const res = await fetch(`${host}/room/api/search/?title=${title}`, {
          method: "GET",
          headers: {
            "Accept-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },
  },
};