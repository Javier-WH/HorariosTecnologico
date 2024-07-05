import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './schedule.css'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
dayjs.locale('es')

const localizer = dayjsLocalizer(dayjs)

export default function Schedule(): JSX.Element {
  const myEventsList = [
    {
      title: 'Prueba',
      allDay: false,
      start: dayjs('2024-07-05T10:00:00').toDate(),
      end: dayjs('2024-07-05T18:00:00').toDate()
    },
    {
      title: 'Prueba2',
      allDay: false,
      start: dayjs('2024-07-05T07:00:00').toDate(),
      end: dayjs('2024-07-05T08:30:00').toDate()
    }
  ]
  const formats = {
    timeGutterFormat: 'hh:mm a'
  }

  return (
    <div style={{ height: '100%' }}>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        views={['week']}
        defaultView="week"
        toolbar={false}
        min={dayjs('2024-07-05T07:00:00').toDate()}
        max={dayjs('2024-07-05T23:00:00').toDate()}
        formats={formats}
        step={45}
      />
    </div>
  )
}
