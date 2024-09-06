import useAuth from "@api/customHooks/useAuth";
import themeColor from "@configs/theme/themeColor";
import { isNotDashboard } from "@utils/helpers/Route";
import { Avatar, Image, Button, Col, Dropdown, Menu, Row } from "antd";
import { Header as HeaderAntd } from "antd/lib/layout/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { Sessions } from "types/Session";

type HeaderProps = {
  session: Sessions;
};

const logoTextStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: themeColor.dark,
  marginTop: "4px",
  paddingLeft: 10,
};
const loginTextStyle = {
  fontSize: "14px",
  fontWeight: 600,
  color: themeColor.fontPrimary,
  cursor: "pointer",
};

function Header({ session }: HeaderProps) {
  const router = useRouter();
  const { handleLogout, isLoading } = useAuth(session);

  const menuDesktop = (
    <Menu onClick={handleLogout}>
      <Menu.Item>
        <Button loading={isLoading.logout} type="text">
          Signout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {session?.code === 0 && (
        <HeaderAntd
          className="site-layout-background"
          style={{
            padding: 0,
            background: isNotDashboard(router)
              ? themeColor.signatureColor3
              : themeColor.signatureColor3,
            height: "70px",
          }}
        >
          <Row
            style={{ width: "100%", paddingLeft: 10, paddingRight: 30 }}
            align="middle"
            // justify={isNotDashboard(router) ? "space-between" : "end"}
            justify="space-between"
          >
            <Col xs={12} sm={12} md={12} lg={12}>
              <Row align="middle">
                <p id="headerTittle" style={logoTextStyle}>
                  FORMULA
                </p>
              </Row>
            </Col>

            {/* {isNotDashboard(router) && ( */}
            {/*   <Link href="/" passHref> */}
            {/*     <Row style={{ cursor: "pointer" }}> */}
            {/*       <div className="logo"> */}
            {/*         <Image */}
            {/*           src="/Images/logo_SPG.png" */}
            {/*           alt="logo" */}
            {/*           height="40px" */}
            {/*           width="40px" */}
            {/*         /> */}
            {/*       </div> */}
            {/*       <p id="headerTittle" style={logoTextStyle}> */}
            {/*         {process.env.NEXT_PUBLIC_APPNAME ?? "Next TS Template"} */}
            {/*       </p> */}
            {/*     </Row> */}
            {/*   </Link> */}
            {/* )} */}
            <Dropdown overlay={menuDesktop}>
              <Row
                style={{ marginTop: isNotDashboard(router) ? "-14px" : "0px" }}
                align="middle"
              >
                <Avatar
                  className="mx-4 my-auto pointer"
                  src="/Images/avatar.png"
                />
                <p
                  id="headerPeopleName"
                  style={{
                    margin: "0px 10px",
                    color: isNotDashboard(router)
                      ? themeColor.white
                      : themeColor.darkBlueSecondary,
                    fontWeight: "bold",
                  }}
                >
                  {session?.data?.user?.name}
                </p>
                <Image
                  style={{ marginRight: "10px" }}
                  src="/Icon/header/arrow-down-blue.svg"
                  alt="dropdown"
                  preview={false}
                />
              </Row>
            </Dropdown>
          </Row>
        </HeaderAntd>
      )}
      {session?.code === -1 && (
        <HeaderAntd
          className="site-layout-background"
          style={{ padding: 0, background: "#3e4c5f" }}
        >
          <Row align="middle" justify="space-between">
            <Col xs={12} sm={12} md={12} lg={12}>
              <Row align="middle">
                <p id="headerTittle" style={logoTextStyle}>
                  FORMULA
                </p>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div style={{ float: "right", marginRight: "20px" }}>
                <Link href="/login" passHref>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>
                    <p id="login-CTA" style={loginTextStyle}>
                      Sign In
                    </p>
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </HeaderAntd>
      )}
    </>
  );
}

export default Header;
