<template>
  <aside class="sidebar-rooms">
    <header class="sidebar-rooms__header">
      <div class="sidebar-rooms__search">
        <input
          v-model.trim="search"
          class="sidebar-rooms__search-input"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </header>
    <main class="sidebar-rooms__main">
      <ul class="sidebar-rooms__list">
        <li
          v-for="n in 2"
          :key="n"
          class="sidebar-rooms__room"
        >
          <div class="sidebar-rooms__room-inner">
            <div class="sidebar-rooms__room-block">
              <div class="sidebar-rooms__room-picture"></div>
            </div>
            <div class="sidebar-rooms__room-block sidebar-rooms__room-info">
              <h4 class="sidebar-rooms__room-title">
                Title room {{ n }}
              </h4>
              <div class="sidebar-rooms__room-messages">
                <div class="sidebar-rooms__room-messages-count">
                  {{ n + 1 }}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </aside>
</template>

<script>
  export default {
    name: "SidebarRoomsComponent",
    props: {},
    data: () => ({ search: "", }),
  };
</script>