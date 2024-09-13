"use client";
import { Navigator } from "@/components/Navigator.jsx";
import { Box, MenuItem, TextField } from "@mui/material";
const Data = [
  {
    id: 1,
    label: "Tela",
    type: "select",
    amount: 1,
    price: null,
    subtotal: null,
    optionSelected: null,
    options: [
      { id: 1, label: "Tela 1", price: 500 },
      { id: 2, label: "Tela 2", price: 500 },
    ],
  },
  { id: 2, label: "Volado", type: "price", price: null, subtotal: null },
  { id: 3, label: "Cinta", type: "price", price: null, subtotal: null },
  {
    id: 4,
    label: "Etiqueta Eco",
    type: "quantity",
    price: 150,
    amount: 1,
    subtotal: null,
  },
  {
    id: 5,
    label: "Etiqueta",
    type: "quantity",
    price: 50,
    amount: 1,
    subtotal: null,
  },
  { id: 6, label: "Hilos", type: "price", price: null, subtotal: null },
  {
    id: 7,
    label: "Mano de obra",
    type: "quantity",
    price: 1800,
    amount: 1,
    subtotal: null,
  },
  {
    id: 8,
    label: "Bolsa",
    type: "quantity",
    price: 50,
    amount: 1,
    subtotal: null,
  },
];

function RowField({ rowData }) {
  const handleSelect = (e) => {
    rowData.optionSelected = rowData.options.find(
      (item) => item.id == e.target.value
    );
    rowData.subtotal = rowData.amount * rowData.optionSelected?.price;
  };
  const handleChange = (e) => {
    rowData.amount = e.target.value;
    rowData.subtotal = rowData.amount * rowData.optionSelected?.price;
  };
  return (
    <div className="flex justify-between gap-x-2">
      <div className="w-4/5">
        {rowData.type === "select" ? (
          <div className="flex justify-around gap-x-3 w-100">
            <TextField
              select
              variant="outlined"
              fullWidth
              label={rowData.label}
              value={rowData.optionSelected?.id}
              onChange={handleSelect}
            >
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
            />
          </div>
        ) : rowData.type === "quantity" ? (
          <TextField
            label={rowData.label + " ($" + rowData.price + ")"}
            variant="outlined"
            type="number"
            fullWidth
          />
        ) : (
          rowData.type === "price" && (
            <TextField
              label={rowData.label}
              variant="outlined"
              type="number"
              fullWidth
            />
          )
        )}
      </div>
      <div className="w-1/5 flex justify-center items-center">
        <span>{rowData.subtotal ?? "-"}</span>
      </div>
    </div>
  );
}

export default function Home() {
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
          {Data.map((item) => (
            <RowField rowData={item} key={item.id} />
          ))}
        </Box>
        <Navigator />
      </main>
    </div>
  );
}
