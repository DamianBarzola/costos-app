import { ELEMENT_TYPES } from "./consts";

export const DATA = {
  revenue: 50,
  items: [
    {
      id: 1,
      label: "Tela",
      type: ELEMENT_TYPES.SELECT,
      options: [
        { id: 1, label: "Tela 1", price: 500 },
        { id: 2, label: "Tela 2", price: 500 },
      ],
    },
    {
      id: 2,
      label: "Volado",
      type: ELEMENT_TYPES.PRICE,
    },
    {
      id: 3,
      label: "Cinta",
      type: ELEMENT_TYPES.PRICE,
    },
    {
      id: 4,
      label: "Etiqueta Eco",
      type: ELEMENT_TYPES.QUANTITY,
      price: 150,
    },
    {
      id: 5,
      label: "Etiqueta",
      type: ELEMENT_TYPES.QUANTITY,
      price: 50,
    },
    {
      id: 6,
      label: "Hilos",
      type: ELEMENT_TYPES.PRICE,
    },
    {
      id: 7,
      label: "Mano de obra",
      type: ELEMENT_TYPES.QUANTITY,
      price: 1800,
    },
    {
      id: 8,
      label: "Bolsa",
      type: ELEMENT_TYPES.QUANTITY,
      price: 50,
    },
  ],
};

export const DATA_EXAMPLE = {
  name: "Plantilla de ejemplo",
  revenue: 50,
  items: [
    {
      id: 1,
      label: "Categoría 1",
      type: ELEMENT_TYPES.SELECT,
      options: [
        { id: 1, label: "Opción 1", price: 500 },
        { id: 2, label: "Opción 2", price: 500 },
      ],
    },
    {
      id: 2,
      label: "Categoría 2",
      type: ELEMENT_TYPES.QUANTITY,
      price: 150,
    },
    {
      id: 3,
      label: "Categoría 3",
      type: ELEMENT_TYPES.PRICE,
    },
  ],
};
