import { body } from "express-validator";

// Regras para criação (POST) - campos são obrigatórios
export const createPersonRules = [
  body("name")
    .notEmpty()
    .withMessage('O campo "name" é obrigatório.')
    .isString()
    .withMessage('O campo "name" deve ser uma string.'),

  body("email")
    .notEmpty()
    .withMessage('O campo "email" é obrigatório.')
    .isEmail()
    .withMessage("Deve ser um formato de email válido."),

  body("phone")
    .optional() // Telefone é opcional
    .isString()
    .withMessage('O campo "phone" deve ser uma string se fornecido.'),
];

// Regras para atualização (PUT) - campos são opcionais
export const updatePersonRules = [
  body("name")
    .optional()
    .isString()
    .withMessage('O campo "name" deve ser uma string.'),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Deve ser um formato de email válido."),

  body("phone")
    .optional()
    .isString()
    .withMessage('O campo "phone" deve ser uma string.'),
];
