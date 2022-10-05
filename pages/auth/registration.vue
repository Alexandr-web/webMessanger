<template>
  <div class="auth">
    <div class="container">
      <div class="auth__data">
        <vForm
          :fields="fields"
          :title="title"
          :text-button="textButton"
          @changeTitleState="changeTitleState"
          @send="registration"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import vForm from "@/components/vForm";
  import changeFieldsData from "@/mixins/changeFieldsData";

  export default {
    name: "RegistrationPage",
    components: { vForm, },
    mixins: [changeFieldsData],
    layout: "empty",
    data: () => ({
      title: "Регистрация",
      textButton: "Зарегистрироваться",
      fields: [
        {
          id: "name",
          titleUp: false,
          input: {
            type: "text",
            placeholder: "Имя",
            value: "",
          },
        },
        {
          id: "email",
          titleUp: false,
          input: {
            type: "text",
            placeholder: "Электронная почта",
            value: "",
          },
        },
        {
          id: "password",
          titleUp: false,
          input: {
            type: "password",
            placeholder: "Пароль",
            value: "",
          },
        }
      ],
    }),
    head: { title: "Регистрация", },
    methods: {
      registration() {
        const data = this.fields.reduce((acc, { id, input: { value, }, }) => {
          acc[id] = value;

          return acc;
        }, {});
        const res = this.$store.dispatch("auth/registration", data);

        res.then(({ ok, }) => {
          if (ok) {
            this.$router.push("/auth/login");
          }
        }).catch((err) => {
          throw err;
        });
      },
    },
  };
</script>