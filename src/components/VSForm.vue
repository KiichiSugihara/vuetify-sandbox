<template>
  <div>
    <v-content class="backGroundColor">
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="green"
      ></v-progress-linear>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              v-on="on"
              label="Picker without buttons"
              prepend-icon="event"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
        </v-menu>
        <v-dialog
          ref="dialog"
          v-model="jpModal"
          :return-value.sync="jpDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="jpDate"
              v-on="on"
              label="Picker in dialog"
              prepend-icon="event"
              readonly
            ></v-text-field>
          </template>
          <VSJPDatePicker v-model="jpDate" scrollable>
            <v-spacer></v-spacer>
            <v-btn @click="jpModal = false" text color="primary">Cancel</v-btn>
            <v-btn @click="$refs.dialog.save(jpDate)" text color="primary"
              >OK</v-btn
            >
          </VSJPDatePicker>
        </v-dialog>
        <!-- 文字数制限 -->
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        <!-- メールアドレス -->
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <!-- 選択フォーム -->
        <v-select
          v-model="select"
          :items="selectItems"
          :rules="selectRules"
          label="Item"
          required
        ></v-select>
        <v-autocomplete
          :items="states"
          :filter="customFilter"
          color="white"
          item-text="name"
          label="State"
        ></v-autocomplete>
        <!-- チェックボックス -->
        <v-checkbox
          v-model="checkbox"
          :rules="checkboxRules"
          label="同意しましたか?"
          required
        ></v-checkbox>
        <v-btn :disabled="!valid" @click="submit" color="success" class="mr-4">
          登録
        </v-btn>

        <v-btn @click="reset" color="error" class="mr-4">
          クリア
        </v-btn>
      </v-form>
    </v-content>
  </div>
</template>

<script>
import router from "@/router/index";
import VSJPDatePicker from "@/components/VSJPDatePicker";
export default {
  components: {
    VSJPDatePicker
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    jpDate: new Date().toISOString().substr(0, 10),
    jpModal: false,
    states: [
      { name: "Florida", abbr: "FL", id: 1 },
      { name: "Georgia", abbr: "GA", id: 2 },
      { name: "Nebraska", abbr: "NE", id: 3 },
      { name: "California", abbr: "CA", id: 4 },
      { name: "New York", abbr: "NY", id: 5 }
    ],
    loading: false,
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
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    async submit() {
      this.loading = true;

      await this.validate();
      if (this.valid) {
        await setTimeout(() => this.mockPush(), 1500);
      } else {
        this.loading = false;
      }
    },
    async mockPush() {
      router.push({ name: "home" });
      this.loading = false;
    }
  }
};
</script>
