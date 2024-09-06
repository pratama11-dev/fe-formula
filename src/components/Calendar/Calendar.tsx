import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { ICalendar } from 'types/Calendar';
import ModalDetailEvent from './ModalDetail';

const Calendar = ({
    data,
    isMobile,
    selectedDate,
    setSelectedDate
}: {
    data?: ICalendar[]
    isMobile?: boolean
    selectedDate?: Date | null
    setSelectedDate: Dispatch<SetStateAction<Date | null>>
}) => {
    const calendarRef = useRef<FullCalendar>(null);

    const [modal, setModal] = useState<boolean>(false);
    const [idData, setIdData] = useState<number | undefined>()

    const handleDateClick = (arg: DateClickArg) => {
        // alert('Clicked on: ' + arg.dateStr);
        setSelectedDate(null)
    };

    const handleEventClick = (arg: any) => {
        const eventId = arg.event.id;

        setIdData(eventId)
        setModal(true)

        setSelectedDate(null)
    };

    const events = data?.map(event => ({
        id: event.id?.toString(),
        title: event.title,
        start: event.start,
        end: event.end,
    })) || [];


    const headerLeft = isMobile == true ? "prev,next" : "prev,next today"

    useEffect(() => {
        if (selectedDate != null && calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.gotoDate(selectedDate); // Navigate to selected date
            calendarApi.changeView('timeGridDay'); // Change view to day view
        }
    }, [selectedDate]);

    // const multiDayEvents = [];
    // for (let i = 1; i <= 10; i++) {
    //     const date = `2024-07-${i.toString().padStart(2, '0')}`;
    //     multiDayEvents.push({
    //     title: '10-Day Event',
    //     start: `${date}T10:00:00`,
    //     end: `${date}T13:00:00`,
    //     });
    // }


    return (
        <>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: headerLeft,
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                // events={events}
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
            />

            <ModalDetailEvent
                visible={modal}
                setVisible={setModal}
                id={idData}
                onFinish={() => {
                    setIdData(undefined)
                    // uq.invalidateQueries(["retur-grpo"])
                    // uq.refetchQueries(["retur-grpo"])
                }}
            />
        </>
    );
}

export default Calendar
