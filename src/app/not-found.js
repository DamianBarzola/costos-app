import { BOX_STYLES } from "@/consts";
import { Box } from "@mui/material";

export default function NotFound() {
  return (
    <Box component="div" sx={BOX_STYLES}>
      <div className="my-10">
        <h1 className="text-2xl text-center my-2">
          <b>Página no encontrada</b>
        </h1>
        <p>
          Parece que la dirección que ingresaste no es válida o el contenido fue
          movido.
        </p>
        <div className="text-center mt-4">
          <a href="/">🔄 Ir a inicio</a>
        </div>
      </div>
    </Box>
  );
}
