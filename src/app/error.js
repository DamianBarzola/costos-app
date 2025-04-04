"use client";

import { BOX_STYLES } from "@/consts";
import { Box } from "@mui/material";

export default function error() {
  return (
    <Box component="div" sx={BOX_STYLES}>
      <div className="my-10">
        <h1 className="text-2xl text-center my-2">
          <b>¡Algo salió mal!</b>
        </h1>
        <p>
          Ha ocurrido un error inesperado. Por favor, intenta nuevamente más
          tarde.
        </p>
        <div className="text-center mt-4">
          <a href="/">🔄 Ir a inicio</a>
        </div>
      </div>
    </Box>
  );
}
