"use client";
import { ELEMENT_TYPES } from "@/consts";
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

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
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
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
      <hr className="mb-3" />
      <div>
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
            <div key={item.id}>
              <TextField
                id="outlined-multiline-flexible"
                label="Nombre"
                value={item.label}
                onChange={(e) => handleSelectInput(e, index)}
                fullWidth
              />
              <div>
                <div className=" flex justify-between items-center mt-2 mb-4">
                  <i>Opciones</i>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleSelectAddOption(index)}
                  >
                    +
                  </Button>
                </div>{" "}
                {item?.length === 0 ? (
                  <div className="text-center">No hay opciones</div>
                ) : (
                  item.options?.map((option, optionIndex) => {
                    return (
                      <div
                        className="flex justify-between gap-x-2 mb-5"
                        key={option.id}
                      >
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Nombre"
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
                    );
                  })
                )}
              </div>
              <hr />
            </div>
          );
        }
        if (item.type === ELEMENT_TYPES.QUANTITY) {
          return (
            <>
              <div className="flex justify-between gap-x-2" key={item.id}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Nombre"
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
              <hr />
            </>
          );
        }
        if (item.type === ELEMENT_TYPES.PRICE) {
          return (
            <>
              <div className="flex justify-between gap-x-2" key={item.id}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Nombre"
                  value={item.label}
                  name="label"
                  onChange={(e) => handlePriceInput(e, index)}
                  fullWidth
                />
              </div>
              <hr />
            </>
          );
        }
      })}

      <div className="text-center">
        <Button variant="contained" onClick={handleSaveTemplate}>
          Guardar
        </Button>
      </div>
    </Box>
  );
};

export default Templates;
