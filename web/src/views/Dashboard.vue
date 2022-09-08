<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <h2 class="pa-2">Módulo Acadêmico</h2>
      <router-link
        to="/dashboard"
        class="pa-2 d-flex justify-space-between bg-primary"
      >
        <v-icon>mdi-account-group</v-icon>
        <h3 class="text-white">Alunos</h3>
        <div></div>
      </router-link>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="logo"
          transition="scale-transition"
          width="50"
        ></v-img>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <students />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import logo from "@/assets/logo-mais-a-educacao.svg";
import Students from "./Students.vue";

export default defineComponent({
  name: "DashboardPage",
  data: () => ({
    drawer: false,
    logo,
  }),
  components: { Students },
});
</script>
