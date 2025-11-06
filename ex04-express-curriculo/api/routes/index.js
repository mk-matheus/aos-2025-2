// api/routes/index.js

import root from "./root";
import people from "./peopleRoutes";

// Apenas importa os roteadores e os exporta como um objeto.
// NÃO importe 'models' ou 'controllers' aqui.

export default {
  root,
  people,
};
