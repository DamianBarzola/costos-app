import { Navigator } from "@/components/Navigator.jsx";
import { Box, Input, MenuItem, TextField } from "@mui/material";
const Data = [
  {
    id: 1,
    name: "Tela",
    type: "select",
    amount: 1,
    price: null,
    subtotal: null,
    options: [
      { id: 1, name: "Tela 1", price: 500 },
      { id: 2, name: "Tela 2", price: 500 },
    ],
  },
  { id: 2, name: "Volado", type: "price", price: null, subtotal: null },
  { id: 3, name: "Cinta", type: "price", price: null, subtotal: null },
  {
    id: 4,
    name: "Etiqueta Eco",
    type: "quantity",
    price: 150,
    amount: 1,
    subtotal: null,
  },
  {
    id: 5,
    name: "Etiqueta",
    type: "quantity",
    price: 50,
    amount: 1,
    subtotal: null,
  },
  { id: 6, name: "Hilos", type: "price", price: null, subtotal: null },
  {
    id: 7,
    name: "Mano de obra",
    type: "quantity",
    price: 1800,
    amount: 1,
    subtotal: null,
  },
  {
    id: 8,
    name: "Bolsa",
    type: "quantity",
    price: 50,
    amount: 1,
    subtotal: null,
  },
];

function RowField({ rowData }) {
  return (
    <div className="flex justify-between gap-x-2">
      <div className="w-4/5">
        {rowData.type === "select" ? (
          <div className="flex justify-around gap-x-3 w-100">
            <TextField label={rowData.name} select variant="outlined" fullWidth>
              {rowData.options.map((item) => (
                <MenuItem key={item.id}>{item.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Cantidad"
              variant="outlined"
              type="number"
              fullWidth
            />
          </div>
        ) : rowData.type === "quantity" ? (
          <TextField
            label={rowData.name}
            variant="outlined"
            type="number"
            fullWidth
          />
        ) : (
          rowData.type === "price" && (
            <TextField
              label={rowData.name}
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
    <div class="flex justify-center min-h-screen">
      <main class="w-full max-w-[750px] px-4 sm:px-6 lg:px-8">
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
