"use client";
import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Box } from "@mui/material";
import { Add, List, ListAlt, Sell } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const Navigator = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(() => {
    if (pathname === "/") {
      return 1;
    }
    if (pathname === "/pricelist") {
      return 2;
    }
    if (pathname === "/sales") {
      return 3;
    }
    if (pathname === "/template") {
      return 0;
    }
  });

  const handleNavigation = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push("/template");
        break;
      case 1:
        router.push("/");
        break;
      case 2:
        router.push("/pricelist");
        break;
      case 2:
        router.push("/sales");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <Box
      className="z-50 bg-white fixed bottom-0 left-0 right-0 w-full text-center p-2"
      elevation={3}
    >
      <BottomNavigation
        className="w-100 bg-transparent"
        showLabels
        style={{ justifyContent: "space-around" }}
        value={value}
        onChange={(e, newValue) => {
          handleNavigation(newValue);
        }}
      >
        <BottomNavigationAction label="Plantillas" icon={<List />} />
        <BottomNavigationAction label="Nuevo" icon={<Add />} />
        <BottomNavigationAction label="Precios" icon={<ListAlt />} />
        {/* <BottomNavigationAction label="Ventas" icon={<Sell />} /> */}
      </BottomNavigation>
    </Box>
  );
};
