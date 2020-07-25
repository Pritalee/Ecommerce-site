import React from 'react';

export const showLoading=()=>{
    return(
        <div className="center pb-8">
            <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
            </div>
</div>
    )
    
};