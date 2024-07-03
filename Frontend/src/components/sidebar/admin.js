import SidebarComponent from "./sidebar"
import 'react-pro-sidebar/dist/css/styles.css';
import { Outlet } from 'react-router-dom';
import React, { useState } from'react';
import { FaAngleDoubleLeft, FaBars } from "react-icons/fa";


const Admin=({ isLoggedIn, onLogout })=>{
    const [collapsed, setCollapsed] = useState(false);
    const [image, setImage] = useState(false);

    return(
        // <div className="admin-container">
        //     <div className="admin-sidebar">
        //         <SidebarComponent collapsed={collapsed}/>    
        //     </div>
        //     <div className="admin-content">
        //         <div className="admin-header"   >
        //         <FaBars onClick={()=>setCollapsed(!collapsed)}/>
                
        //         </div> 
        //         <div className="admin-main">
        //             <Outlet/>
        //         </div>                  
        //     </div>   
        // </div>
        <div className="admin-container">
            <div className="admin-sidebar">
                <SidebarComponent collapsed={collapsed} isLoggedIn={isLoggedIn} onLogout={onLogout} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Admin;