import React, { useEffect, useState } from "react";
import axios from "axios";
//import "./ImageManage.css"; 

const ImageManage = () => {

    return (
        <div className="manage-image-container">
            <h1>Quản lí hình ảnh</h1>
            <div className="users-content">
                <div className="btn-add-new">
                    {/* Bạn có thể thêm nút để thêm mới hình ảnh */}
                </div>
            </div>
            <div className="table-users-container">
            </div>
        </div>
    );
};



export default ImageManage;
