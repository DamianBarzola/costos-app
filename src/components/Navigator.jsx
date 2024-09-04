"use client";
import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Paper } from "@mui/material";
import { Add, ListAlt, Sell } from "@mui/icons-material";

export const Navigator = () => {
  const [value, setValue] = useState(0);
  return (
    <Box
      className="bg-transparent bg-red-100 fixed bottom-0 left-0 right-0 w-full text-center p-4 sm:static sm:bottom-auto"
      elevation={3}
    >
      <BottomNavigation
        className="w-100 bg-transparent "
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Nuevo" icon={<Add />} />
        <BottomNavigationAction label="Precios" icon={<ListAlt />} />
        <BottomNavigationAction label="Ventas" icon={<Sell />} />
      </BottomNavigation>
    </Box>
  );
};
