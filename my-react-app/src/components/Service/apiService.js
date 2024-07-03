import axios from 'axios';
const PostUser=(username,password,email,firstname,lastname,phonenumber,image)=>{
    const data = new FormData();
      data.append('Username', username);
      data.append('Password', password);
      data.append('Email', email);
      data.append('Firstname', firstname);
      data.append('Lastname', lastname);
      data.append('Phonenumber', phonenumber);
      data.append('Image', image);
    return  axios.post('https://localhost:7061/api/Users/registerAdmin', data);
}
const GetUsers=()=>{
    return  axios.get('https://localhost:7061/api/Users');
}
const GetUsersPaginate=(page,limit)=>{
  return  axios.get(`https://localhost:7061/api/Users/Pagination?page=${page}&Limit=${limit}`);
}
const PutUser=(id,username,email,firstname,lastname,phonenumber,image)=>{
  const data = new FormData();
    data.append('Id', id);
    data.append('Username', username);
    data.append('Email', email);
    data.append('Firstname', firstname);
    data.append('Lastname', lastname);
    data.append('Phonenumber', phonenumber);
    data.append('Image', image);
  return  axios.put('https://localhost:7061/api/Users', data);
}
const DeleteUser=(userId)=>{
  return axios.delete(`https://localhost:7061/api/Users?userId=${userId}`);
};
const PostLogin=(username,password)=>{
  return  axios.post(`https://localhost:7061/api/Users/Login`,
  {
    username:username,password:password
  });
}
const PostRegister=(username,password,email,firstname,lastname,phonenumber)=>{
  return axios.post(`https://localhost:7061/api/Users/register`,{username,password,email,firstname,lastname,phonenumber});
}
const PostProduct=(name,description,price,quantity,createDate,status,brandId,categoryId,sku,image)=>{
  const data = new FormData();
    data.append('Name', name);
    data.append('Description', description);
    data.append('Price', price);
    data.append('Quantity', quantity);
    data.append('CreateDate', createDate);
    data.append('Status', status);
    data.append('BrandId', brandId);
    data.append('CategoryId', categoryId);
    data.append('Sku', sku);
    data.append('Image', image);
    
  return  axios.post('https://localhost:7061/api/Products', data);
}
const GetProducts=(page,limit)=>{
  return  axios.get(`https://localhost:7061/api/Products?page=${page}&Limit=${limit}`);
}
const GetBrands=(page,limit)=>{
  return  axios.get(`https://localhost:7061/api/Brands?page=${page}&Limit=${limit}`);
}
const PutProduct=(id,name,description,price,quantity,createDate,status,brandId,categoryId,sku,image)=>{
  const data = new FormData();
    data.append('Id', id);
    data.append('Name', name);
    data.append('Description', description);
    data.append('Price', price);
    data.append('Quantity', quantity);
    data.append('CreateDate', createDate);
    data.append('Status', status);
    data.append('BrandId', brandId);
    data.append('CategoryId', categoryId);
    data.append('Sku', sku);
    data.append('Image', image);
  return  axios.put('https://localhost:7061/api/Products', data);
}
const DeleteProduct=(id)=>{
  return  axios.delete(`https://localhost:7061/api/Products?id=${id}`)
};

const GetCategories=()=>{
  return  axios.get('https://localhost:7061/api/Categories');
}
const PutBrand=(id,brandname,image)=>{
  const data = new FormData();
  data.append("Id",id);
  data.append("BrandName",brandname);
  data.append("ImageLogo",image);
  return axios.put('https://localhost:7061/api/Brands',data);
}
const PostBrand=(brandname,image)=>{
  const data = new FormData();
    data.append('BrandName', brandname);
    data.append('ImageLogo', image);
    
  return  axios.post('https://localhost:7061/api/Brands', data);
}
const DeleteBrand=(id)=>{
  return  axios.delete(`https://localhost:7061/api/Brands?id=${id}`)
};
const PostForgotPassword = (email) => {
  return axios.post('https://localhost:7061/api/Users/forgot-password', { email });
};
const PostResetPassword = (email, token, password) => {
  return axios.post('https://localhost:7061/api/Users/reset-password', { email, token, password });
};
export  {
  PostUser,
  GetUsers,
  PutUser,
  DeleteUser,
  GetUsersPaginate,
  PostLogin,
  PostRegister,
  PostProduct,
  GetProducts,
  GetBrands,
  PutProduct,
  DeleteProduct,
  PutBrand,
  PostBrand,
  DeleteBrand,
  PostForgotPassword,
  PostResetPassword
}