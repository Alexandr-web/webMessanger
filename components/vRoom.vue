<template>
  <li class="sidebar-left__rooms-room">
    <div class="sidebar-left__rooms-room-inner">
      <div class="sidebar-left__rooms-room-block">
        <div class="sidebar-left__rooms-room-picture"></div>
      </div>
      <div class="sidebar-left__rooms-room-block sidebar-left__rooms-room-info">
        <h4 class="sidebar-left__rooms-room-title">
          {{ room.title }}
        </h4>
        <div class="sidebar-left__rooms-room-messages">
          <div class="sidebar-left__rooms-room-messages-count">
            0
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    name: "SidebarRoomsComponent",
    props: {
      room: {
        type: Object,
        required: true,
      },
    },
  };
</script>