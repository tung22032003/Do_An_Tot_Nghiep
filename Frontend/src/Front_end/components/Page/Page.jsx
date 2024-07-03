import Footer from "./Footer"
import Navbar from "./Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './page.scss';
import SlideShow from "./SlideShow";
import ListMenu from "./ListMenu";
import ProductList from "../Product/ProductList";
import Categories from "../Category/Categories";
import Breadcrumb from "./Breadcrumb";
import Header from "./Header";
import Brands from "../Brand/Brands";
import { CategoryProvider } from "../Category/CategoryContext";
import { BrandProvider } from "../Brand/BrandContext";
import { CartProvider } from "../Cart/CartContext";
const Page=({user,onLogout})=>{
    const breadcrumbItems = [
        { label: 'Trang Chủ', link: '' },
        { label: 'Sản phẩm' }
    ];
    return(
        < div className="container-page">
            <div className="page-width">
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="content-page">
                <CartProvider>
                <CategoryProvider>
                <BrandProvider>
                <div className="danh-muc-san-pham">
                   <Categories/>
                   <Brands/>
                </div>
                <div className="list-product">
                    <ProductList />
                </div>
                </BrandProvider>
                </CategoryProvider>      
                </CartProvider>           
            </div>
            <div className="footer-page">
                <Footer/>
            </div>
        </div>
        
        
    )
}
export default Page;