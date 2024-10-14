"use client";
import React, { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Box } from "@mui/material";
import { Add, List, ListAlt, Sell } from "@mui/icons-material";
import Link from "next/link";
import { redirect } from "next/navigation";

export const Navigator = () => {
  const [value, setValue] = useState(0);

  return (
    <Box
      className="z-50 bg-white fixed bottom-0 left-0 right-0 w-full text-center p-3 sm:static sm:bottom-auto"
      elevation={3}
    >
      <BottomNavigation
        className="w-100 bg-transparent"
        showLabels
        style={{ justifyContent: "space-around" }}
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
      >
        <Link href="/templates">
          <BottomNavigationAction label="Plantillas" icon={<List />} />
        </Link>
        <Link href="/">
          <BottomNavigationAction label="Nuevo" icon={<Add />} />
        </Link>
        <Link href="/pricelist">
          <BottomNavigationAction label="Precios" icon={<ListAlt />} />
        </Link>
        {/* <Link href="/sales">
          <BottomNavigationAction label="Ventas" icon={<Sell />} />
        </Link> */}
      </BottomNavigation>
    </Box>
  );
};
