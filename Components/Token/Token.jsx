import React, { useState, useEffect } from "react";
import Image from "next/image";

import Style from "./Token.module.css";
import images from "../../assets";
import { Toggle } from "../index";

const Token = ({ setOpenSetting }) => {
  return (
    <div className={Style.Token}>
      <div className={Style.Token_box}>
        <div className={Style.Token_box_heading}>
          <h4>Setting</h4>
          <Image
            src={images.close}
            alt="close"
            height={50}
            width={50}
            onClick={() => setOpenSetting (false)}
          />
        </div>

        <p className={Style.Token_box_para}>
          Slippage Tolerance{""}
          <Image src={images.lock} alt="img" height={20} width={20} />
        </p>
        <div className={Style.Token_box_input}>
          <button>Auto</button>
          <input type="text" placeholder="0.10%" />
        </div>

        <p className={Style.Token_box_para}>
          Slippage Tolerance{""}
          <Image src={images.lock} alt="img" height={20} width={20} />
        </p>
        <div className={Style.Token_box_input}>
          <input type="text" placeholder="30" />
          <button>minutes</button>
        </div>

        <h2>Interface Setting</h2>
        <div className={Style.Token_box_toggle}>
          <p className={Style.Token_box_para}>Transaction deadline</p>
          <Toggle />
        </div>
      </div>
    </div>
  );
};

export default Token;
