<template>
  <div class="sidebar-left__part sidebar-left__create-room">
    <vForm
      :fields="fields"
      :text-button="textButton"
      :pending="pending"
      @changeTitleState="changeTitleState"
      @send="createRoom"
    />
  </div>
</template>

<script>
  import vForm from "@/components/vForm";
  import changeFieldsData from "@/mixins/changeFieldsData";

  export default {
    name: "SidebarCreateRoomComponent",
    components: { vForm, },
    mixins: [changeFieldsData],
    data: () => ({
      pending: false,
      fields: [
        {
          id: "roomTitle",
          input: {
            placeholder: "Название",
            value: "",
          },
        },
        {
          id: "roomDesc",
          input: {
            placeholder: "Описание (необязательно)",
            value: "",
          },
        }
      ],
      textButton: "Создать комнату",
    }),
    methods: {
      createRoom() {
        const title = this.fields.find(({ id, }) => id === "roomTitle").input.value;
        const desc = this.fields.find(({ id, }) => id === "roomDesc").input.value;
        const fd = {
          title,
          desc,
        };
        const token = this.$store.getters["auth/getToken"];
        const res = this.$store.dispatch("room/create", {
          fd,
          token,
        });

        this.pending = true;

        res.then(({ ok, }) => {
          this.pending = false;

          if (ok) {
            this.$emit("scrollTo", 0);
            this.$router.go(0);
          }
        }).catch((err) => {
          throw err;
        });
      },
    },
  };
</script>