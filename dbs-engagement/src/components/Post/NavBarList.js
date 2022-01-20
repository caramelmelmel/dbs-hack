import { RedditCircleFilled, ClockCircleOutlined } from '@ant-design/icons';
import { SiStarship, SiMicrosoftexcel } from "react-icons/si";
import { FaRegDotCircle } from "react-icons/fa";
import { AiFillFilePdf } from "react-icons/ai";
import { GrOverview, GrInfo } from "react-icons/gr";
import { BiMessageSquareAdd } from "react-icons/bi";
import { HiMailOpen } from "react-icons/hi";
import { AiOutlineSmile } from "react-icons/ai";


const DropDownListMetrics = [
  {
    title: "DCI",
    link:"/metrics",
    icon: <GrInfo style={{color: "blue"}}/>
  },
  {
    title:"Metrics",
    link:"#",
    icon: <AiOutlineSmile style={{color: "purple"}}/>
  },
  {
    title:"other list items",
    link:"#",
    icon: <FaRegDotCircle style={{color: "green"}}/>
  },
]




export { DropDownListMetrics};
