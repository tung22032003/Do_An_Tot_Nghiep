import React from 'react';
import './Breadcrumb.scss';

const Breadcrumb = ({ items }) => {
    return (
        <div className="breadcrumb-container">
            {items.map((item, index) => (
                <span key={index} className="breadcrumb-item">
                    {item.link ? (
                        <a href={item.link}>{item.label}</a>
                    ) : (
                        <span>{item.label}</span>
                    )}
                    {index < items.length - 1 && <span className="breadcrumb-separator">›</span>}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumb;