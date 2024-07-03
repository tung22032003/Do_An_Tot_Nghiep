import { values } from "lodash";
import { useEffect, useState } from "react";
import { Modal,Button } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { PutProduct } from "../../Service/apiService";
import axios from "axios";
import _ from 'lodash';

const ModalUpdateProduct=(props)=>{
    const {show,setShow,dataUpdate}            = props; 
    const[name,setName]        =useState("");
    const[description,setDescription]        =useState("");
    const[price,setPrice]                    =useState("");
    const[quantity,setQuantity]              =useState("");
    const[createDate,setCreateDate]          =useState("");
    const[status,setStatus]                  =useState("True");
    const[sku,setSKU]                        =useState("");
    const[image,setImage]                    =useState("");
    const[previewimage,setPreviewImage]      =useState("");
    const[brands,setBrands]                  =useState([]);
    const[categoris,setCateGories]           =useState([]);
    const[brandname,setBrandName]            =useState("");
    const[categoryname,setCategoryName]      =useState("");
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const handleClose = () => {
        setShow(false);
        setName("");
        setPrice("");
        setDescription("");
        setQuantity("");
        setCreateDate("");
        setStatus("True");
        setSKU("");
        setImage("");
        setPreviewImage("");
    };
    
    useEffect(() => {
      const fetchBrands = async () => {
          try {
              const response = await axios.get('https://localhost:7061/api/Brands/get-all');
              if (Array.isArray(response.data)) {
                  setBrands(response.data); 
              } else {
                  console.error('Unexpected data format:', response.data);
                  
              }
          } catch (error) {
              console.error('Error fetching brand data:', error);
              toast.error('Error fetching brand data');
          }
      };
      const fetchCateGories = async () => {
        try {
            const response = await axios.get('https://localhost:7061/api/Categories');
            if (Array.isArray(response.data)) {
                setCateGories(response.data); 
            } else {
                console.error('Unexpected data format:', response.data);
                
            }
        } catch (error) {
            console.error('Error fetching categories data:', error);
            toast.error('Error fetching categories data');
        }
    };
    if(!_.isEmpty(dataUpdate)){
        setName(dataUpdate.name);
        setPrice(dataUpdate.price);
        setDescription(dataUpdate.description);
        setQuantity(dataUpdate.quantity);
        setCreateDate(dataUpdate.createDate);
        setStatus(dataUpdate.status);
        setSKU(dataUpdate.sku);
        setImage("");
        if(dataUpdate.image){
          setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
        }
        setBrandId(dataUpdate.brandId);
        setCategoryId(dataUpdate.categoryId);
        
    }
       fetchBrands();
      fetchCateGories();
  }, [dataUpdate]);
 


  const handleChangeBrand = (event) => {
    //   const selectedBrandName = event.target.value;
    //   setCategoryName(selectedBrandName);
      
    //   setBrandId(brand ? brand.id : '');
        const selectedBrandId = event.target.value;
        setBrandId(selectedBrandId);
        //  const brand = brands.find(brand => brand.brandName === selectedBrandName);
        const brand = brands.find(brand => brand.id === selectedBrandId);
        setBrandName(brand ? brand.brandName : '');
    };

    const handleChangeCategory=(event)=>{
        // const selectedCategoryName = event.target.value;
        // setBrandName(selectedCategoryName);    
        // const category = categoris.find(categori => categori.name === selectedCategoryName);
        // setCategoryId(category ? category.id : '');
        const selectedCategoryId = event.target.value;
        setCategoryId(selectedCategoryId);    
        const category = categoris.find(categori => categori.id === selectedCategoryId);
        setCategoryName(category ? category.name : '');
    };



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
      }
    
      const SubmitProduct = async() => {
        if(!name){
          toast.error('Hãy nhập tên sản phẩm!')
          return;
        }
        if(!price){
          toast.error('Hãy nhập giá tiền')
          return;
        }
        if(!image){
            toast.error('Hãy tải hình sản phẩm')
            return;
          }
        
        let res= await PutProduct(dataUpdate.id,name,description,price,quantity,createDate,status,brandId,categoryId,sku,image);
        console.log("Check res:",res.data);  
        if(res.data&&res.data!==0){
          toast.success('Thành công');
          handleClose();
          await props.FetchProduct(props.currentPage);
         
        }
        if(res.data&&res.data===0){
          toast.error('Thất bại!.');
        }
      }
      console.log('check data update:',props.dataUpdate);
    return(
        <Modal
            className='modal-add-user' 
            backdrop='static'
            show={show} 
            onHide={handleClose} 
            size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Update Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
            <div className="col-md-6">
                <label  className="form-label">Sản phẩm</label>
                <input 
                type="text" 
                className="form-control" 
                value={name}
                onChange={(event)=>setName(event.target.value)}
                />
            </div>
            <div className="col-md-3">
                <label  className="form-label">Giá tiền</label>
                <input 
                type="number" 
                className="form-control" 
                value={price}
                onChange={(event)=>setPrice(event.target.value)}
                />
            </div>
            <div className="col-md-3">
                <label  className="form-label">Số lượng</label>
                <input 
                type="number" 
                className="form-control" 
                value={quantity}
                onChange={(event)=>setQuantity(event.target.value)}
                />
            </div>
            <div className="col-md-6">
                <label  className="form-label">Mô tả sản phẩm</label>
                <input 
                type="text" 
                className="form-control" 
                value={description}
                onChange={(event)=>setDescription(event.target.value)}
                />
            </div>
            <div className="col-md-3">
                <label  className="form-label">Ngày tạo</label>
                <input 
                type="date" 
                className="form-control" 
                value={createDate}
                onChange={(event)=>setCreateDate(event.target.value)}
                />
            </div>
            <div className="col-md-3"> 
                <label  className="form-label ">Trạng thái</label>
                <select 
                className="form-select"
                value={status}
                onChange={(event)=>setStatus(event.target.value)}
                >
                    <option value="True">Còn hàng</option>
                    <option value="False">Hết hàng</option>
                    
                </select>
            </div>

            <div className="col-md-3">
                <label className="form-label">Thương hiệu</label>
                <select
                    className="form-select"
                    value={brandId}
                    onChange={handleChangeBrand}>
                             {/* onChange={(event) => setBrandName(event.target.value)}> */}
                    <option value="" disabled selected  >Chọn thương hiệu</option>
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                            ))}
                        </select>
                        {brandId && (
                            <p>BrandId: {brandId}</p>
                         )}
             </div>

            <div className="col-md-3"> 
                <label  className="form-label ">Loại sản phẩm </label>
                <select 
                    className="form-select"
                    value={categoryId}
                    onChange={handleChangeCategory}>
                     {/* onChange={(event)=>setCategoryName(event.target.value)} */}
                    <option value="" disabled selected  >Chọn loại sản phẩm</option>
                    {categoris.map(categori => (
                        <option key={categori.id} value={categori.id}>{categori.name}</option>
                    ))}
                </select>
                {categoryId && (
                <p>CategoryId: {categoryId}</p>
                )}
            </div>

            <div className="col-md-6">
                <label  className="form-label">Mã SKU</label>
                <input 
                type="text" 
                className="form-control" 
                value={sku}
                onChange={(event)=>setSKU(event.target.value)}
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
          <Button variant="primary" onClick={()=>SubmitProduct()} >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default ModalUpdateProduct;