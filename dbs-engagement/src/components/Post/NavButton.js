import React from 'react';
import { Button, Radio } from 'antd';
import { GrFormAdd } from "react-icons/gr";


const NavButton = ({purpose, icon, style}) => {
    return (
        <div>
            <Button type="primary" shape="round" icon={icon} style={style} >
                {purpose}    
            </Button>
        </div>
    );
}

export default NavButton;