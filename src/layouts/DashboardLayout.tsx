import BreadcrumbOur from "@components/Global/Breadcrumb";
import Header from "@components/Global/Header/Header";
import Sidebar from "@components/Global/Sidebar";
import { AdminRoutes } from "@configs/route/SidebarRoute";
import themeColor from "@configs/theme/themeColor";
import getUserRole from "@utils/helpers/getUserRoles";
import useWindowSize from "@utils/helpers/ReactHelper";
import { isNotDashboard } from "@utils/helpers/Route";
import { Layout } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import FadeIn from "react-fade-in";
import { Sessions } from "types/Session";

const { Content, Footer } = Layout;

type DashboardLayoutProps = {
  children: React.ReactNode;
  session: Sessions;
  background?: string;
};

function DashboardLayout({
  children,
  session,
  background = "",
}: DashboardLayoutProps) {
  const router = useRouter();
  const role = getUserRole(session);
  const { isMobile } = useWindowSize();

  return (
    <Layout hasSider={session?.code === 0}>
      {session?.code === 0 && !isNotDashboard(router) && (
        <>
          {(role === "Super Admin" || role === "WHRM Admin") && (
            <Sidebar _session={session} routes={AdminRoutes} />
          )}
          {/* <Sidebar _session={session} routes={AdminRoutes} /> */}
        </>
      )}
      <Layout
        className="site-layout"
        style={{
          backgroundColor: themeColor.signatureColor3,
        }}
      >
        <FadeIn>
          <Header session={session} />

          <div
            style={{
              margin: "0 16px",
            }}
          >
            {session?.code === 0 ? (
              <BreadcrumbOur />
            ) : (
              <div style={{ height: "32px" }} />
            )}

            <Content
              className="site-layout-background"
              style={{
                background,
                overflowX: "scroll",
                padding: isMobile || background ? 0 : 24,
                minHeight: 360,
                borderRadius: 8,
              }}
            >
              {children}
            </Content>
          </div>

          <Footer style={{ textAlign: "center" }}>
             ©
            {' '}
            {moment().year()}
          </Footer>
        </FadeIn>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
