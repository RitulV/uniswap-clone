import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

import Style from "./Model.module.css";
import images from "../../assets";

const Model = ({ setOpenModel, connectWallet }) => {
  const walletMenu = ["MetaMask", "Coinbase", "Wallet", "WalletConnect "];

  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_heading}>
          <p>Connect a wallet</p>
          <div className={Style.Model_box_heading_img}>
            <Image
              src={images.close}
              alt="logo"
              height={50}
              width={50}
              onClick={() => setOpenModel(false)}
            />
          </div>
        </div>

        <div className={Style.Model_box_wallet}>
          {walletMenu.map((el, i) => (
            <p key={i + 1} onClick={() => connectWallet()}>
              {" "}
              {el}
            </p>
          ))}
        </div>

        <p className={Style.Model_box_para}>By connecting to the wallet, you agree to <br /> Terms of Service  and consent to its Privacy Policy.</p>
      </div>
    </div>
  );
};

export default Model;
