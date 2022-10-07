<template>
  <div class="sidebar-left__part sidebar-left__create-room">
    <vForm
      :fields="fields"
      :text-button="textButton"
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
      fields: [
        {
          id: "roomName",
          input: {
            placeholder: "Название комнаты",
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
      textButton: "Создать",
    }),
    methods: {
      createRoom() {
        const fd = this.fields.reduce((acc, { id, input: { value, }, }) => {
          acc[id] = value;

          return acc;
        }, {});

        console.log(fd);
      },
    },
  };
</script>