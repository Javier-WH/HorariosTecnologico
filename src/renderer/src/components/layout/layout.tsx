import React, { useState } from 'react'
import { activeTab, getTab } from './layoutChildrens'
import {
  ScheduleOutlined,
  BookOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'

const { Content, Footer, Sider } = Layout

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
  getItem('Horarios', activeTab.Schedule, <ScheduleOutlined />),
  getItem('Profesores', activeTab.Teachers, <UserOutlined />),
  getItem('Pensum', activeTab.Pensum, <BookOutlined />),
  getItem('User', 'sub1', <BookOutlined />, [
    getItem('Tom', '4'),
    getItem('Bill', '5'),
    getItem('Alex', '6')
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />)
]

const App: React.FC = () => {
  const [tab, setTab] = useState(activeTab.Schedule)
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
          defaultSelectedKeys={['1']}
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
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default App
