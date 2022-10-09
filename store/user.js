import jwtDecode from "jwt-decode";

const host = require("../server/host");

export default {
  actions: {
    async getOne({}, id) {
      try {
        const res = await fetch(`${host}/user/api/${id}`, {
          method: "GET",
          headers: { "Accept-Type": "application/json", },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },

    async getIdByToken({ }, token) {
      try {
        const data = jwtDecode(token || "");

        return (data || {}).id;
      } catch (err) {
        throw err;
      }
    },

    async getRooms({}, id) {
      try {
        const res = await fetch(`${host}/user/api/${id}/rooms`, {
          method: "GET",
          headers: { "Accept-Type": "application/json", },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },
  },
};