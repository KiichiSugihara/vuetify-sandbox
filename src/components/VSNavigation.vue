<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <router-link :to="{ name: 'home' }">
          <v-btn icon large>
            <v-avatar size="32px" item>
              <v-img
                src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                alt="Vuetify"
            /></v-avatar> </v-btn
        ></router-link>
        <template v-for="item in items">
          <router-link
            :to="{ name: item.router }"
            :key="item.id"
            class="d-flex text--black"
          >
            <!-- headerNav -->
            <v-row v-if="item.heading" :key="item.heading" align="center">
              <v-col cols="6">
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-col>
              <v-col cols="6" class="text-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-col>
            </v-row>
            <!-- 子Nav -->
            <v-list-group
              v-else-if="item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <!-- 子Nav -->
              <v-list-item v-for="(child, i) in item.children" :key="i" link>
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ child.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <!-- 普通Nav -->

            <v-list-item v-else :key="item.text">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item></router-link
          >
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
      ><v-row class="d-flex justify-space-between">
        <v-row class="d-flex align-center">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
          <slot name="titleText"></slot>
        </v-row>
        <v-row class="d-flex justify-end">
          <router-link :to="{ name: 'user' }"
            ><v-btn icon>
              <v-icon>mdi-account</v-icon>
            </v-btn></router-link
          >
          <v-dialog v-model="dialog" max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon>
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">ログアウト</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false" color="green darken-1" text
                  >キャンセル</v-btn
                >
                <v-btn @click="logout" color="red darken-1" text
                  >ログアウト</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-row>
    </v-app-bar>
  </div></template
>

<script>
import "@/router/index";
export default {
  props: {
    titileText: {
      type: String,
      default: "タイトル"
    }
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: "mdi-home", text: "home", router: "home" },
      {
        icon: "mdi-file-document-box-check-outline",
        text: "form",
        router: "form"
      },
      {
        icon: "mdi-file-table-box-outline",
        text: "table",
        router: "table"
      }
    ]
  }),
  methods: {
    logout() {
      this.dialog = false;
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
}
</style>
