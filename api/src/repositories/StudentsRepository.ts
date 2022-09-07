import { prisma } from "../database/client";

interface IStudent {
  user_id: number;
  name: string;
  email: string;
  cpf: string;
  ra: string;
  id?: number;
}

export class StudentsRepository {
  async index(userId: number) {
    const students = await prisma.student.findMany({
      where: {
        userId,
      },
    });
    return students;
  }

  async create({ name, user_id, email, cpf, ra }: IStudent) {
    const student = await prisma.student.create({
      data: {
        name,
        userId: user_id,
        email,
        cpf,
        ra,
      },
    });
    return student;
  }

  async update({ name, user_id, email, id }: Omit<IStudent, "cpf" | "ra">) {
    const student = await prisma.student.update({
      where: {
        id,
      },
      data: {
        name,
        userId: user_id,
        email,
      },
    });
    return student;
  }

  async delete(id: number, userId: number) {
    const student = await prisma.student.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!student) {
      throw new Error("Aluno não encontrado");
    }

    await prisma.student.delete({
      where: {
        id,
      },
    });
    return student;
  }
}
