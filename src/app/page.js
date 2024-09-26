"use client";
import { Navigator } from "@/components/Navigator.jsx";
import { Box, MenuItem, TextField } from "@mui/material";
import { ELEMENT_TYPES } from "@/consts";
import { useEffect } from "react";
import { useState } from "react";

let Data = [
  {
    id: 1,
    label: "Tela",
    type: ELEMENT_TYPES.SELECT,
    amount: 1,
    // price: null,
    subtotal: null,
    optionSelected: "",
    options: [
      { id: 1, label: "Tela 1", price: 500 },
      { id: 2, label: "Tela 2", price: 500 },
    ],
  },
  {
    id: 2,
    label: "Volado",
    type: ELEMENT_TYPES.PRICE,
    price: 0,
    subtotal: null,
  },
  {
    id: 3,
    label: "Cinta",
    type: ELEMENT_TYPES.PRICE,
    price: 0,
    subtotal: null,
  },
  {
    id: 4,
    label: "Etiqueta Eco",
    type: ELEMENT_TYPES.QUANTITY,
    price: 150,
    amount: 1,
    subtotal: null,
  },
  {
    id: 5,
    label: "Etiqueta",
    type: ELEMENT_TYPES.QUANTITY,
    price: 50,
    amount: 1,
    subtotal: null,
  },
  {
    id: 6,
    label: "Hilos",
    type: ELEMENT_TYPES.PRICE,
    price: 0,
    subtotal: null,
  },
  {
    id: 7,
    label: "Mano de obra",
    type: ELEMENT_TYPES.QUANTITY,
    price: 1800,
    amount: 1,
    subtotal: null,
  },
  {
    id: 8,
    label: "Bolsa",
    type: ELEMENT_TYPES.QUANTITY,
    price: 50,
    amount: 1,
    subtotal: null,
  },
];

let revenue = 50;

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
              value={rowData.optionSelected.id ?? ""}
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
              value={rowData.amount}
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
            value={rowData.amount}
            fullWidth
            min={0}
          />
        ) : (
          rowData.type === ELEMENT_TYPES.PRICE && (
            <TextField
              label={rowData.label}
              variant="outlined"
              type="number"
              onChange={handleChange}
              min={0}
              value={rowData.price}
              fullWidth
            />
          )
        )}
      </div>
      <div className="w-1/5 flex justify-center items-center">
        <span>{rowData.subtotal ? "$ " + rowData.subtotal : "-"}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState(Data);

  useEffect(() => {
    let mappedSubtotal = Data.map((item) => {
      if (item.type === ELEMENT_TYPES.SELECT) {
        item.subtotal = 0;
      } else if (item.type === ELEMENT_TYPES.QUANTITY) {
        item.subtotal = item.amount * item.price;
      } else if (item.type === ELEMENT_TYPES.PRICE) {
        item.subtotal = item.price;
      }
      return item;
    });

    setData(mappedSubtotal);
  }, []);

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
  console.log(data);
  const total = data.reduce(
    (acc, item) => Number(acc) + (Number(item.subtotal) ?? 0),
    0
  );

  const revenueAmount = (total * revenue) / 100;

  const finalAmount = total + revenueAmount;
  return (
    <div className="flex justify-center min-h-screen">
      <main className="w-full max-w-[750px] px-4 sm:px-6 lg:px-8">
        <header className="my-4">
          <h1>App</h1>
        </header>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          {data.map((item, index) => (
            <RowField
              rowData={item}
              key={item.id}
              handleChange={(e) => handleChange(e, index)}
              handleSelect={(e) => handleSelect(e, index)}
            />
          ))}
          <hr />
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            <div className="flex justify-end px-2 mb-2">
              <h6>Total sin ganancia: $ {total.toFixed(2)}</h6>
            </div>
            <div className="flex justify-end px-2 mb-2">
              <h6>
                Ganancia del {revenue}%: $ {revenueAmount.toFixed(2)}
              </h6>
            </div>
            <div className="flex justify-end px-2 mb-2">
              <h6>Total : $ {finalAmount.toFixed(2)}</h6>
            </div>
          </div>
        </Box>
        <Navigator />
      </main>
    </div>
  );
}
