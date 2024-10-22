"use client";
import { BOX_STYLES } from "@/consts";
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

  const [productList, setProductList] = useState(() => {
    if (typeof window !== "undefined") {
      const products = localStorage.getItem("products");
      return products ? JSON.parse(products) : [];
    }
    return [];
  });

  const handleSelectProduct = (product) => {
    setProductSelected(product);
    setInfoDialog(true);
  };

  const filteredProducts = productList.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Box component="div" sx={BOX_STYLES}>
        <h1 className="text-2xl text-center my-2">
          <b> Lista de precios</b>
        </h1>
        <div className="flex flex-col w-full template-row overflow-auto min-w-fit">
          <div className="mb-3">
            <TextField
              variant="outlined"
              label="Buscar productos"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <div className="flex justify-between text-lg bg-gray-200 border-b-2 border-gray-300 p-2">
            <div className="w-8/12 min-w-min ">
              <h6>
                <b>Productos</b>
              </h6>
            </div>
            <div className="w-4/12 min-w-32">
              <span>
                <b>Precios</b>
              </span>
            </div>
          </div>

          {filteredProducts?.length === 0 ? (
            <div className="text-center">No hay productos</div>
          ) : (
            <>
              {filteredProducts.map((item, index) => (
                <div
                  key={"product-" + index}
                  className="flex justify-between items-center w-auto py-3 border-b-2 border-gray-300 cursor-pointer active:bg-gray-300"
                  onClick={() => handleSelectProduct(item)}
                >
                  <div className="w-8/12 min-w-min">
                    <span className="ps-1">{item.name}</span>
                  </div>
                  <div className="w-4/12 min-w-32">
                    <span>{"$ " + (item.total ?? "-")}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </Box>
      <Dialog open={infoDialog} onClose={() => setInfoDialog(false)}>
        <DialogTitle>
          <b>Información del producto</b>
        </DialogTitle>
        <DialogContent>
          <div>
            <div>
              <b>Nombre</b>
              <p>{productSelected?.name || "-"}</p>
            </div>
            <div>
              <b>Descripción</b>
              <p>{productSelected?.description || "-"}</p>
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
