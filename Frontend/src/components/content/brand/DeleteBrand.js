import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { DeleteBrand } from '../../Service/apiService';
const   ModalDeleteBrand=(props)=> {
const {show, setShow,dataDelete} = props;

  const handleClose = () => setShow(false);
  const handleSubmitDelete= async()=>{
    let data= await DeleteBrand(dataDelete.id);
     console.log("Check res:",data);  
    if(data&&data.status==200){
      toast.success("Thanh cong.",data);
      handleClose();
      props.setcurrentPage(1);
      await props.FetchBrand(1);
    }
    if(data&&data!==0){
      toast.error(data.error); 
    }
  }
  return (
    <>
    <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa Brand này ?,name=
            <b>
                {dataDelete && dataDelete.brandName ? dataDelete.brandName : ""}
            </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={()=>handleSubmitDelete()}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteBrand;