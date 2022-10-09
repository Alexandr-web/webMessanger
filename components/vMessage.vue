<template>
  <div
    class="messenger-main__chat-message"
    :class="{
      'messenger-main__chat-message-my': message.isMy,
    }"
  >
    <header
      v-if="!message.isMy"
      class="messenger-main__chat-message-header"
    >
      <h4 class="messenger-main__chat-message-author-name">
        {{ message.authorName }}
      </h4>
    </header>
    <main class="messenger-main__chat-message-main">
      <p class="messenger-main__chat-message-text">
        {{ message.desc }}
      </p>
    </main>
  </div>
</template>

<script>
  export default {
    name: "MessageComponent",
    props: {
      message: {
        type: Object,
        required: true,
      },
    },
  };
</script>