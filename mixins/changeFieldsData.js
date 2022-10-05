export default {
  methods: {
    changeTitleState({ id, titleUp, }) {
      this.fields = this.fields.map((field) => {
        if (field.id === id) {
          field.titleUp = titleUp;
        }

        return field;
      });
    },
  },
};