

import './ModalCreateUser.scss';
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { GetUsers,GetUsersPaginate } from "../../Service/apiService";
import TableUserPage from "./TableUserPagination";
import ModalCreateUser from './ModalCreateUser';
import ModalDeleteUser from './ModalDeleteUser';
import ModalUpdateUser from './ModelUpdateUser';

const ManageUser=(props)=>{
    const LIMIT_USER=5;
    const[pageCount,setPageCount]=useState(0);

    const[currentPage,setcurrentPage]=useState(1);
    const[showModalUser,setShowModalUser]=useState(false);
    const[showUpdateUser,setShowUpdateUser]=useState(false);
    const[ListUser,setListUser]=useState([]);
    const[dataUpdate,setdataUpdate]=useState({});
    const[dataDelete,setDataDelete]=useState({});
    const[showModalDelete,setShowModalDelete]=useState(false);
    const handbleClickBtn=(user)=>{
        setdataUpdate(user);
        setShowUpdateUser(true);
        console.log('update user:',user);
    }
    // const handleShowHideModal=(value)=>{
    //     setShowModalUser(value);
    // }

    useEffect( ()=>{
        // FetchUser();
        FetchUserWithPage(1);
    },[]);
    const FetchUser=async()=>{
       let res= await GetUsers();
            setListUser(res.data);
            console.log(res.data);
    }
    const FetchUserWithPage=async(page)=>{
        let res= await GetUsersPaginate(page,LIMIT_USER);
        console.log("result:",res.data);
             setListUser(res.data.users);
             setPageCount(res.data.totalPages);
     }

    const handleBtnDelete=(user)=>{
        console.log("detele:",user);  
        setShowModalDelete(true);
        setDataDelete(user);
    }
    return (
        <div className="manage-user-container" >
             
            <div className="users-content">
                <div className="btn-add-new ">
                    <button 
                    className="btn btn-primary "  
                    onClick={()=>setShowModalUser(true)}>                   
                        Thêm User Admin <i class="fas fa-user-plus"></i>
                    </button>
                </div>
            </div>
            <div className="table-users-container">
                {/* <TableUser 
                    ListUser={ListUser}
                    handbleClickBtn={handbleClickBtn}
                    handleBtnDelete={handleBtnDelete}
                /> */}
                <TableUserPage
                    ListUser={ListUser}
                    handbleClickBtn={handbleClickBtn}
                    handleBtnDelete={handleBtnDelete}
                    FetchUserWithPage={FetchUserWithPage}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setcurrentPage={setcurrentPage}
                />
            </div>    
            <ModalCreateUser 
                show={showModalUser}
                setShow={setShowModalUser}
                //setShow={handleShowHideModal}
                // FetchUser={FetchUser}
                currentPage={currentPage}
                setcurrentPage={setcurrentPage}
                FetchUserWithPage={FetchUserWithPage}
                
            />
            <ModalUpdateUser
                show={showUpdateUser}
                setShow={setShowUpdateUser}
                dataUpdate={dataUpdate}
                // FetchUser={FetchUser}
                currentPage={currentPage}
                setcurrentPage={setcurrentPage}
                FetchUserWithPage={FetchUserWithPage}
            />
            <ModalDeleteUser
                show={showModalDelete}
                setShow={setShowModalDelete}
                dataDelete={dataDelete}
                FetchUser={FetchUser}
                currentPage={currentPage}
                setcurrentPage={setcurrentPage}
                FetchUserWithPage={FetchUserWithPage}
            />
        </div>
    )     
}
export default ManageUser;