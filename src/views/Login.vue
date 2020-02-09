<template>
  <v-app
    ><v-content class="primeColor">
      <v-container class="white">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="userName"
                  :rules="nameRules"
                  :counter="10"
                  label="User Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-btn
          :disabled="!valid"
          @click="submit"
          class="ma-2"
          outlined
          color="primeColor"
          >Login</v-btn
        >
      </v-container>
    </v-content></v-app
  >
</template>

<script>
import "@/router/index";
export default {
  name: "Login",
  data: () => ({
    valid: false,
    userName: "",
    nameRules: [
      v => !!v || "UserName is required",
      v => v.length <= 10 || "UserName must be less than 10 characters"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length <= 10 || "Password must be less than 10"
    ]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    submit() {
      if (this.valid) {
        this.$router.push({ name: "home" });
      }
    }
  }
};
</script>
