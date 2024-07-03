
import { FcPlus } from "react-icons/fc";
import { values } from "lodash";
import { useEffect, useState } from "react";
import { Modal,Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { PostBrand } from "../../Service/apiService";
const CreateBrand=(props)=>{
    const {show,setShow}= props;
    const[brandname,setBrandName]            =useState("");
    const[image,setImage]                    =useState("");
    const[previewimage,setPreviewImage]      =useState("");

    const HandleUploadImage=(event)=>{
        if(event.target&&event.target.files&&event.target.files[0])
            {
            const file = event.target.files[0];
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif','image/webp'];
            if (validImageTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1]; 
                    setPreviewImage(URL.createObjectURL(file));
                    setImage(base64String);                
                };
                reader.readAsDataURL(file);
            }
            else{
                alert("Vui lòng chọn một tệp hình ảnh hợp lệ (JPEG, PNG, hoặc GIF)");
                
            }
        }
        else {
            
        }
        console.log('Tệp tải lên', event.target.files[0]);
    };
    const handleClose=()=>{
        setShow(false);
        setBrandName("");
        setImage("");
        setPreviewImage("");
    }

    const SubmitBrand = async() => {
        if(!brandname){
          toast.error('Hãy nhập tên Logo!')
          return;
        }
        if(!image){
            toast.error('Hãy tải hình sản phẩm')
            return;
          }
        
        let res= await PostBrand(brandname,image);
        console.log("Check res:",res.data);  
        if(res.data&&res.data!==0){
          toast.success('Thành công');
          props.setcurrentPage(1);
          await props.FetchBrand(1);
          handleClose();
        }
        if(res.data&&res.data===0){
          toast.error('Thất bại!.');
        }
      }

    return(
        <Modal
            className='modal-add-brand' 
            backdrop='static'
            show={show} 
            onHide={handleClose} 
            size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
            <div className="col-md-10">
                <label  className="form-label">Tên thương hiệu</label>
                <input 
                type="text" 
                className="form-control" 
                value={brandname}
                onChange={(event)=>setBrandName(event.target.value)}
                />
            </div>
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
          <Button variant="secondary" onClick={()=>handleClose()} >
            Đóng
          </Button>
          <Button variant="primary" onClick={()=>SubmitBrand()} >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default CreateBrand;