"use client";
import { BOX_STYLES, SORT_COLUMNS, SORT_OPTIONS } from "@/consts";
import { getStoreData, setStoreData } from "@/services/localStorageService";
import { ArrowDropDown, Search, Sort, SwapVert } from "@mui/icons-material";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const PriceList = () => {
  const [search, setSearch] = useState("");
  const [infoDialog, setInfoDialog] = useState(false);
  const [productSelected, setProductSelected] = useState(null);

  const [productList, setProductList] = useState([]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: SORT_OPTIONS.DESC,
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getStoreData("products", []);
      if (storedData) setProductList(storedData);
    };
    fetchData();
  }, []);

  const handleSelectProduct = (product) => {
    setProductSelected(product);
    setInfoDialog(true);
  };

  const deleteProduct = async () => {
    const _productList = productList.filter((p) => p.id !== productSelected.id);
    await setStoreData("products", _productList);

    setProductList(_productList);

    setInfoDialog(false);
    setProductSelected(null);
  };

  const handleSortData = (key) => {
    setSortConfig({
      key: key,
      direction:
        sortConfig.direction === SORT_OPTIONS.ASC
          ? SORT_OPTIONS.DESC
          : SORT_OPTIONS.ASC,
    });
  };

  const filteredProducts = productList
    .filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      const { key, direction } = sortConfig;
      if (!key) return 0;
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  console.log(sortConfig);
  console.log(filteredProducts);
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
          <div className="flex justify-between text-lg  ">
            <div
              className="w-8/12 min-w-min cursor-pointer p-2 bg-gray-200 border-b-2 border-gray-300 hover:bg-gray-300"
              onClick={() => handleSortData(SORT_COLUMNS.PRODUCT)}
            >
              <h6>
                <b>Productos</b>
                {sortConfig.key === SORT_COLUMNS.PRODUCT ? (
                  <ArrowDropDown
                    fontSize="10px"
                    sx={{
                      transform:
                        sortConfig.direction !== SORT_OPTIONS.ASC &&
                        "scaleY(-1)",
                    }}
                  />
                ) : (
                  <SwapVert fontSize="8px" />
                )}
              </h6>
            </div>
            <div
              className="w-4/12 min-w-32 cursor-pointer  p-2 bg-gray-200 border-b-2 border-gray-300 hover:bg-gray-300"
              onClick={() => handleSortData(SORT_COLUMNS.PRICE)}
            >
              <span>
                <b>Precios</b>
                {sortConfig.key === SORT_COLUMNS.PRICE ? (
                  <ArrowDropDown
                    fontSize="10px"
                    sx={{
                      transform:
                        sortConfig.direction !== SORT_OPTIONS.ASC &&
                        "scaleY(-1)",
                    }}
                  />
                ) : (
                  <SwapVert fontSize="8px" />
                )}
              </span>
            </div>
          </div>

          {filteredProducts?.length === 0 ? (
            <div className="text-center my-3">No hay productos</div>
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
          <Button color="error" onClick={deleteProduct}>
            Eliminar Producto
          </Button>
          <Button onClick={() => setInfoDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PriceList;
