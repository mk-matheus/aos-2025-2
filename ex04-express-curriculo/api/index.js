import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models";
import routes from "./routes";

// 1. CONFIGURAÇÃO DA APP E "MIDDLEWARE"
const app = express();
app.set("trust proxy", true);

//alteracao para permitir tudo
app.use(cors());

// 2. MIDDLEWARE DE CONTEXTO
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// 3. REGISTRO DE ROTAS
app.use("/", routes.root);
app.use("/people", routes.people);

// 4. VARIAVEIS DE ACESSO .ENV
const port = process.env.PORT ?? 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE === "true";

// 5. SEEDING E INICIALIZAÇÃO DO SERVIDOR
const createInitialResumes = async () => {
  // CADASTRO DE DADOS NO INICIO DA APLICACAO
  await models.Person.create(
    {
      name: "Ada Lovelace",
      email: "ada@example.com",
      phone: "1111-2222",

      Resumes: [
        {
          title: "Analista e Metafísica",
          summary:
            "Conhecida por ter escrito o primeiro algoritmo a ser processado por uma máquina.",
        },
      ],
      Experiences: [
        {
          companyName: "Corte Real",
          role: "Visionária de Computação",
          startDate: "1840-01-01",
          description: "Trabalhei com Charles Babbage na Máquina Analítica.",
        },
      ],
      Education: [
        {
          institutionName: "Universidade da Vida",
          course: "Matemática e Lógica",
          status: "Concluído",
        },
      ],
      Skills: [
        { name: "Algoritmos", level: "Avançado" },
        { name: "Matemática", level: "Avançado" },
        { name: "Visão de Futuro", level: "Especialista" },
      ],
      ExternalLinks: [
        {
          type: "portfolio",
          url: "https://pt.wikipedia.org/wiki/Ada_Lovelace",
        },
      ],
    },
    {
      include: [
        models.Resume,
        models.Experience,
        models.Education,
        models.Skill,
        models.ExternalLink,
      ],
    }
  );

  await models.Person.create(
    {
      name: "Alan Turing",
      email: "alan@example.com",
      Resumes: [
        {
          title: "Pai da Computação",
          summary: "Matemático, lógico e pioneiro da ciência da computação.",
        },
      ],
      Experiences: [
        {
          companyName: "Bletchley Park",
          role: "Criptoanalista",
          description: "Liderei a equipe que quebrou o código Enigma.",
        },
      ],
      Skills: [
        { name: "Computação Teórica", level: "Especialista" },
        { name: "Criptoanálise", level: "Especialista" },
      ],
    },
    {
      include: [models.Resume, models.Experience, models.Skill],
    }
  );
};

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createInitialResumes();
  }

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
});
