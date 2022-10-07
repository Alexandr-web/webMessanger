<template>
  <aside
    ref="leftSidebar"
    class="sidebar-left"
  >
    <div
      class="sidebar-left__parts"
      :style="{
        'transform': `translateX(-${transitionWay}px)`
      }"
    >
      <vSidebarRooms :style="{ 'width': `${leftSidebarWidth}px` }" />
      <vSidebarCreateRoom :style="{ 'width': `${leftSidebarWidth}px` }" />
    </div>
    <button
      class="sidebar-left__nav-btn"
      @click="setTransition"
    >
      <vArrowRightIcon
        :classes="[
          'sidebar-left__nav-icon',
          activePart >= limitWay ? 'sidebar-left__nav-icon-left' : ''
        ]"
      />
    </button>
  </aside>
</template>

<script>
  import vSidebarRooms from "@/components/vSidebarRooms";
  import vSidebarCreateRoom from "@/components/vSidebarCreateRoom";
  import vArrowRightIcon from "@/components/icons/vArrowRightIcon";

  export default {
    name: "SidebarLeftComponent",
    components: {
      vSidebarRooms,
      vSidebarCreateRoom,
      vArrowRightIcon,
    },
    data: () => ({
      leftSidebarWidth: 0,
      activePart: 0,
      transitionWay: 0,
      limitWay: 1,
    }),
    mounted() {
      this.setSidebarWidth();

      window.addEventListener("resize", this.setSidebarWidth);
    },
    methods: {
      setSidebarWidth() {
        const sidebar = this.$refs.leftSidebar;

        this.leftSidebarWidth = sidebar.offsetWidth;
      },
      setTransition() {
        this.activePart += 1;

        this.checkWay();

        this.transitionWay = this.activePart * this.leftSidebarWidth;
      },
      checkWay() {
        if (this.activePart > this.limitWay) {
          this.activePart = 0;
        }
      },
    },
  };
</script>