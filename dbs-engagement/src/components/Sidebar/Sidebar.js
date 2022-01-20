import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { Icon } from 'semantic-ui-react';



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



const SideBar = (props) => {
    // state = {
    //     collapsed: false,
    //   };
    
    //   onCollapse = collapsed => {
    //     console.log(collapsed);
    //     this.setState({ collapsed });
    //   };

    const [collapsed, setCollapsed] = useState(false);

    // const onCollapse = collapsed => {
    //     console.log(collapsed);
    //     // this.setState({ collapsed });
    //     setCollapsed(!collapsed);
    // };
    const onCollapse = () => {
        // console.log(collapsed);
        // this.setState({ collapsed });
        setCollapsed(!collapsed);

    }
    
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider 
                    collapsible 
                    collapsed={collapsed} 
                    onCollapse={onCollapse} 
                    width={200} 
                    className="site-layout-background">
                {/* <div className="logo" /> */}
                    <Menu 
                        defaultSelectedKeys={['1']} 
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1" icon={<Icon name="info" circular inverted color='blue'/>}>
                            Introduction
                            <Link to="/metrics/"></Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<Icon name="line graph" circular inverted color='teal'/>}>
                            <Link to="/metrics/pc"></Link>
                            Parallel Coordinates
                        </Menu.Item>
                        <Menu.Item key="3" icon={<Icon name="cloud" circular inverted color='orange'/>}>
                            <Link to="/metrics/wc"></Link>
                            Word Cloud
                        </Menu.Item>

                        {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="4">Tom</Menu.Item>
                        <Menu.Item key="5">Bill</Menu.Item>
                        <Menu.Item key="6">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="7">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu> */}

                        <Menu.Item key="9" icon={<Icon name="square outline" circular inverted color='red'/>}>
                            <Link to="/metrics/rc"></Link>
                            Radar Chart
                        </Menu.Item>
                        <Menu.Item key="10" icon={<Icon name="area graph" circular inverted color='pink'/>}>
                            <Link to="/metrics/graph"></Link>
                            Tracker Graphs
                        </Menu.Item>
                    </Menu>
                </Sider>
                
                {/* <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        Bill is a cat.
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout> */}
                <Layout> 
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {props.children}
                        
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default SideBar;