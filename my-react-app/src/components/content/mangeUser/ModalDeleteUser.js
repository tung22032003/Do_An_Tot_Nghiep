import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteUser } from '../../Service/apiService';
import { toast } from 'react-toastify';
const   ModalDeleteUser=(props)=> {
const {show, setShow,dataDelete} = props;

  const handleClose = () => setShow(false);
  const handleSubmitDelete= async()=>{
    try {
      let data = await DeleteUser(dataDelete.id);
      console.log("Check res:", data);
      if (data && data.status === 200) {
        toast.success("Thanh cong.");
        handleClose();
        await props.FetchUserWithPage(props.currentPage);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Có lỗi xảy ra.");
      }
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
          <Modal.Title>Xóa Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa Admin này ?,email=
            <b>
                {dataDelete && dataDelete.email ? dataDelete.email : ""}
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

export default ModalDeleteUser;