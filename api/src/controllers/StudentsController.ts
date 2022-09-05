import { Request, Response } from "express";
import { apiMessage } from "../helpers/error";
import { StudentsRepository } from "../repositories/StudentsRepository";

export class StudentsController {
  async index(req: Request, res: Response) {
    const { user_id } = req;

    const studentsRepository = new StudentsRepository();
    const students = await studentsRepository.index(Number(user_id));

    return res.send(apiMessage(true, 200, "Students", students));
  }

  async create(req: Request, res: Response) {
    const { user_id } = req;
    const { name, email, cpf, ra } = req.body;

    const studentsRepository = new StudentsRepository();
    const student = await studentsRepository.create({
      name,
      user_id: Number(user_id),
      email,
      cpf,
      ra,
    });

    return res.send(apiMessage(true, 201, "Student Created", student));
  }
}
