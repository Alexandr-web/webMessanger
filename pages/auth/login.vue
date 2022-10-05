<template>
  <div class="auth">
    <div class="container">
      <div class="auth__data">
        <vForm
          :fields="fields"
          :title="title"
          :text-button="textButton"
          @changeTitleState="changeTitleState"
          @send="login"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import vForm from "@/components/vForm";
  import changeFieldsData from "@/mixins/changeFieldsData";

  export default {
    name: "LoginPage",
    components: { vForm, },
    mixins: [changeFieldsData],
    layout: "empty",
    data: () => ({
      title: "Вход",
      textButton: "Войти",
      fields: [
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
    head: { title: "Вход", },
    methods: {
      login() {
        const data = this.fields.reduce((acc, { id, input: { value, }, }) => {
          acc[id] = value;
        
          return acc;
        }, {});

        const res = this.$store.dispatch("auth/login", data);

        res.then(({ ok, }) => {
          if (ok) {
            this.$router.push("/");
          }
        }).catch((err) => {
          throw err;
        });
      },
    },
  };
</script>