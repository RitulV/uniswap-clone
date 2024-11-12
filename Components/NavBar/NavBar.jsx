import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import Style from "./NavBar.module.css";
import images from "../../assets";
import { Model, TokenList } from "../index";

//context
import { SwapTokenContext } from "../../Context/SwapContext";

const NavBar = () => {
  const { ether, account, networkConnect, connectWallet, tokenData } =
    useContext(SwapTokenContext);
  const menuItems = [
    {
      name: "Swap",
      link: "/",
    },
    {
      name: "Tokens",
      link: "/",
    },
    {
      name: "Pools",
      link: "/",
    },
  ];

  const [openModel, setOpenModel] = useState(false);
  const [openTokenBox, setOpenTokenBox] = useState(false);
  // const [account, setAccount] = useState(false);

  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        {/* LEFT_SECTION */}
        <div className={Style.NavBar_box_left}>
          {/* LOGO_IMAGE */}
          <div className={Style.NavBar_box_left_img}>
            {/* <Image src={images.uniswap} alt="logo" height={50} width={50} /> */}
          </div>

          {/* MENU_ITEMS */}
          <div className={Style.NavBar_box_left_menu}>
            {menuItems.map((el, i) => (
              <Link
                key={i + 1}
                href={{ pathname: `${el.name}`, query: `${el.link}` }}
              >
                <p className={Style.NavBar_box_left_menu_item}>{el.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* MIDDLE_SECTION */}
        <div className={Style.NavBar_box_middle}>
          <div className={Style.NavBar_box_middle_search}>
            <div className={Style.NavBar_box_middle_search_img}>
              <Image src={images.search} alt="logo" height={20} width={20} />
            </div>
            {/* INPUT_SECTION */}
            <input type="text" placeholder="Search Tokens" />
          </div>
        </div>

        {/* RIGHT_SECTION */}
        <div className={Style.NavBar_box_right}>
          <div className={Style.NavBar_box_right_box}>
            <div className={Style.NavBar_box_right_box_img}>
              <Image src={images.ether} alt="NetWork" height={30} width={30} />
            </div>
            <p>{networkConnect}</p>
          </div>
          {/* this button will open and close the model  */}
          {account ? (
            <button onClick={() => setOpenTokenBox(true)}>
              {account.slice(0, 20)}...
            </button>
          ) : (
            <button onClick={() => setOpenModel(true)}>Connect</button>
          )}

          {openModel && (
            <Model setOpenModel={setOpenModel} connectWallet={connectWallet} />
          )}
        </div>
      </div>

      {/* TOKENLIST_COMPONENT */}
      {openTokenBox && (
        <TokenList setOpenTokenBox={setOpenTokenBox} tokenDate={tokenData} />
      )}
    </div>
  );
};

export default NavBar;
