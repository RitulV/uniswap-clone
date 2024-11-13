import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./HeroSection.module.css";
import images from "../../assets";
import { Token, SearchToken } from "../index";

//context
import { SwapTokenContext } from "../../Context/SwapContext";

const HeroSection = ({ tokenData }) => {
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokensTwo, setOpenTokensTwo] = useState(false);

  const { singleSwapToken, connectWallet, account, ether, dai } =
    useContext(SwapTokenContext);

  // TOKEN_ONE
  const [tokenOne, setTokenOne] = useState({
    name: "",
    image: "",
  });

  // TOKEN_TWO
  const [tokenTwo, setTokenTwo] = useState({
    name: "",
    image: "",
  });

  return (
    <div className={Style.HeroSection}>
      <div className={Style.HeroSection_box}>
        <div className={Style.HeroSection_box_heading}>
          <p>Swap</p>
          <div className={Style.HeroSection_box_heading_img}>
            <Image
              src={images.close}
              alt="image"
              height={50}
              width={50}
              onClick={() => setOpenSetting(true)}
            />
          </div>
        </div>

        <div className={Style.HeroSection_box_input}>
          <input type="text" placeholder="0" />
          <button onClick={() => setOpenToken(true)}>
            <Image
              src={images.image || images.etherlogo}
              alt="ether"
              height={20}
              width={20}
            />
            {tokenOne.name || "ETH"}
            <small>{ether}</small>
          </button>
        </div>

        <div className={Style.HeroSection_box_input}>
          <input type="text" placeholder="0" />
          <button onClick={() => setOpenTokensTwo(true)}>
            <Image
              src={tokenTwo.image || images.etherlogo}
              alt="ether"
              height={20}
              width={20}
            />
            {tokenTwo.name || "ETH"}
            <small>{dai}</small>
          </button>
        </div>

        {account ? (
          <button
            className={Style.HeroSection_box_btn}
            onClick={() => singleSwapToken()}
          >
            Swap
          </button>
        ) : (
          <button
            onClick={() => connectWallet()}
            className={Style.HeroSection_box_btn}
          >
            Connect Wallet
          </button>
        )}
      </div>

      {openSetting && <Token setOpenSetting={setOpenSetting} />}

      {openToken && (
        <SearchToken
          openToken={setOpenToken}
          tokens={setTokenOne}
          tokenData={tokenData}
        />
      )}

      {openTokensTwo && (
        <SearchToken
          openToken={setOpenTokensTwo}
          tokens={setTokenTwo}
          tokenData={tokenData}
        />
      )}
    </div>
  );
};

export default HeroSection;
