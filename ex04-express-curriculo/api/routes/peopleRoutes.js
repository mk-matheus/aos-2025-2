// api/routes/peopleRoutes.js

import { Router } from "express";

// 1. REMOVA qualquer 'import asyncHandler' daqui.
// import asyncHandler from "../utils/asyncHandler"; // <--- DELETE ESTA LINHA

// 2. IMPORTE o "Gerente" dos Controllers
import controllers from '../controllers'; 

const router = Router();

// --- CRUD da Pessoa (Pai) ---
// (Agora 'controllers' está definido)
router.get("/", controllers.people.getAllPeople);
router.get("/:personId", controllers.people.getPersonById);
router.post("/", controllers.people.createPerson);
router.put("/:personId", controllers.people.updatePerson);
router.delete("/:personId", controllers.people.deletePerson);

// --- CRUD de Experiências (Filho) ---
router.get("/:personId/experiences", controllers.experience.getAll);
router.post("/:personId/experiences", controllers.experience.create);
router.put("/:personId/experiences/:experienceId", controllers.experience.update);
router.delete("/:personId/experiences/:experienceId", controllers.experience.remove);

export default router;