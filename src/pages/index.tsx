import { Sessions } from "types/Session";
import HeadPage from "@components/Global/Header/HeadPage";
import useNavbar from "@layouts/customHooks/useNavbar";
import dynamic from "next/dynamic";
import { Button, Calendar, Col, Divider, Drawer, FloatButton, Input, Row, Select } from "antd";
import { MenuOutlined, PlusCircleTwoTone, UserOutlined } from "@ant-design/icons";
import { useCalendarQuery } from "@services/reactQuery/calendar";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import ModalAddEvent from "@components/Calendar/ModalAddEvent";
import { useUserQuery } from "@services/reactQuery/users";
import useDebounce from "@utils/helpers/customHooks/useDebounce";

function Home(session: Sessions) {
  useNavbar(["home"], [{ name: "Home", url: "/" }]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalAddEnvent, setModalAddEvent] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce<string>(search, 500)

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = useCalendarQuery({
    enabled: true,
    search: debouncedSearch,
    users: user
  })

  const dataUser = useUserQuery({
    enabled: true
  })

  const dataEvent = data?.data?.data?.data

  const listUser = dataUser?.data?.data?.data

  const FullCalendar = dynamic(() => import('../components/Calendar/Calendar'), { ssr: false });

  const LayoutWrapper = isMobile ? Col : Row

  const onDateSelect = (date: Dayjs | null) => {
    if (date) {
      // Convert Dayjs to Date
      setSelectedDate(date.toDate());
    }
  };

  const options = listUser?.map((d) => {
    return {
      label: `${d.name}`,
      value: `${d?.name}`
    }
  })

  return (
    <>
      <HeadPage title="Home Page" />

      <Drawer title="Calendar" onClose={onClose} open={open}>
        <Calendar
          fullscreen={false}
          onSelect={onDateSelect}
        />
      </Drawer>

      <LayoutWrapper>
        <Col sm={24} md={24} xl={4}>
          <Col style={{ padding: 10 }}>
            <p>ABBA Calendar</p>
            <Divider style={{ margin: 0 }} />
          </Col>
          <Col style={{ padding: 10 }}>
            <Button
              onClick={() => { setModalAddEvent(true) }}
              icon={<PlusCircleTwoTone rev="label" />}
              style={{ borderRadius: 50, marginLeft: 10 }}
              size="large"
              type="default"
            >
              Create
            </Button>

            <div className="mini-calendar">
              <Calendar
                fullscreen={false}
                onSelect={onDateSelect}
              />
            </div>

            <Divider />

            <Input
              allowClear
              placeholder="Search by Title"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            <Select
              mode="tags"
              style={{ width: '100%', marginTop: 10 }}
              placeholder="Search or create name"
              options={options}
              onChange={(value) => setUser(value as string[])} // Cast value to string array
              labelInValue={false} // Ensure it returns only strings
              showSearch
            />
          </Col>
        </Col>
        <Col sm={24} md={24} xl={20} style={{ padding: 20 }}>
          <FullCalendar
            data={dataEvent}
            isMobile={isMobile}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Col>
      </LayoutWrapper>

      {isMobile && (
        <FloatButton
          onClick={() => showDrawer()}
          icon={<MenuOutlined rev={""} />}
        />
      )}

      <ModalAddEvent
        // session={wt?.session}
        visible={modalAddEnvent}
        setVisible={setModalAddEvent}
        // dataId={dataId}
        onFinish={() => {
          // uq.invalidateQueries(["retur-grpo"])
          // uq.refetchQueries(["retur-grpo"])
        }}
      />
    </>
  );
}

export default Home;
