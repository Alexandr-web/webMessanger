<template>
  <div class="messenger-main">
    <header
      v-if="getActiveRoom"
      class="messenger-main__header"
    >
      <h3 class="messenger-main__header-title">
        {{ getActiveRoom.title }}
      </h3>
      <h4 class="messenger-main__header-members">
        Всего {{ getActiveRoom.members.length }} участников
      </h4>
    </header>
    <main
      v-if="getActiveRoom"
      class="messenger-main__chat"
    >
      <div
        v-if="getActiveRoom.messages.length"
        class="messenger-main__chat-messages"
      >
        <vMessage
          v-for="(message, index) in getActiveRoom.messages"
          :key="index"
          :message="message"
        />
      </div>
      <vNothing
        v-else
        text="Сообщений нет"
      />
    </main>
    <footer
      v-if="getActiveRoom"
      class="messenger-main__area-write"
    >
      <input
        v-if="getActiveRoom.user.isMember"
        v-model.trim="message"
        class="messenger-main__input-message"
        placeholder="Написать сообщение..."
        @keydown.enter="sendMessage"
      />
      <button
        v-else
        class="messenger-main__join-btn"
        :disabled="pendingJoining"
        :class="{
          'messenger-main__join-btn-pending': pendingJoining,
        }"
        @click="joinToRoom"
      >
        Присоединиться к комнате
        <div
          v-if="pendingJoining"
          class="loader loader--white"
        ></div>
      </button>
    </footer>
    <vNothing
      v-else
      text="Выберите комнату"
    />
  </div>
</template>

<script>
  import vNothing from "@/components/vNothing";
  import vMessage from "@/components/vMessage";
  import { io, } from "socket.io-client";

  const socketHost = require("@/server/webSockets/host");

  export default {
    name: "MessengerComponent",
    components: {
      vNothing,
      vMessage,
    },
    data: () => ({
      message: "",
      pendingJoining: false,
    }),
    computed: {
      getActiveRoom() {
        return this.$store.getters["room/getActiveRoom"];
      },
    },
    mounted() {
      const socket = io(socketHost);

      socket.on("doneJoiningToRoom", (data) => {
        this.$store.commit("room/setActiveRoom", {
          ...this.getActiveRoom,
          ...data,
        });
      });

      socket.on("doneSendingMessage", (data) => {
        console.log(data);
      });
    },
    methods: {
      async joinToRoom() {
        try {
          const socket = io(socketHost);
          const token = this.$store.getters["auth/getToken"];
          const userId = await this.$store.dispatch("user/getIdByToken", token);
          const { title: titleRoom, } = this.getActiveRoom;
          const reqData = {
            userId,
            titleRoom,
          };

          this.pendingJoining = true;

          socket.emit("joinToRoom", reqData);
        } catch (err) {
          throw err;
        }
      },
      async sendMessage() {
        try {
          const socket = io(socketHost);
          const token = this.$store.getters["auth/getToken"];
          const userId = await this.$store.dispatch("user/getIdByToken", token);
          const { title: titleRoom, } = this.getActiveRoom;
          const reqData = {
            userId,
            titleRoom,
            message: this.message,
          };

          socket.emit("sendMessage", reqData);
        } catch (err) {
          throw err;
        }
      },
    },
  };
</script>