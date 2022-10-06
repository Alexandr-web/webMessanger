<template>
  <div class="messenger">
    <vSidebarRooms />
    <vMessenger />
  </div>
</template>

<script>
  import vSidebarRooms from "@/components/vSidebarRooms";
  import vMessenger from "@/components/vMessenger";

  export default {
    name: "IndexPage",
    components: {
      vSidebarRooms,
      vMessenger,
    },
    middleware: "checkAuth",
  };
</script>
