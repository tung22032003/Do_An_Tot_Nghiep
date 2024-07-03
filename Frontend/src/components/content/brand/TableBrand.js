import { defaults } from "lodash"
import ReactPaginate from "react-paginate";
import { MdOutlineUpdate } from "react-icons/md";
const TableBrand=(props)=>{
    const{ListBrand,pageCount}=props;

    const handlePageClick = (event) => {
        props.FetchBrand(+event.selected + 1)
        props.setcurrentPage(+event.selected + 1)
        console.log(`brands requested page number ${event.selected}`);   
      };
    return(
        <div>
            <table className="table table-bordered table-hover">
            <thead className="text-center">
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Brand name</th>
                <th scope="col">Image</th>
                <th scope="col">Acions</th>
                </tr>
            </thead>
            <tbody>
            {ListBrand&&ListBrand.length>0 && ListBrand.map((item,index)=>{
                    return (
                        <tr key={`table-brands-${index}`} >
                            {/* <td>{index+1}</td> */}
                            <td>{item.id}</td>
                            <td>{item.brandName}</td>
                            <td className="text-center">
                                <div className="d-flex justify-content-center align-items-center" style={{height: '100%'}}>
                                    <img 
                                        src={`data:image/jpeg;base64,${item.imageLogo}`} 
                                        alt={`${item.brandName} logo`} 
                                        style={{maxWidth: '200px', maxHeight: '50px'}} 
                                    />
                                </div>
                            </td>
                            <td className="d-flex justify-content-between" >
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
export default TableBrand;