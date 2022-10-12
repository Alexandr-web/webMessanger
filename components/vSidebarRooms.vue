<template>
  <div class="sidebar-left__part sidebar-left__rooms">
    <header class="sidebar-left__rooms-header">
      <div class="sidebar-left__rooms-search">
        <input
          v-model.trim="search"
          class="sidebar-left__rooms-search-input"
          type="text"
          placeholder="Поиск..."
          @keydown.enter="searchRoom"
        />
      </div>
    </header>
    <main class="sidebar-left__rooms-main">
      <ul
        v-if="!search && myRooms.length"
        class="sidebar-left__rooms-list"
      >
        <vRoom
          v-for="(room, index) in myRooms"
          :key="index"
          :room="room"
          @setRoom="setRoom"
        />
      </ul>
      <ul
        v-else-if="searchRooms.length"
        class="sidebar-left__rooms-list"
      >
        <vRoom
          v-for="(room, index) in searchRooms"
          :key="index"
          :room="room"
          @setRoom="setRoom"
        />
      </ul>
      <div
        v-if="pending"
        class="loader loader--blue loader--center"
      ></div>
    </main>
  </div>
</template>

<script>
  import vRoom from "@/components/vRoom";
  import { io, } from "socket.io-client";

  const socketHost = require("@/server/webSockets/host");

  export default {
    name: "SidebarRoomsComponent",
    components: { vRoom, },
    data: () => ({
      search: "",
      pending: false,
      myRooms: [],
      searchRooms: [],
    }),
    async fetch() {
      try {
        const token = this.$store.getters["auth/getToken"];
        const id = await this.$store.dispatch("user/getIdByToken", token);
        const { ok, rooms, } = await this.$store.dispatch("user/getRooms", id);
        
        if (ok) {
          this.myRooms = rooms;
        }
      } catch (err) {
        throw err;
      }
    },
    mounted() {
      const socket = io(socketHost);

      socket.on("doneCreatingRoom", (data) => {
        this.$store.commit("room/setActiveRoom", data);
      });
    },
    methods: {
      async setRoom(room) {
        try {
          const socket = io(socketHost);
          const token = this.$store.getters["auth/getToken"];
          const id = await this.$store.dispatch("user/getIdByToken", token);
          
          socket.emit("setRoom", {
            userId: id,
            roomTitle: room.title,
          });
        } catch (err) {
          throw err;
        }
      },
      searchRoom() {
        if (this.search.length > 3) {
          const token = this.$store.getters["auth/getToken"];
          const res = this.$store.dispatch("room/getByTitle", { token, title: this.search, });

          this.searchRooms = [];
          this.pending = true;

          res.then(({ ok, rooms, }) => {
            this.pending = false;

            if (ok) {
              this.searchRooms = rooms;
            }
          }).catch((err) => {
            throw err;
          });
        }
      },
    },
  };
</script>