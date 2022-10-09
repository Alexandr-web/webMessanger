<template>
  <form
    class="form"
    @submit.prevent="$emit('send')"
  >
    <h3
      v-if="title"
      class="form__title"
    >
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
          <input
            :id="field.id"
            v-model.trim="field.input.value"
            class="form__input"
            :type="field.input.type"
            @focus="focusInput(field.id)"
            @blur="blurInput(field.id)"
          >
          <span
            class="form__field-title"
            :class="{
              'form__field-title-up': field.titleUp
            }"
          >
            {{ field.input.placeholder }}
          </span>
        </label>
      </div>
      <button
        class="form__submit"
        :class="{
          'form__submit-pending': pending,
        }"
        type="submit"
        :disabled="pending"
      >
        {{ textButton }}
        <div
          v-if="pending"
          class="form__submit-loader"
        ></div>
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
      pending: Boolean,
      title: String,
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