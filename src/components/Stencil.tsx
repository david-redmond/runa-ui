import React from 'react';
import ContentLoader from 'react-content-loader';

const Stencil = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="20" cy="20" r="20" />
        <rect x="50" y="10" rx="3" ry="3" width="100" height="10" />
        <rect x="50" y="30" rx="3" ry="3" width="200" height="10" />
        <rect x="0" y="50" rx="3" ry="3" width="400" height="10" />
        <rect x="0" y="70" rx="3" ry="3" width="380" height="10" />
        <rect x="0" y="90" rx="3" ry="3" width="360" height="10" />
    </ContentLoader>
);

export default Stencil;
