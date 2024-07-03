import React, { useContext, useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Brand.scss';
import { BrandContext } from './BrandContext';
import InfiniteScroll from 'react-infinite-scroll-component';
const Brands = () => {
    const [brandData, setBrandData] = useState([]);
    const [displayedBrands, setDisplayedBrands] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { setSelectedBrand } = useContext(BrandContext);

    useEffect(() => {
        fetch('https://localhost:7061/api/Brands/get-all')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBrandData(data);
                    setDisplayedBrands(data.slice(0, 8));
                } else {
                    console.error('Dữ liệu không đúng định dạng', data);
                }
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu thương hiệu:', error));
    }, []);

    const handleBrandClick = (brandId) => {
        setSelectedBrand(brandId);
    };

    const fetchMoreData = () => {
        if (displayedBrands.length >= brandData.length) {
            setHasMore(false);
            return;
        }
        const newBrands = brandData.slice(displayedBrands.length, displayedBrands.length + 8);
        setDisplayedBrands([...displayedBrands, ...newBrands]);
    };

    const filteredBrandsData = brandData.filter(brand => 
        brand.brandName && brand.brandName.toLowerCase()
    );

    return (
        <div className='brands-container'>
            <div className="brand-container">
                <h2>Thương hiệu</h2>
                {filteredBrandsData.length > 0 ? (
                    <InfiniteScroll
                    dataLength={filteredBrandsData.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                     
                    endMessage={<p>Bạn đã xem hết thương hiệu.</p>}
                >
                    <ul className="brand-list">
                        {filteredBrandsData.map((brand) => (
                            <li key={brand.id} onClick={() => handleBrandClick(brand.id)}>
                                <a href="#">{brand.brandName}</a>
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
                ) : (
                    <p>Không có thương hiệu nào!</p>
                )}
            </div>
        </div>
    );
}

export default Brands;
