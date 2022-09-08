<template>
  <v-dialog v-model="openDialog" persistent>
    <v-card>
      <v-card-title>
        <h3>Tem certeza que deseja fazer isso?</h3>
      </v-card-title>

      <v-card-text>
        <p>Você não poderá reverter isso depois.</p>
      </v-card-text>

      <v-card-actions class="d-flex justify-end">
        <v-btn color="secondary" @click="handleCloseDialog()">Cancelar</v-btn>
        <v-btn color="red" @click="handleDeleteStudent()">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalDelete",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      openDialog: this.dialog,
    };
  },
  emits: ["delete", "close"],
  watch: {
    dialog(value: boolean) {
      this.openDialog = value;
    },
  },
  methods: {
    handleCloseDialog() {
      this.$emit("close");
    },
    handleDeleteStudent() {
      this.$emit("delete");
      this.handleCloseDialog();
    },
  },
});
</script>
