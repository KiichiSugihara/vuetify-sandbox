<template>
  <v-app
    ><VSNavigation>
      <template v-slot:titleText>
        <span>{{ title }}</span>
      </template></VSNavigation
    ><v-content class="ma-4">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-select
          v-model="select"
          :items="selectItems"
          :rules="selectRules"
          label="Item"
          required
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="checkboxRules"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn :disabled="!valid" @click="submit" color="success" class="mr-4">
          登録
        </v-btn>

        <v-btn @click="reset" color="error" class="mr-4">
          クリア
        </v-btn>
      </v-form>
    </v-content></v-app
  >
</template>

<script>
import router from "@/router/index";
import VSNavigation from "@/components/VSNavigation";
export default {
  name: "Form",
  components: {
    VSNavigation
  },
  data: () => ({
    title: "フォーム",
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "名前を入力してください",
      v => (v && v.length <= 10) || "名前は10文字以下で入力してください"
    ],
    email: "",
    emailRules: [
      v => !!v || "メールアドレスを入力してください",
      v => /.+@.+\..+/.test(v) || "メールアドレスが不正です"
    ],
    select: null,
    selectRules: [v => !!v || "Item is required"],
    selectItems: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
    checkbox: false,
    checkboxRules: [v => !!v || "確認してください"]
  }),

  methods: {
    // validation実行
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    // フォームのリセット
    reset() {
      this.$refs.form.reset();
    },
    //バリデーションリセット
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async submit() {
      await this.validate();
      if (this.valid) {
        router.push({ name: "home" });
      }
    }
  }
};
</script>
