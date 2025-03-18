import { useState } from "react";

import floatingBlack from "../../assets/image/button/floatingBlack.svg";
import floatingWhite from "../../assets/image/button/floatingWhite.svg";

import "./FloatingBtn.css";

const FloatingBtn = ({ ...props }) => {
  const [active, setActive] = useState(false);

  return (
    <button
      className="__floating-btn__ f-center"
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      {...props}
    >
      <img src={!active ? floatingBlack : floatingWhite} alt="^" />
    </button>
  );
};

export default FloatingBtn;
