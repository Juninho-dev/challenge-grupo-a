<template>
  <v-container>
    <modal-student
      :dialog="openDialog"
      :student="student"
      @close="handleCloseDialog"
      @create="handleCreateStudent"
      @update="handleUpdateStudent"
    />
    <modal-delete
      :dialog="openDialogDelete"
      @delete="handleDeleteStudent"
      @close="handleCloseDialogDelete"
    />
    <v-card min-height="90vh">
      <v-card-title>
        <h2>Consulta de Alunos</h2>
      </v-card-title>
      <v-card-text class="mt-10">
        <v-row>
          <v-col>
            <v-text-field
              label="Pesquisar"
              @input="handleSearch"
              variant="outlined"
            />
          </v-col>
          <v-col class="text-end">
            <v-btn color="primary" class="mt-2" @click="handleOpenDialog()"
              >Cadastrar
              <span class="d-none d-sm-block ml-1">Aluno</span></v-btn
            >
          </v-col>
        </v-row>

        <div>
          <v-table class="elevation-1">
            <thead>
              <tr>
                <th class="text-left">Registro Acadêmico</th>
                <th class="text-left">
                  Nome
                  <v-btn
                    variant="plain"
                    icon="mdi-arrow-up-bold"
                    size="x-small"
                    @click="sortByName"
                  />
                </th>
                <th class="text-left">CPF</th>
                <th class="text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in students" :key="student.id">
                <td>{{ student.ra }}</td>
                <td>{{ student.name }}</td>
                <td>{{ setMaskCpf(student.cpf) }}</td>
                <td>
                  <v-row>
                    <v-btn
                      color="green"
                      variant="plain"
                      class="mt-2"
                      @click="handleOpenDialog(student)"
                    >
                      Editar</v-btn
                    >
                    <v-btn
                      color="red"
                      variant="plain"
                      class="mt-2"
                      @click="handleOpenDialogDelete(student)"
                    >
                      Excluir</v-btn
                    >
                  </v-row>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalStudent from "@/components/ModalStudent.vue";
import ModalDelete from "@/components/ModalDelete.vue";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "@/services/student";
import type { IStudent } from "@/interfaces/IStudent";
import { setMaskCpf } from "@/helpers/helpers";
import { getError } from "@/helpers/getError";

interface DataStudentPage {
  search: string;
  openDialog: boolean;
  openDialogDelete: boolean;
  students: IStudent[];
  student: IStudent;
}

export default defineComponent({
  name: "StudentsPage",
  data(): DataStudentPage {
    return {
      search: "",
      openDialog: false,
      openDialogDelete: false,
      students: [],
      student: {} as IStudent,
    };
  },
  async created() {
    await this.getStudents();
  },
  methods: {
    setMaskCpf,
    async handleSearch(e: Event) {
      const value = (e.target as HTMLInputElement).value;
      if (value) {
        this.students = this.students.filter((student) =>
          student.name.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        await this.getStudents();
      }
    },
    handleOpenDialog(student?: IStudent) {
      if (student) {
        this.student = student;
      } else {
        this.student = {} as IStudent;
      }
      this.openDialog = !this.openDialog;
    },
    handleCloseDialog() {
      this.openDialog = false;
    },
    handleCloseDialogDelete() {
      this.openDialogDelete = false;
    },
    async getStudents() {
      const response = await getStudents();
      this.students = response.payload;
    },
    sortByName() {
      this.students.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
    async handleCreateStudent(dataStudent: Omit<IStudent, "id">) {
      try {
        const response = await createStudent(dataStudent);

        if (response && response.isSuccess) {
          this.openDialog = false;
          this.getStudents();
          this.$swal("Sucesso!", "Aluno cadastrado com sucesso!", "success");
        }
      } catch (error) {
        const tratativeError = getError(error, "Erro ao cadastrar aluno!");
        this.$swal(tratativeError.title, tratativeError.message, "error");
      }
    },
    async handleUpdateStudent(dataStudent: IStudent) {
      try {
        const response = await updateStudent(dataStudent);

        if (response && response.isSuccess) {
          this.openDialog = false;
          this.getStudents();
          this.$swal("Sucesso!", "Aluno atualizado com sucesso!", "success");
        }
      } catch (error) {
        const tratativeError = getError(error, "Erro ao atualizar aluno!");
        this.$swal(tratativeError.title, tratativeError.message, "error");
      }
    },
    handleOpenDialogDelete(student: IStudent) {
      this.student = student;
      this.openDialogDelete = !this.openDialogDelete;
    },
    async handleDeleteStudent() {
      try {
        const response = await deleteStudent(this.student.id);

        if (response && response.isSuccess) {
          this.openDialogDelete = false;
          this.getStudents();
          this.$swal("Sucesso!", "Aluno excluído com sucesso!", "success");
        }
      } catch (error) {
        const tratativeError = getError(error, "Erro ao excluir aluno!");
        this.$swal(tratativeError.title, tratativeError.message, "error");
      }
    },
  },
  components: {
    ModalStudent,
    ModalDelete,
  },
});
</script>
