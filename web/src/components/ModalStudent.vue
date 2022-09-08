<template>
  <v-dialog v-model="openDialog" persistent>
    <v-card :min-width="getWidth">
      <v-card-title class="text-h5 grey lighten-2">
        <div class="d-flex flex-row justify-space-between align-center">
          <h3 v-if="student.id">Atualizar {{ student.name }}</h3>
          <h3 v-else>Cadastrar Aluno</h3>
          <v-btn icon="mdi-close" variant="plain" @click="handleCloseModal" />
        </div>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="studentForm.name"
                :rules="rulesName"
                label="Nome"
                outlined
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="studentForm.email"
                label="E-mail"
                outlined
                :rules="rulesEmail"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="studentForm.ra"
                label="Registro Acadêmico"
                type="number"
                :disabled="student.id !== undefined"
                :rules="rulesRa"
                outlined
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="studentForm.cpf"
                label="CPF"
                outlined
                counter="11"
                type="number"
                :disabled="student.id !== undefined"
                :rules="rulesCpf"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <div v-if="!student.id" class="d-flex flex-row">
          <v-btn class="bg-secondary" size="large" @click="handleCloseModal">
            Cancelar
          </v-btn>
          <v-btn
            class="bg-primary"
            size="large"
            :disabled="!valid"
            :loading="loading"
            @click="handleCreateStudent"
          >
            Cadastrar
          </v-btn>
        </div>
        <div v-else>
          <v-btn class="bg-secondary" size="large" @click="handleCloseModal">
            Cancelar
          </v-btn>
          <v-btn
            class="bg-primary"
            size="large"
            :disabled="!valid"
            :loading="loading"
            @click="handleUpdateStudent"
          >
            Atualizar
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { IStudent } from "@/interfaces/IStudent";

export default defineComponent({
  name: "ModalStudent",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    student: {
      type: Object as PropType<IStudent>,
      required: true,
    },
  },
  data() {
    return {
      studentForm: {} as IStudent,
      openDialog: this.dialog,
      loading: false,
      rulesName: [
        (v: string) => !!v || "O nome é obrigatório",
        (v: string) =>
          v.length <= 50 || "O nome deve ter no máximo 50 caracteres",
      ],
      rulesEmail: [
        (v: string) => !!v || "O e-mail é obrigatório",
        (v: string) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      rulesCpf: [
        (v: string) => !!v || "CPF é obrigatório",
        (v: string) => String(v).length === 11 || "CPF deve ter 11 dígitos",
      ],
      rulesRa: [(v: string) => !!v || "RA é obrigatório"],
    };
  },
  emits: ["close", "create", "update"],
  computed: {
    valid() {
      return (
        this.studentForm.name !== undefined &&
        this.studentForm.name !== "" &&
        this.studentForm.email !== undefined &&
        this.studentForm.email !== "" &&
        /.+@.+\..+/.test(this.studentForm.email) &&
        this.studentForm.ra !== undefined &&
        this.studentForm.ra !== "" &&
        this.studentForm.cpf !== undefined &&
        this.studentForm.cpf !== "" &&
        String(this.studentForm.cpf).length === 11
      );
    },
    getWidth() {
      return window.innerWidth > 600 ? "800px" : "100%";
    },
  },
  methods: {
    handleCloseModal() {
      this.$emit("close");
    },
    setLoading() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    handleCreateStudent() {
      this.setLoading();
      this.$emit("create", {
        ...this.studentForm,
        ra: String(this.studentForm.ra),
        cpf: String(this.studentForm.cpf),
      });
    },
    handleUpdateStudent() {
      this.setLoading();
      this.$emit("update", {
        ...this.studentForm,
        ra: String(this.studentForm.ra),
        cpf: String(this.studentForm.cpf),
      });
    },
  },
  watch: {
    dialog(value: boolean) {
      this.openDialog = value;
    },
    student(value: IStudent) {
      this.studentForm = value;
    },
  },
});
</script>
