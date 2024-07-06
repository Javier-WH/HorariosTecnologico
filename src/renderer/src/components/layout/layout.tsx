import React, { useState } from 'react'
import { activeTab, getTab } from './layoutChildrens'
import { ScheduleOutlined, BookOutlined } from '@ant-design/icons'
import { GrSchedules, GrScheduleNew, GrNotes, GrConfigure } from 'react-icons/gr'
import { PiChalkboardTeacherLight } from 'react-icons/pi'
import { TbSchool, TbHelp } from 'react-icons/tb'
import { TiArrowSyncOutline } from 'react-icons/ti'
import { GiTeacher } from 'react-icons/gi'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'

const { Content, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Horarios', 'sub-horarios', <ScheduleOutlined />, [
    getItem('Generar Horarios', activeTab.NewSchedule, <GrScheduleNew />),
    getItem('Ver Horarios', activeTab.ShowSchedule, <GrSchedules />)
  ]),
  getItem('Profesores', 'sub-profesores', <PiChalkboardTeacherLight />, [
    getItem('Agregar Profesores', activeTab.NewTeachers, <GiTeacher />),
    getItem('Ver Profesores', activeTab.ShowTeachers, <GrSchedules />)
  ]),
  getItem('Pensum', 'sub-pensum', <TbSchool />, [
    getItem('Agregar Pensum', activeTab.NewPensum, <GrScheduleNew />),
    getItem('Ver Pensum', activeTab.ShowPensum, <GrSchedules />)
  ]),
  getItem('PNF', 'sub-pnf', <BookOutlined />, [
    getItem('Agregar PNF', activeTab.NewPNF, <GrScheduleNew />),
    getItem('Ver PNF', activeTab.ShowPNF, <GrSchedules />)
  ]),
  getItem('Materias', 'sub-materias', <GrNotes />, [
    getItem('Agregar Materias', activeTab.NewMaterias, <GrScheduleNew />),
    getItem('Ver Materias', activeTab.ShowMaterias, <GrSchedules />)
  ]),
  getItem('Sincronización', activeTab.Sync, <TiArrowSyncOutline />),
  getItem('Configuración', activeTab.Config, <GrConfigure />),
  getItem('Ayuda', activeTab.Help, <TbHelp />)
]

const App: React.FC = () => {
  const [tab, setTab] = useState(activeTab.NewSchedule)
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const handleMenuItemClick = (key: React.Key): void => {
    setTab(key.toString())
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[activeTab.NewSchedule]}
          mode="inline"
          items={items}
          onClick={(item) => handleMenuItemClick(item.key)}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            {getTab(tab)}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
