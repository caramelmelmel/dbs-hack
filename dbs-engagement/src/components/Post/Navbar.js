import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Menu, DatePicker } from 'antd';
import "antd/dist/antd.css";
import { CommentOutlined } from '@ant-design/icons';
import { IoIosAdd } from "react-icons/io";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";

import moment from 'moment';
import { Alert, Snackbar } from "@mui/material";



import NavButton from './NavButton';



const { SubMenu } = Menu;

const Navbar = (props) => {

    const [mail, setMail] = useState('mail');
    // handles logout
    
    const {err, seterr} = useState("")
    const {signOutErr, setSignOutErr} = useState(false)
    const history = useHistory()

    const handleClick = (e) => {
        setMail(e.key)
    }


    // date picker settings:
    const { RangePicker } = DatePicker;

    function onChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      }

    
    
    return(
        <div>
        
        <Menu onClick={handleClick} selectedKeys={mail} mode="horizontal" >
            {/* create an empty space at the front, title is empty */}
            <Menu.Item>
                <h1>{props.title}</h1>
            </Menu.Item>
           
            <Menu.Item title="Home" icon={<AiOutlineHome />}>
                Overview
                <Link to="/home/"></Link>
            </Menu.Item> 

            {/* <SubMenu key="SubMenu1" icon={<ClockCircleOutlined />} title="hi">
                <Link to="/home"></Link>
                
            </SubMenu> */}
            <SubMenu key="SubMenu2" icon={<BsGraphUp />} title="About">
                <Menu.ItemGroup>
                </Menu.ItemGroup>
            </SubMenu>

            {/* <SubMenu key="SubMenu3" icon={<CommentOutlined />} title="Message Board">
                <Menu.ItemGroup >
                    {DropDownListMessages.map((item)=> {
                    return (
                    <Menu.Item key={item.title} icon={item.icon}>
                        <Link to={item.link}>{item.title}</Link>
                    </Menu.Item>
                    );
                    })}
                </Menu.ItemGroup>
            </SubMenu> */}
            <Menu.Item icon={<CommentOutlined />}>
                Message Board
                <Link to="/messages"></Link>
            </Menu.Item>

            <Menu.Item style={{visibility: `${props.addNewVisibility}`, marginLeft: "auto"}}>
                <NavButton 
                    purpose="Add New Peer Review"
                    icon={<IoIosAdd />}
                    style={{backgroundColor:"#7843DE", borderColor:"#7843DE", borderRadius:"10px"}}
                    
                />
                <Link to="/form"></Link>
            </Menu.Item>

            <Menu.Item style={{visibility: `${props.datePickerVisibility}`}}>
                <RangePicker
                    style={{backgroundColor:"white", borderColor:"#7843DE", borderRadius:"10px"}}
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')], 
                        'This Week': [moment().startOf('week'), moment().endOf('week')] 
                    }}
                    // format="YYYY/MM/DD HH:mm:ss"
                    onChange={onChange}
                />
                {/* </NavButton> */}
            </Menu.Item>
        </Menu>
        {props.children}
        </div>
    );
}

export default Navbar;