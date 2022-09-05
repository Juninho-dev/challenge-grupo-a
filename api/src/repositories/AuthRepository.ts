// UserRepository class with prisma client
import { prisma } from "../database/client";
import { compare, hash } from "bcrypt";
import { generateToken } from "../helpers/generateToken";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export class AuthRepository {
  async register({ name, email, password }: ICreateUser) {
    // Validate if user already exists
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async login({ email, password }: Omit<ICreateUser, "name">) {
    // Validate if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User does not exists");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    const token = generateToken({ email }, String(user.id));

    return {
      token,
      user,
    };
  }
}
