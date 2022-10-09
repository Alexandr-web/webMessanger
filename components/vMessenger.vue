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
      <textarea
        v-model.trim="message"
        class="messenger-main__input-message"
        placeholder="Написать сообщение..."
      ></textarea>
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

  export default {
    name: "MessengerComponent", 
    components: {
      vNothing,
      vMessage,
    },
    data: () => ({ message: "", }),
    computed: {
      getActiveRoom() {
        return this.$store.getters["room/getActiveRoom"];
      },
    },
  };
</script>