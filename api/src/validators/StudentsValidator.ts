import { body } from "express-validator";

type ValidationType = "createStudent" | "updateStudent";

class StudentsValidator {
  validate = (method: ValidationType) => {
    switch (method) {
      case "createStudent": {
        return [
          body("name").notEmpty().withMessage("Nome é obrigatório"),
          body("email").notEmpty().withMessage("Email é obrigatório"),
          body("email").isEmail().withMessage("Email é inválido"),
          body("cpf").notEmpty().withMessage("CPF é obrigatório"),
          body("ra").notEmpty().withMessage("RA é obrigatório"),
        ];
      }
      case "updateStudent": {
        return [
          body("name").notEmpty().withMessage("Nome é obrigatório"),
          body("email").notEmpty().withMessage("Email é obrigatório"),
          body("email").isEmail().withMessage("Email é inválido"),
        ];
      }
    }
  };
}

export default new StudentsValidator();
