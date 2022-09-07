<template>
  <v-card class="elevation-12 rounded-md pa-5">
    <v-card-title class="text-center">
      <h1 class="display-1 font-weight">Login</h1>
      <v-divider class="mt-5 bg-secondary" />
      <span class="font-weight-light">
        Começe digitando o seu email e a sua senha
      </span>
    </v-card-title>
    <v-card-text class="mt-10">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          type="email"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Senha"
          required
          variant="outlined"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-form>
      <div class="text-end">
        <span
          >Não tem uma conta?
          <router-link to="/register" class="text-secondary"
            >Começe agora</router-link
          ></span
        >
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn
        class="w-100 bg-primary"
        size="large"
        :disabled="!valid"
        :loading="loading"
        @click="login"
      >
        Entrar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginCardForm",

  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      emailRules: [
        (v: string) => !!v || "E-mail é obrigatório",
        (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
      ],
      passwordRules: [
        (v: string) => !!v || "Senha é obrigatória",
        (v: string) => v.length >= 8 || "Senha deve ter no mínimo 8 caracteres",
      ],
    };
  },

  computed: {
    valid() {
      return this.email !== "" && this.password !== "";
    },
  },
  emits: ["login"],
  methods: {
    login() {
      this.loading = true;
      this.$emit("login", this.email, this.password);
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
});
</script>
