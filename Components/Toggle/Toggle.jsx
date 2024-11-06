import React from "react";

import Style from "./Toggle.module.css";

const Toggle = ({ Label })  => {
  return (
    <div className={Style.Toggle}>
      <div className={Style.Toggle_switch_box}>
        <input
          type="checkbox"
          className={Style.Toggle_checkbox}
          name={Label}
          id={Label}
        />
        <label htmlFor={Label} className={Style.Toggle_label}>
          <span className={Style.Toggle_inner} />
          <span className={Style.Toggle_switch} />
        </label>
      </div>
    </div>
  );
};

export default Toggle;
