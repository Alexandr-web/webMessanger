<template>
  <div class="messenger-main">
    <header
      v-if="getActiveRoom"
      class="messenger-main__header"
    >
      <h3 class="messenger-main__header-title">
        Название комнаты 212131
      </h3>
      <h4 class="messenger-main__header-members">
        4 участника
      </h4>
    </header>
    <main
      v-if="getActiveRoom"
      class="messenger-main__chat"
    >
      <div
        class="messenger-main__chat-messages"
      >
        <div class="messenger-main__chat-message">
          <header class="messenger-main__chat-message-header">
            <h4 class="messenger-main__chat-message-author-name">
              Александр Яковлев
            </h4>
          </header>
          <main class="messenger-main__chat-message-main">
            <p class="messenger-main__chat-message-text">
              Далеко-далеко за словесными горами в стране гласных и согласных живут, рыбные тексты. Скатился послушавшись за путь. От всех ему деревни родного лучше речью заманивший инициал назад гор, путь там домах вскоре ее даль?
            </p>
          </main>
        </div>
        <div class="messenger-main__chat-message messenger-main__chat-message-my">
          <main class="messenger-main__chat-message-main">
            <p class="messenger-main__chat-message-text">
              Далеко-далеко за словесными горами в стране гласных и согласных живут, рыбные тексты. Скатился послушавшись за путь. От всех ему деревни родного лучше речью заманивший инициал назад гор, путь там домах вскоре ее даль?
            </p>
          </main>
        </div>
        <div class="messenger-main__chat-message messenger-main__chat-message-my">
          <main class="messenger-main__chat-message-main">
            <p class="messenger-main__chat-message-text">
              Далеко-далеко за словесными горами в стране гласных и согласных живут, рыбные тексты. Скатился послушавшись за путь. От всех ему деревни родного лучше речью заманивший инициал назад гор, путь там домах вскоре ее даль?
            </p>
          </main>
        </div>
        <div class="messenger-main__chat-message messenger-main__chat-message-my">
          <main class="messenger-main__chat-message-main">
            <p class="messenger-main__chat-message-text">
              Далеко-далеко за словесными горами в стране гласных и согласных живут, рыбные тексты. Скатился послушавшись за путь. От всех ему деревни родного лучше речью заманивший инициал назад гор, путь там домах вскоре ее даль?
            </p>
          </main>
        </div>
        <div class="messenger-main__chat-message messenger-main__chat-message-my">
          <main class="messenger-main__chat-message-main">
            <p class="messenger-main__chat-message-text">
              Далеко-далеко за словесными горами в стране гласных и согласных живут, рыбные тексты. Скатился послушавшись за путь. От всех ему деревни родного лучше речью заманивший инициал назад гор, путь там домах вскоре ее даль?
            </p>
          </main>
        </div>
      </div>
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

  export default {
    name: "MessengerComponent", 
    components: { vNothing, },
    data: () => ({ message: "", }),
    computed: {
      getActiveRoom() {
        return this.$store.getters["room/getActiveRoom"];
      },
    },
  };
</script>