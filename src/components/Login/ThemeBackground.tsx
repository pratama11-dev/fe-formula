import useWindowSize from "@utils/helpers/ReactHelper";
import { useMemo } from "react";
import { Image } from "antd";
import themeColor from "@configs/theme/themeColor";

function ThemeBackground() {
  const windowDimension = useWindowSize();
  const isTablet = useMemo(() => {
    if (windowDimension.width) {
      return windowDimension.width! <= 768;
    }
    return false;
  }, [windowDimension]);

  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        margin: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          right: 0,
          width: "50%",
        }}
      >
        <span
          style={{
            display: "block",
            backgroundColor: themeColor.signatureColor,
            width: "190%",
            height: "200vh",
            position: "absolute",
            transform: "rotateZ(-25deg)",
            top: "-50vh",
            right: "20vh",
            zIndex: -9999,
          }}
        />
        <span
          style={{
            position: "absolute",
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: isTablet ? "50px" : "70px",
            top: isTablet ? "-10px" : "-20px",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h3>Put Your Logo</h3>
          {/* <Image
            src="/Images/logo_Login.png"
            style={{
              zIndex: 1,
              width: isTablet ? "350px" : "470px",
            }}
            alt="logo login"
            preview={false}
          /> */}
          <h1
            style={{
              color: "white",
              letterSpacing: isTablet ? "2px" : "3.5px",
              whiteSpace: "nowrap",
              fontSize: isTablet ? "19px" : "30px",
            }}
          >
            {/* Production Planning Inventory Control */}
          </h1>
        </span>
      </div>
      <span
        style={{
          transform: "rotateZ(245deg) translateX(-50%) translateY(-50%)",
          position: "absolute",
          zIndex: -999,
        }}
      >
        <Image
          src="Images/bg_support.svg"
          height="180px"
          width={isTablet ? "220%" : "150%"}
          alt=""
          style={{ position: "relative" }}
          preview={false}
        />
      </span>
    </div>
  );
}

export default ThemeBackground;
