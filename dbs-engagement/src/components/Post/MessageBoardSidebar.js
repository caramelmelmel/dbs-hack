import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Icon } from 'semantic-ui-react';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';

import '../../styles/charts.css'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const MessageBoardSidebar = (props) => {
    // side bar expand
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = () => {
        setCollapsed(!collapsed);

    }

    const [sentiment, setSentiment] = useState("all")
    
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider 
                    collapsible 
                    collapsed={collapsed} 
                    onCollapse={onCollapse} 
                    width={200} 
                    className="site-layout-background">
                
                    <Menu 
                        defaultSelectedKeys={['1']} 
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        
                        <Menu.Item onClick={() => {props.sentimentCallback("all")}} key="1" icon={<Icon name="file alternate outline" circular inverted color='orange'/> }>
                            All
                            
                        </Menu.Item>
                        <Menu.Item onClick={() => {props.sentimentCallback("positive")}} key="2" icon={<Icon circular inverted color='teal' name='check' />}>
                            
                            Positive
                        </Menu.Item>
                    
                        <Menu.Item onClick={() => {props.sentimentCallback("neutral")}}  key="3" icon={<Icon circular inverted color='blue' name='minus' />}>
                            
                            Neutral
                        </Menu.Item>

                        <Menu.Item onClick={() => {props.sentimentCallback("negative")}} key="4" icon={<Icon circular inverted color='red' name='close' />}>
                            
                            Negative
                        </Menu.Item>
                    </Menu>
                </Sider>
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

export default MessageBoardSidebar;