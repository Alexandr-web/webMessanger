<template>
  <div class="messenger">
    <vSidebarLeft />
    <vMessenger />
  </div>
</template>

<script>
  import vSidebarLeft from "@/components/vSidebarLeft";
  import vMessenger from "@/components/vMessenger";

  export default {
    name: "IndexPage",
    components: {
      vSidebarLeft,
      vMessenger,
    },
    middleware: "checkAuth",
  };
</script>
