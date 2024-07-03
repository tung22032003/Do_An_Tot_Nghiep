
import ReactPaginate from "react-paginate";
import { useState,useEffect } from "react";

const TableUserPage=(props)=>{

    const{ListUser,pageCount}=props;
    
    // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    props.FetchUserWithPage(+event.selected + 1)
    props.setcurrentPage(+event.selected + 1)
    console.log(`User requested page number ${event.selected}`);   
  };
    return (
        <>
        <table className="table table-bordered table-hover">
            <thead>
                <tr className="text-center">
                    <th scope="col">No</th>
                    {/* <th scope="col">User ID</th> */}
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Phonenumber</th>                  
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {ListUser&&ListUser.length>0 && ListUser.map((item,index)=>{
                    return (
                        <tr key={`table-users-${index}`} className="text-center">
                            <td>{index+1}</td>
                            {/* <td>{item.id}</td> */}
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.roleName}</td>
                            <td>{item.phoneNumber}</td>
                            <td className="d-flex justify-content-between" >
                                <button className="btn btn-info w-100 mx-1  ">Detail</button>
                                <button  className="btn btn-success w-100 mx-1" 
                                 onClick={()=>props.handbleClickBtn(item)}
                                >Edit</button>
                                <button  className="btn btn-danger w-100 mx-1 " 
                                onClick={()=>props.handleBtnDelete(item)}
                                >Delete
                                    
                                </button>
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
        </>
    )
}
export default TableUserPage;