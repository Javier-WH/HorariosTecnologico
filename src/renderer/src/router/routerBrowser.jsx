import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../components/layout/layout'
import SchedulePanel from '../components/schedulePanel/schedulePanel'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: (
      <a href="/">
        <h1>Opps, Ocurrió un error</h1>
      </a>
    ),
    children: [
      {
        path: '/',
        element: <SchedulePanel />
      },
      {
        path: '/teachers',
        element: <h1>Profesores</h1>
      }
    ]
  }
])
export default router

/*
  const ipcHandle = (): void => {
    const data = { pnf: 'administracion' }
    window.electron.ipcRenderer
      .invoke('pnfs-create', data)
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

*/
