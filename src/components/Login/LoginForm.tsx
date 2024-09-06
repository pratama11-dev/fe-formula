import { GoogleOutlined } from "@ant-design/icons";
import useAuth from "@api/customHooks/useAuth";
import themeColor from "@configs/theme/themeColor";
import { Button, Col, ColProps, Divider, Form, Input, Row, Image } from "antd";
import { Sessions } from "types/Session";

interface ILoginForm extends ColProps, React.RefAttributes<HTMLDivElement> {
  session: Sessions;
}

function LoginForm({ session, ...props }: ILoginForm) {
  const [form] = Form.useForm();
  const { handleLogin, handleLoginGoogle, isLoading } = useAuth(session);

  const doLogin = () => {
    form.validateFields().then(async (v) => {
      const dataForm = {
        email: v.email as string,
        password: v.password as string,
      };
      handleLogin(dataForm);
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        width: "50%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* <Image
          src="/Images/logo_SPG.png"
          alt="logo spg"
          preview={false}
          width={200}
        />
        <h2 style={{ fontSize: "13px", letterSpacing: "1px" }}>
          System Pelitra Gunawan
        </h2> */}
      </div>
      <h3 style={{ fontSize: "34px", letterSpacing: "3px" }}>Welcome Back!</h3>
      <Col lg={12} span={24} {...props}>
        <Row align="middle" justify="center">
          <Col xxl={11} xl={30} lg={30} md={20} sm={24}>
            <Form
              layout="vertical"
              name="basic"
              form={form}
              initialValues={{ remember: true }}
            >
              <Form.Item
                label={(
                  <div style={{ fontWeight: "600", color: themeColor.dark }}>
                    Email
                  </div>
                )}
                name="email"
                className="hp-mb-16"
                rules={[
                  {
                    type: "email",
                  },
                  {
                    validator: (_rule, value, cb) => (!value || value.length === 0
                      ? cb("Please enter an Email")
                      : cb()),
                  },
                ]}
              >
                <Input
                  id="error"
                  placeholder="Email"
                  data-test="email-input"
                  style={{ borderRadius: 4 }}
                />
              </Form.Item>

              <Form.Item
                label={(
                  <div style={{ fontWeight: "600", color: themeColor.dark }}>
                    Password
                  </div>
                )}
                name="password"
                className="hp-mb-8"
                rules={[
                  {
                    validator: (rule, value, cb) => (!value || value.length === 0
                      ? cb("Please enter password")
                      : cb()),
                  },
                ]}
              >
                <Input.Password
                  id="warning2"
                  placeholder="Password"
                  data-test="password-input"
                  style={{ borderRadius: 4 }}
                />
              </Form.Item>

              <Row style={{ marginTop: "10px" }} align="middle" justify="end">
                <a
                  href="/forgot-password"
                  style={{
                    fontStyle: "italic",
                    fontWeight: "400",
                    color: themeColor.dark,
                  }}
                >
                  Forgot Password?
                </a>
              </Row>

              <Form.Item>
                <Button
                  block
                  style={{
                    backgroundColor: themeColor.signatureColor,
                    color: "#fff",
                    border: "none",
                    marginTop: "10px",
                  }}
                  type="dashed"
                  data-test="submit-button"
                  loading={isLoading.login}
                  onClick={doLogin}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row align="middle" justify="center">
          <Divider
            style={{ color: themeColor.dark, borderColor: themeColor.dark }}
            orientation="center"
          >
            Or Login With
          </Divider>
          <Button
            loading={isLoading.google}
            onClick={handleLoginGoogle}
            icon={<GoogleOutlined rev="span" />}
            type="link"
            style={{ fontSize: "1.5rem" }}
          >
            Google
          </Button>
        </Row>
      </Col>
    </div>
  );
}

export default LoginForm;
