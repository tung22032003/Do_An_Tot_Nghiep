import { PostUser } from '../../Service/apiService';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
const ModalCreateUser=(props)=> {
  const {show,setShow}            = props;
  const handleClose = () => {
     setShow(false);
     setEmail("");
     setUsername("");
     setPassword("");
     setFirstname("");
     setLastname("");
     setPhonenumber("");
     setImage("");
     setPreviewImage("");
  };
  const handleShow = ()  => setShow(true);
  const[username,setUsername]        =useState("");
  const[email,setEmail]              =useState("");
  const[password,setPassword]        =useState("");
  const[firstname,setFirstname]      =useState("");
  const[lastname,setLastname]        =useState("");
  const[phonenumber,setPhonenumber]  =useState("");
  const[image,setImage]              =useState("");
  const[previewimage,setPreviewImage]=useState("");

  const HandleUploadImage=(event)=>{
    if(event.target&&event.target.files&&event.target.files[0])
        {
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0])
    }
    else{

    }
    console.log('upload file',event.target.files[0])
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const SubmitCreateAdmin = async() => {
    const isValidEmail=validateEmail(email);
    if(!isValidEmail){
      toast.error('email khong hop le')
      return;
    }
    if(!password){
      toast.error('Nhập password')
      return;
    }
    
    let res= await PostUser(username,password,email,firstname,lastname,phonenumber,image);
    console.log("Check res:",res.data);  
    if(res.data&&res.data!==0){
      toast.success('Thành công');
      // props.setcurrentPage(1);
      await props.FetchUserWithPage(props.currentPage);
      handleClose();
    }
    if(res.data&&res.data===0){
      toast.error('Thất bại!.');
    }
  }
  return (
    <>
      <Modal
      className='modal-add-user' 
      backdrop='static'
      show={show} 
      onHide={handleClose} 
      size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
            <div className="col-md-4">
                <label  className="form-label">Tên Đăng ký</label>
                <input 
                type="text" 
                className="form-control" 
                value={username} 
                onChange={(event)=>setUsername(event.target.value)}
                />
            </div>
            <div className="col-4">
                <label  className="form-label">Mật khẩu</label>
                <input 
                type="password" 
                className="form-control"
                value={password} 
                onChange={(event)=>setPassword(event.target.value)} 
                />
            </div>
            <div className="col-md-4">
                <label  className="form-label">Email</label>
                <input 
                type="email" 
                className="form-control" 
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
                 />
            </div>
            
            <div className="col-4">
                <label  className="form-label">Họ</label>
                <input 
                type="text" 
                className="form-control"  
                value={firstname}
                onChange={(event)=>setFirstname(event.target.value)}
                />
            </div>
            <div className="col-4">
                <label  className="form-label">Tên</label>
                <input 
                type="text" 
                className="form-control"  
                value={lastname}
                onChange={(event)=>setLastname(event.target.value)}
                />
            </div>
            <div className="col-4">
                <label  className="form-label">Số điện thoại</label>
                <input 
                type="text" 
                className="form-control"  
                value={phonenumber}
                onChange={(event)=>setPhonenumber(event.target.value)}
                />
            </div>
            {/* <div className="col-md-2">
                <label >Role</label>
                <select  className="form-select">
                <option >Admin</option>
                <option>User</option>
                <option>Khác</option>
                </select>
            </div> */}
            <div className='col-md-12'>
                <label className='form-label label-upload' htmlFor='Upload'>
                    Upload Image
                    <FcPlus/>
                    </label>
                <input 
                type='file' hidden 
                id='Upload' 
                onChange={(event)=>HandleUploadImage(event)}
                />
            </div>
            <div className='col-md-12 img-preview'>
                {previewimage?
                <img src={previewimage} />
                :
                <span>Preview image</span>
                }
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary"  onClick={()=>SubmitCreateAdmin()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalCreateUser;