import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const Header = () => {
  return (
    <>
      <header className="py-1 fixed flex bg-white w-full top-0 left-0 z-10">
        <div className="w-full max-w-[750px] px-3 flex mx-auto">
          <ShoppingBagIcon sx={{ fontSize: 35 }} />
          <h1 style={{ fontSize: "30px" }}>
            <b>Costos App</b>
          </h1>
        </div>
      </header>
    </>
  );
};

export default Header;
