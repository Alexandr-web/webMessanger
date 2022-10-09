<template>
  <div class="nothing">
    <p class="nothing__desc">
      {{ text || "Ничего нет" }}
    </p>
  </div>
</template>

<script>
  export default {
    name: "NothingComponent",
    props: { text: String, },
  };
</script>