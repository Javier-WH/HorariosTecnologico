import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './components/layout/layout'
import './layout.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
)

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
