"use client";
import { BOX_STYLES, ELEMENT_TYPES } from "@/consts";
import { DATA_EXAMPLE } from "@/mock";
import { getStoreData, setStoreData } from "@/services/localStorageService";
import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Templates = () => {
  const [template, setTemplate] = useState({ revenue: 0, name: "", items: [] });
  const [newCategory, setNewCategory] = useState(ELEMENT_TYPES.SELECT);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getStoreData("template", []);
      if (storedData) setTemplate(storedData);
    };
    fetchData();
  }, []);

  const handleChangeTemplateInfo = (e) => {
    setTemplate({ ...template, [e.target.name]: e.target.value });
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
    let category = {
      label: "",
      id: Date.now(),
      type: newCategory,
    };
    if (newCategory === ELEMENT_TYPES.SELECT) {
      category = { ...category, options: [{ id: 1, label: "", price: 0 }] };
    }
    if (newCategory === ELEMENT_TYPES.QUANTITY) {
      category = { ...category, type: ELEMENT_TYPES.QUANTITY, price: 0 };
    }
    // if (newCategory === ELEMENT_TYPES.PRICE) {
    //   category = {
    //     type: ELEMENT_TYPES.PRICE,
    //   };
    _templateItems.push(category);
    setTemplate({ ...template, items: _templateItems });
    setNewCategory(ELEMENT_TYPES.SELECT);
  };

  const handleSetExampleTemplate = async () => {
    setTemplate(DATA_EXAMPLE);
  };

  const handleSaveTemplate = async () => {
    let _template = { ...template };
    _template.id = Date.now();
    let errors = [];
    _template.items.forEach((item) => {
      if (item.type === ELEMENT_TYPES.SELECT) {
        item.options.forEach((option) => {
          if (!option.label || !option.price) {
            errors.push(item.id + option.id);
          }
        });
        if (!item.label) {
          errors.push(item.id);
        }
      }
      if (item.type === ELEMENT_TYPES.QUANTITY) {
        if (!item.price || !item.label) {
          errors.push(item.id);
        }
      }
      if (item.type === ELEMENT_TYPES.PRICE) {
        if (!item.label) {
          errors.push(item.id);
        }
      }
    });
    !_template.name && errors.push(_template.name);
    !_template.revenue && errors.push(_template.revenue);
    if (errors.length) {
      toast.error("Por favor, llene todos los campos");
      return;
    }
    await setStoreData("template", _template);

    toast.success("Plantilla guardada");
  };
  return (
    <Box component="form" noValidate autoComplete="off" sx={BOX_STYLES}>
      <h1 className="text-2xl text-center my-2 relative">
        <b> Plantilla </b>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSetExampleTemplate}
          size="small"
          className="absolute right-0 text-capitalize"
        >
          <span> Ejemplo </span>
        </Button>
      </h1>
      <div className="flex flex-col gap-y-4 w-full template-row">
        <TextField
          id="outlined-multiline-flexible"
          label="Nombre de la plantilla"
          type="text"
          value={template?.name}
          name="name"
          onChange={handleChangeTemplateInfo}
          fullWidth
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Ganancia"
          type="number"
          value={template?.revenue}
          name="revenue"
          onChange={handleChangeTemplateInfo}
          fullWidth
        />
      </div>
      {template?.items?.map((item, index) => {
        if (item.type === ELEMENT_TYPES.SELECT) {
          return (
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
                <div className="mx-4">
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
                        <div
                          key={item.id + option.id}
                          className="flex w-full mt-4"
                        >
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
          );
        }
        if (item.type === ELEMENT_TYPES.QUANTITY) {
          return (
            <div className="flex w-full template-row" key={item.id}>
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
          );
        }
        if (item.type === ELEMENT_TYPES.PRICE) {
          return (
            <div className="flex w-full template-row" key={item.id}>
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
          color="secondary"
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
