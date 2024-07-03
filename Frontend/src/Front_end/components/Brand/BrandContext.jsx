
import React, { createContext, useState } from 'react';

export const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
    const [selectedBrand, setSelectedBrand] = useState(null);

    return (
        <BrandContext.Provider value={{ selectedBrand, setSelectedBrand }}>
            {children}
        </BrandContext.Provider>
    );
};
