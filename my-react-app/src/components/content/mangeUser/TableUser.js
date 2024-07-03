
const TableUser=(props)=>{
    const{ListUser}=props;
    
    
    return (
        <>
        <table className="table table-bordered table-hover">
            <thead>
                <tr className="text-center">
                    <th scope="col">No</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phonenumber</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {ListUser&&ListUser.length>0 && ListUser.map((item,index)=>{
                    return (
                        <tr key={`table-users-${index}`} className="text-center">
                            <td>{index+1}</td>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td >
                                <button className="btn btn-info mx-3 ">Detail</button>
                                <button  className="btn btn-success mx-3" 
                                 onClick={()=>props.handbleClickBtn(item)}
                                >Edit</button>
                                <button  className="btn btn-danger mx-3 " 
                                onClick={()=>props.handleBtnDelete(item)}
                                >Delete
                                    
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}
export default TableUser;