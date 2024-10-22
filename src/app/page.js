"use client";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { BOX_STYLES, ELEMENT_TYPES } from "@/consts";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "sonner";

function RowField({ rowData, handleSelect, handleChange }) {
  return (
    <div className="flex justify-between gap-x-2">
      <div className="w-4/5">
        {rowData.type === ELEMENT_TYPES.SELECT ? (
          <div className="flex justify-around gap-x-3 w-100">
            <TextField
              select
              variant="outlined"
              fullWidth
              label={rowData.label}
              value={rowData.optionSelected?.id ?? ""}
              onChange={handleSelect}
            >
              <MenuItem value="" disabled>
                Seleccione una opción
              </MenuItem>
              {rowData.options.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label + " ($" + item.price + ")"}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Cantidad"
              variant="outlined"
              type="number"
              onChange={handleChange}
              value={rowData.amount || ""}
              fullWidth
              min={0}
            />
          </div>
        ) : rowData.type === ELEMENT_TYPES.QUANTITY ? (
          <TextField
            label={rowData.label + " ($" + rowData.price + ")"}
            variant="outlined"
            type="number"
            onChange={handleChange}
            value={rowData.amount || ""}
            min={0}
            fullWidth
          />
        ) : (
          rowData.type === ELEMENT_TYPES.PRICE && (
            <TextField
              label={rowData.label}
              variant="outlined"
              type="number"
              onChange={handleChange}
              value={rowData.price || ""}
              min={0}
              fullWidth
            />
          )
        )}
      </div>
      <div className="w-1/5 flex justify-end pe-2 items-center">
        <span>{"$ " + rowData.subtotal}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [template, setTemplate] = useState(
    localStorage.getItem("template")
      ? JSON.parse(localStorage.getItem("template"))
      : {
          revenue: 0,
          name: "",
          items: [],
        }
  );
  const [info, setInfo] = useState({ name: "", description: "" });
  const revenue = useRef(
    localStorage.getItem("template")
      ? Number(JSON.parse(localStorage.getItem("template")).revenue)
      : 40
  );

  const initializeData = (template) => {
    let mappedSubtotal = template.items.map((item) => {
      if (item.type === ELEMENT_TYPES.SELECT) {
        item.subtotal = 0;
        item.optionSelected = item?.options[0];
        item.amount = 1;
        item.subtotal = item.amount * item.optionSelected?.price;
      } else if (item.type === ELEMENT_TYPES.QUANTITY) {
        item.amount = 1;
        item.subtotal = item.amount * item.price;
      } else if (item.type === ELEMENT_TYPES.PRICE) {
        item.price = 0;
        item.subtotal = item.price;
      }
      return item;
    });

    setData(mappedSubtotal);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    initializeData(template);
  }, [template]);

  const handleSelect = (e, index) => {
    const value = Number(e.target.value);
    let row = data[index];
    row.optionSelected = row.options.find((item) => item.id == value);
    row.subtotal = row.amount * row.optionSelected?.price;
    setData([...data]);
  };

  const handleChange = (e, index) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      let row = data[index];
      if (row.type === ELEMENT_TYPES.SELECT) {
        row.amount = value;
        row.subtotal = row.amount * row.optionSelected?.price;
      } else if (row.type === ELEMENT_TYPES.QUANTITY) {
        row.amount = value;
        row.subtotal = row.amount * row.price;
      } else if (row.type === ELEMENT_TYPES.PRICE) {
        row.price = value;

        row.subtotal = row.price;
      }
      setData([...data]);
    }
  };
  const handleChangeInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!info.name || !info.description) {
      toast.error("Por favor, llene todos los campos");
      return;
    }
    let list = localStorage.getItem("products");
    if (list) {
      list = JSON.parse(list);
      list.push({
        ...info,
        data: data,
        revenue: revenueAmount,
        cost: total,
        total: finalAmount,
      });
      localStorage.setItem("products", JSON.stringify(list));
    } else {
      localStorage.setItem(
        "products",
        JSON.stringify([
          {
            ...info,
            data: data,
            revenue: revenueAmount,
            cost: total,
            final: finalAmount,
          },
        ])
      );
    }
    initializeData(template);
    setInfo({ name: "", description: "" });
    toast.success("Producto guardado con exito");
  };

  const total = data
    .reduce((acc, item) => Number(acc) + (Number(item.subtotal) ?? 0), 0)
    .toFixed(2);

  const revenueAmount = Number((total * revenue.current) / 100).toFixed(2);
  const finalAmount = (Number(total) + Number(revenueAmount)).toFixed(2);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box component="form" noValidate autoComplete="off" sx={BOX_STYLES}>
      <h1 className="text-2xl text-center my-2">
        <b> Calcular costo</b>
      </h1>
      <div className="flex flex-col gap-y-4 w-full template-row">
        <TextField
          label={"Nombre del producto"}
          variant="outlined"
          type="text"
          name="name"
          onChange={handleChangeInfo}
          value={info.name}
          fullWidth
        />
        <TextField
          label={"Descripción del producto"}
          variant="outlined"
          type="text"
          name="description"
          multiline
          onChange={handleChangeInfo}
          value={info.description}
          fullWidth
        />
        {data.map((item, index) => (
          <RowField
            rowData={item}
            key={item.id}
            handleChange={(e) => handleChange(e, index)}
            handleSelect={(e) => handleSelect(e, index)}
          />
        ))}
        <hr />
        <div style={{ fontSize: "17px", fontWeight: "500" }}>
          <div className="flex justify-between px-2 mb-2">
            <p>Total sin ganancia</p>
            <p>$ {total}</p>
          </div>
          <div className="flex justify-between px-2 mb-2">
            <p> Ganancia del {revenue.current}%</p>
            <p>$ {revenueAmount}</p>
          </div>
          <div className="flex justify-between px-2 mb-2 font-bold">
            <p> Total</p>
            <p>$ {finalAmount}</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button variant="contained" onClick={handleSave} size="large">
            Guardar
          </Button>
        </div>
      </div>
    </Box>
  );
}
