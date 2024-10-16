"use client";
import { ELEMENT_TYPES } from "@/consts";
import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

let DATA = {
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
const Templates = () => {
  const [template, setTemplate] = useState(
    DATA
    // localStorage.getItem("templates")
    //   ? JSON.parse(localStorage.getItem("templates"))?.[0]
    //   : { revenue: 0, items: [] }
  );
  const [templates, setTemplates] = useState(
    localStorage.getItem("templates")
      ? JSON.parse(localStorage.getItem("templates"))
      : []
  );
  const [newCategory, setNewCategory] = useState(ELEMENT_TYPES.SELECT);
  const handleChangeRevenue = (e) => {
    setTemplate({ ...template, revenue: e.target.value });
  };

  const handleSelectInput = (e, itemIndex) => {
    const value = e.target.value;
    let _templateItems = template.items;
    _templateItems[itemIndex].label = value;
    setTemplate({ ...template, items: _templateItems });
  };
  const handleSelectOption = (e, itemIndex, optionIndex) => {
    const value = e.target.value;
    const name = e.target.name;
    let _templateItems = [...template.items];
    _templateItems[itemIndex].options[optionIndex][name] = value;
    setTemplate({ ...template, items: _templateItems });
  };
  const handleSelectAddOption = (itemIndex) => {
    let _templateItems = [...template.items];
    _templateItems[itemIndex].options.push({
      id: _templateItems[itemIndex].options.length + 1,
      label: "",
      price: null,
    });
    setTemplate({ ...template, items: _templateItems });
  };

  const handleQuantityInput = (e, itemIndex) => {
    const value = e.target.value;
    const name = e.target.name;
    let _templateItems = [...template.items];
    _templateItems[itemIndex][name] = value;
    setTemplate({ ...template, items: _templateItems });
  };

  const handlePriceInput = (e, itemIndex) => {
    const value = e.target.value;
    const name = e.target.name;
    let _templateItems = [...template.items];
    _templateItems[itemIndex][name] = value;
    setTemplate({ ...template, items: _templateItems });
  };
  const handleSaveTemplate = () => {
    localStorage.setItem("templates", JSON.stringify([...templates, template]));
    setTemplates([...templates, template]);
  };

  const handleDeleteTemplateField = (index, optionIndex = -1) => {
    let _templateItems = [...template.items];
    if (optionIndex === -1) {
      _templateItems.splice(index, 1);
    } else {
      _templateItems[index].options.splice(optionIndex, 1);
    }
    setTemplate({ ...template, items: _templateItems });
  };
  const handleAddTemplate = () => {
    if (!newCategory) {
      return;
    }
    let _templateItems = [...template.items];
    let category;
    if (newCategory === ELEMENT_TYPES.SELECT) {
      category = {
        id: _templateItems.length + 1,
        label: "",
        type: ELEMENT_TYPES.SELECT,
        options: [{ id: 1, label: "", price: 0 }],
      };
    }
    if (newCategory === ELEMENT_TYPES.QUANTITY) {
      category = {
        id: _templateItems.length + 1,
        label: "",
        type: ELEMENT_TYPES.QUANTITY,
        price: 1800,
      };
      if (newCategory === ELEMENT_TYPES.PRICE) {
        category = {
          id: _templateItems.length + 1,
          label: "",
          type: ELEMENT_TYPES.PRICE,
        };
      }

      _templateItems.push(category);
      setTemplate({ ...template, items: _templateItems });
      setNewCategory(ELEMENT_TYPES.SELECT);
    }
  };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        width: "100%",
        margin: "0 auto",
        background: "#f2f2f2",
        padding: "15px",
        borderRadius: "5px",
        border: "1px solid #d7d7d7",
      }}
    >
      <h1 className="text-2xl">
        <b> Plantillas</b>
      </h1>
      <div className="flex w-full template-row">
        <TextField
          id="outlined-multiline-flexible"
          label="Ganancia"
          type="number"
          value={template.revenue}
          onChange={handleChangeRevenue}
          fullWidth
        />
      </div>
      {template?.items?.map((item, index) => {
        if (item.type === ELEMENT_TYPES.SELECT) {
          return (
            <>
              <div className="flex w-full template-row" key={item.id}>
                <div className="flex-grow">
                  <div className="flex w-full">
                    <div className="flex justify-between gap-x-2 flex-grow">
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Nombre de la categoría"
                        value={item.label}
                        onChange={(e) => handleSelectInput(e, index)}
                        fullWidth
                      />{" "}
                    </div>
                    <div className="w-auto px-3 pt-2">
                      <IconButton
                        size="small"
                        aria-label="add"
                        className="bordered-button"
                        onClick={() => handleDeleteTemplateField(index)}
                        color="error"
                        style={{ border: "1px solid #e1e1e1" }}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </div>
                  <div className="mx-5">
                    <div className=" flex justify-between items-center mt-3 mb-2 px-3">
                      <span>Opciones</span>
                      <div>
                        <IconButton
                          size="small"
                          aria-label="add"
                          className="bordered-button"
                          onClick={() => handleSelectAddOption(index)}
                          color="primary"
                          style={{ border: "1px solid #e1e1e1" }}
                        >
                          <Add />
                        </IconButton>
                      </div>
                    </div>
                    {item?.length === 0 ? (
                      <div className="text-center">No hay opciones</div>
                    ) : (
                      item.options?.map((option, optionIndex) => {
                        return (
                          <div key={option.id} className="flex w-full mt-4">
                            <div className="flex justify-between gap-x-2 flex-grow">
                              <TextField
                                id="outlined-multiline-flexible"
                                label="Nombre de la opción"
                                name="label"
                                value={option.label}
                                onChange={(e) =>
                                  handleSelectOption(e, index, optionIndex)
                                }
                                fullWidth
                              />
                              <TextField
                                id="outlined-multiline-flexible"
                                type="number"
                                name="price"
                                label="Precio"
                                value={option.price}
                                onChange={(e) =>
                                  handleSelectOption(e, index, optionIndex)
                                }
                                fullWidth
                              />
                            </div>
                            <div className="w-auto px-3 flex items-center justify-center">
                              <IconButton
                                size="small"
                                aria-label="add"
                                className="bordered-button"
                                onClick={() =>
                                  handleDeleteTemplateField(index, optionIndex)
                                }
                                color="error"
                                style={{ border: "1px solid #e1e1e1" }}
                              >
                                <Delete />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        }
        if (item.type === ELEMENT_TYPES.QUANTITY) {
          return (
            <>
              <div className="flex w-full template-row">
                <div
                  className="flex justify-between gap-x-2 flex-grow"
                  key={item.id}
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Nombre de la categoría"
                    name="label"
                    value={item.label}
                    onChange={(e) => handleQuantityInput(e, index)}
                    fullWidth
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Precio"
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleQuantityInput(e, index)}
                    fullWidth
                  />
                </div>
                <div className="flex justify-center items-center w-auto px-3">
                  <IconButton
                    size="small"
                    aria-label="add"
                    className="bordered-button"
                    onClick={() => handleDeleteTemplateField(index)}
                    color="error"
                    style={{ border: "1px solid #e1e1e1" }}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </div>
            </>
          );
        }
        if (item.type === ELEMENT_TYPES.PRICE) {
          return (
            <>
              <div className="flex w-full template-row">
                <div
                  className="flex justify-between gap-x-2 flex-grow"
                  key={item.id}
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Nombre de la categoría"
                    value={item.label}
                    name="label"
                    onChange={(e) => handlePriceInput(e, index)}
                    fullWidth
                  />
                </div>
                <div className="flex justify-center items-center w-auto px-3">
                  <IconButton
                    size="small"
                    aria-label="add"
                    className="bordered-button"
                    onClick={() => handleDeleteTemplateField(index)}
                    color="error"
                    style={{ border: "1px solid #e1e1e1" }}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </div>
            </>
          );
        }
      })}
      <div className="flex w-full template-row justify-center items-center gap-x-3">
        <FormControl
          style={{
            width: "50%",
          }}
        >
          <InputLabel id="demo-simple-select-label">
            Tipo de categoría
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Tipo de categoría"
            onChange={(e) => setNewCategory(e.target.value)}
            value={newCategory}
            size="small"
          >
            <MenuItem value={ELEMENT_TYPES.SELECT}>
              Categoría con opciones
            </MenuItem>
            <MenuItem value={ELEMENT_TYPES.QUANTITY}>
              Categoría a partir de cantidad
            </MenuItem>
            <MenuItem value={ELEMENT_TYPES.PRICE}>
              Categorías a partir de precio
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="info"
          startIcon={<Add />}
          onClick={() => handleAddTemplate()}
        >
          Añadir
        </Button>
      </div>
      <div className="text-center my-5">
        <Button variant="contained" onClick={handleSaveTemplate} size="large">
          Guardar
        </Button>
      </div>
    </Box>
  );
};

export default Templates;
