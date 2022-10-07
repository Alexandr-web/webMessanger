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
      <ul class="sidebar-left__rooms-list">
        <li
          v-for="n in 2"
          :key="n"
          class="sidebar-left__rooms-room"
        >
          <div class="sidebar-left__rooms-room-inner">
            <div class="sidebar-left__rooms-room-block">
              <div class="sidebar-left__rooms-room-picture"></div>
            </div>
            <div class="sidebar-left__rooms-room-block sidebar-left__rooms-room-info">
              <h4 class="sidebar-left__rooms-room-title">
                Title room {{ n }}
              </h4>
              <div class="sidebar-left__rooms-room-messages">
                <div class="sidebar-left__rooms-room-messages-count">
                  {{ n + 1 }}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  export default {
    name: "SidebarRoomsComponent",
    data: () => ({ search: "", }),
  };
</script>