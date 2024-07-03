

import { useEffect, useState } from "react";
import TableBrand from "./TableBrand";
import CreateBrand from "./CreateBrand";
import UpdateBrand from "./UpdateBrand";
import DeleteBrand from "./DeleteBrand";
import { GetBrands } from "../../Service/apiService";


const BrandManage=(props)=>{
    const LIMIT_BRAND=5;
    const[pageCount,setPageCount]=useState(0);
    const[currentPage,setcurrentPage]=useState(1);
    const[showCreateBrand,setshowCreateBrand]=useState(false);
    const[showUpdateBrand,setShowUpdateBrand]=useState(false);
    const[ListBrand,setListBrand]=useState([]);
    const[dataUpdate,setdataUpdate]=useState({});
    const[dataDelete,setDataDelete]=useState({});
    const[showDeleteBrand,setShowDeleteBrand]=useState(false);

    const handbleClickBtn=(brand)=>{
        setdataUpdate(brand);
        setShowUpdateBrand(true);
        console.log('brand :',brand);
    }

    const handleBtnDelete=(brand)=>{
        console.log("detele:",brand);  
        setShowDeleteBrand(true);
        setDataDelete(brand);
    }

    useEffect( ()=>{
        FetchBrand(1);
      
   },[]);
   const FetchBrand=async(page)=>{
       let res= await GetBrands(page,LIMIT_BRAND);
           console.log("result:",res.data);
           setListBrand(res.data.brands);
           console.log(res.data.brands);
           setPageCount(res.data.totalCount);
   }
               

    // const handleBtnDelete=(user)=>{
    //     console.log("detele:",user);  
    //     setShowModalDelete(true);
    //     setDataDelete(user);
    // }
    return (
        <div className="manage-user-container" >
             
            <div className="users-content">
                <div className="btn-add-new ">
                    <button 
                    className="btn btn-primary " 
                    onClick={()=>setshowCreateBrand(true)}
                    >          
                        Thêm thương hiệu 
                        <i class="fas fa-circle-plus"></i>
                    </button>
                </div>
            </div>
            <div className="table-users-container">
                <TableBrand
                    FetchBrand={FetchBrand}
                    ListBrand={ListBrand}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setcurrentPage={setcurrentPage}
                    handbleClickBtn={handbleClickBtn}
                    handleBtnDelete={handleBtnDelete}
                />
            </div>    
            <CreateBrand
                show={showCreateBrand}
                setShow={setshowCreateBrand}
                FetchBrand={FetchBrand}
                currentPage={currentPage}
                setcurrentPage={setcurrentPage}
            />
            <UpdateBrand
                show={showUpdateBrand}
                setShow={setShowUpdateBrand}
                dataUpdate={dataUpdate}
                FetchBrand={FetchBrand}
                currentPage={currentPage}
                setcurrentPage={setcurrentPage}
            />
            <DeleteBrand
                show={showDeleteBrand}
                setShow={setShowDeleteBrand}
                dataDelete={dataDelete}
                FetchBrand={FetchBrand}
                currentPage={currentPage}
                setcurrentPage={setcurrentPage}
            />
        </div>
    )     
}
export default BrandManage;