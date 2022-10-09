const host = require("../server/host");

export default {
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
  },
};