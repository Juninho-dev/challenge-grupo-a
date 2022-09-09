import { Student } from '@prisma/client';

import {
  IStudent,
  StudentsRepository,
} from '../repositories/StudentsRepository';

export class StudentRepositoryInMemory implements StudentsRepository {
  private students: Student[] = [];

  async index(userId: number): Promise<Student[]> {
    const students = this.students.filter(
      (student) => student.userId === userId,
    );
    return students;
  }

  async create({
    name, user_id, email, cpf, ra,
  }: IStudent): Promise<Student> {
    const student = {
      id: Math.random(),
      name,
      userId: user_id,
      email,
      cpf,
      ra,
    };

    const alreadyExists = this.students.find((student) => student.ra === ra);

    if (alreadyExists) {
      throw new Error('Aluno já cadastrado');
    }

    this.students.push(student);
    return student;
  }

  async update({
    name, user_id, email, id,
  }: Omit<IStudent, 'cpf' | 'ra'>) {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id,
    );

    if (studentIndex === -1) {
      throw new Error('Aluno não encontrado');
    }

    const student = {
      id: id!,
      name,
      userId: user_id,
      email,
    };

    const userUpdated = (this.students[studentIndex] = {
      ...this.students[studentIndex],
      ...student,
    });

    return userUpdated;
  }

  async delete(id: number, userId: number) {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id && student.userId === userId,
    );

    if (studentIndex === -1) {
      throw new Error('Aluno não encontrado');
    }
    this.students.splice(studentIndex, 1);

    return 'ok';
  }
}
