"use client";
import { AccountCircle, Search } from "@mui/icons-material";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const PriceList = () => {
  const [search, setSearch] = useState("");
  const [infoDialog, setInfoDialog] = useState(false);
  const [productSelected, setProductSelected] = useState(null);

  const [productList, setProductList] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  const handleSelectProduct = (product) => {
    setProductSelected(product);
    setInfoDialog(true);
  };

  const filteredProducts = productList.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          margin: "0 auto",
          background: "#f2f2f2",
          padding: "15px",
          borderRadius: "5px",
          border: "1px solid #d7d7d7",
        }}
      >
        <h1 className="text-2xl">
          <b> Lista de Precios</b>
        </h1>
        <hr className="mb-3" />
        <div className="flex justify-between text-lg">
          <h6>
            <b>Productos</b>
          </h6>
          <span>
            <b>Precios</b>
          </span>
        </div>
        <hr className="mb-3" />

        <div className="mb-2">
          <TextField
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
        {filteredProducts?.length === 0 ? (
          <div className="text-center">No hay productos</div>
        ) : (
          <>
            {filteredProducts.map((item, index) => (
              <div
                key={"product-" + index}
                className="flex justify-between items-center my-1 w-auto"
                onClick={() => handleSelectProduct(item)}
              >
                <span className="truncate" style={{ width: "inherit" }}>
                  {item.name}
                </span>
                <span style={{ width: "100px" }}>
                  {"$ " + (item.total ?? "-")}
                </span>
              </div>
            ))}
          </>
        )}
      </Box>
      <Dialog open={infoDialog} onClose={() => setInfoDialog(false)}>
        <DialogTitle>
          <b>Información del producto</b>
        </DialogTitle>
        <DialogContent>
          <div>
            <div>
              <b>Nombre</b>
              <p>{productSelected?.name ?? "-"}</p>
            </div>
            <div>
              <b>Descripción</b>
              <p>{productSelected?.description ?? "-"}</p>
            </div>
            <div>
              <b>Costo</b>
              <p>{"$ " + productSelected?.cost}</p>
            </div>
            <div>
              <b>Ganancia</b>
              <p>{"$ " + productSelected?.revenue}</p>
            </div>
            <div>
              <b>Precio</b>
              <p>{"$ " + productSelected?.total}</p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PriceList;
