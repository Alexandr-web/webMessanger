<template>
  <div class="sidebar-left__part sidebar-left__rooms">
    <header class="sidebar-left__rooms-header">
      <div class="sidebar-left__rooms-search">
        <input
          v-model.trim="search"
          class="sidebar-left__rooms-search-input"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </header>
    <main class="sidebar-left__rooms-main">
      <ul
        v-if="rooms.length"
        class="sidebar-left__rooms-list"
      >
        <vRoom
          v-for="(room, index) in rooms"
          :key="index"
          :room="room"
        />
      </ul>
      <vNothing
        v-else
        text="Комнат нет"
      />
    </main>
  </div>
</template>

<script>
  import vRoom from "@/components/vRoom";
  import vNothing from "@/components/vNothing";

  export default {
    name: "SidebarRoomsComponent",
    components: {
      vRoom,
      vNothing,
    },
    data: () => ({
      search: "",
      rooms: [],
    }),
    async fetch() {
      try {
        const token = this.$store.getters["auth/getToken"];
        const id = await this.$store.dispatch("user/getIdByToken", token);
        const { ok, rooms, } = await this.$store.dispatch("user/getRooms", id);

        if (ok) {
          this.rooms = rooms;
        }
      } catch (err) {
        throw err;
      }
    },
  };
</script>