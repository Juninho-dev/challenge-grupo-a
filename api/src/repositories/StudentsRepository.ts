import { prisma } from "../database/client";

interface ICreateStudent {
  user_id: number;
  name: string;
  email: string;
  cpf: string;
  ra: string;
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

  async create({ name, user_id, email, cpf, ra }: ICreateStudent) {
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
}
