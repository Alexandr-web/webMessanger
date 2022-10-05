<template>
  <form
    class="form"
    @submit.prevent="$emit('send')"
  >
    <h3 class="form__title">
      {{ title }}
    </h3>
    <div class="form__fields">
      <div
        v-for="(field, index) in fields"
        :key="index"
        class="form__field"
      >
        <label
          class="form__label"
          :for="field.id"
        >
          <span
            class="form__field-title"
            :class="{
              'form__field-title-up': field.titleUp
            }"
          >
            {{ field.input.placeholder }}
          </span>
          <input
            :id="field.id"
            v-model.trim="field.input.value"
            class="form__input"
            :type="field.input.type"
            @focus="focusInput(field.id)"
            @blur="blurInput(field.id)"
          >
        </label>
      </div>
      <button
        class="form__submit"
        type="submit"
      >
        {{ textButton }}
      </button>
    </div>
  </form>
</template>

<script>
  export default {
    name: "FormComponent",
    props: {
      textButton: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      fields: {
        type: Array,
        required: true,
      },
    },
    methods: {
      focusInput(fieldId) {
        this.$emit("changeTitleState", {
          id: fieldId,
          titleUp: true,
        });
      },
      blurInput(fieldId) {
        const { input: { value, }, } = this.fields.find(({ id, }) => fieldId === id);

        this.$emit("changeTitleState", {
          id: fieldId,
          titleUp: value.length,
        });
      },
    },
  };
</script>