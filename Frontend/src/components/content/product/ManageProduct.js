import { useState,useEffect } from "react";
import TableProduct from "./tableProduct";
import ModalCreateProduct from "./ModalCreateProduct";
import { GetProducts } from "../../Service/apiService";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";

const ManageProduct=(props)=>{
    const LIMIT_PRODUCT=5;

    const[currentPage,setcurrentPage]=useState(1);
    const[pageCount,setPageCount]=useState(0);
    const[showModalProduct,setShowModalProduct]=useState(false);
    const[ListProduct,setListProduct]=useState([]);
    const[showUpdateProduct,setShowUpdateProduct]=useState(false);
    const[dataUpdate,setdataUpdate]=useState({});
    const[dataDelete,setDataDelete]=useState({});
    const[showModalDelete,setShowModalDelete]=useState(false);
    const handbleClickBtn=(product)=>{
        setdataUpdate(product);
        setShowUpdateProduct(true);
        console.log('update product:',product);
    }
    const handleBtnDelete=(product)=>{
        console.log("detele:",product);  
        setShowModalDelete(true);
        setDataDelete(product);
    }
    
    useEffect( ()=>{
         FetchProduct(1);
       
    },[]);
    const FetchProduct=async(page)=>{
        let res= await GetProducts(page,LIMIT_PRODUCT);
            console.log("result:",res.data);
                setListProduct(res.data.products);
            console.log(res.data.products);
                setPageCount(res.data.totalCount);
     }
    
    return(
        <div className="manage-product-container">
            <div className="producrs-content">
                <div className="btn-add-new ">
                    <button 
                    className="btn btn-primary "   
                    onClick={()=>setShowModalProduct(true)}>     
                        Thêm Sản Phẩm        
                      </button>         
                </div>
                <div className="table-products-container">
                    <TableProduct
                    ListProduct={ListProduct}
                    handbleClickBtn={handbleClickBtn}
                    handleBtnDelete={handleBtnDelete}
                    FetchProduct={FetchProduct}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setcurrentPage={setcurrentPage}
                    />
                </div>
                <ModalCreateProduct
                    show={showModalProduct}
                    setShow={setShowModalProduct}
                    FetchProduct={FetchProduct}
                    currentPage={currentPage}
                    setcurrentPage={setcurrentPage}
                />
                <ModalUpdateProduct
                    show={showUpdateProduct}
                    setShow={setShowUpdateProduct}
                    dataUpdate={dataUpdate}
                    FetchProduct={FetchProduct}
                    currentPage={currentPage}
                    setcurrentPage={setcurrentPage}
                />
                <ModalDeleteProduct
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    dataDelete={dataDelete}
                    FetchProduct={FetchProduct}
                    currentPage={currentPage}
                    setcurrentPage={setcurrentPage}
                />
                
            </div>
        </div>
    )
}
export default ManageProduct;