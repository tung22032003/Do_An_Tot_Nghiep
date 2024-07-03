import { useState } from "react";
import ReactPaginate from "react-paginate";

const TableProduct=(props)=>{
    
    const{ListProduct,pageCount}=props;
    const handlePageClick = (event) => {
        props.FetchProduct(+event.selected + 1)
        props.setcurrentPage(+event.selected + 1)
        console.log(`products requested page number ${event.selected}`);   
      };
    return(
        <div>
            <table className="table table-bordered table-hover">
            <thead className="text-center">
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá tiền (Vnd)</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thương hiệu</th>
                <th scope="col">Loại sản phẩm</th>
                {/* <th scope="col">Trạng thái</th> */}
                <th scope="col">Acions</th>
                </tr>
            </thead>
            <tbody>
            {ListProduct&&ListProduct.length>0 && ListProduct.map((item,index)=>{
                    return (
                        <tr key={`table-products-${index}`} >
                            {/* <td>{index+1}</td> */}
                            <td>{item.id}</td>
                            <td >{item.name}</td>
                            <td>{item.price.toLocaleString()}</td>
                            <td>{item.quantity}</td>
                            <td>{item.brandName}</td>
                            <td>{item.categoryName}</td>
                            {/* <td>{item.status}</td> */}
                            <td className="d-flex justify-content-between" >
                                <button className="btn btn-info flex-fill mx-1  "> Details</button>
                                <button  className="btn btn-success flex-fill mx-1 " 
                                 onClick={()=>props.handbleClickBtn(item)}
                                >Update</button>
                                <button  className="btn btn-danger flex-fill mx-1  " 
                                onClick={()=>props.handleBtnDelete(item)}
                                >Delete </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
            <div className="d-flex justify-content-center">
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< prev"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={props.currentPage-1}
            />
            </div>
        </div>
    )
}
export default TableProduct;