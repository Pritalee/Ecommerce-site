import React,{useState} from 'react';
import {showErrorMsg,showSuccessMsg} from './Helper/message';
import {showLoading} from './Helper/Loading';
import {uploadItem} from '../api/auth';


const UploadItems=()=>{
    const [Item,setItem]=useState({
        imageUrl:'',
        itemName:'',
        price:'',
        desc:'',
        rating:'',
        errorMsg:false,
        successMsg:false,
        loading:false
    });
    const {imageUrl,itemName,price,desc,rating,errorMsg,successMsg,loading}=Item;

    const handleChange=(e)=>{
        setItem({
            ...Item,
            [e.target.name]:e.target.value,
            errorMsg:'',
            successMsg:''
        })
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        const {itemName,price,desc,rating,imageUrl}=Item;
        const data={itemName,price,desc,rating,imageUrl};
        console.log('Data :',data);
        setItem({...Item,
            loading:true,
        });
            uploadItem(data)
            .then(response=>{
                setItem({...Item,
                    loading:false,
                    successMsg:response.data.successMessage,
                    imageUrl:'',
                    itemName:'',
                    price:'',
                    desc:'',
                    rating:''
                });
                console.log('Item uploaded successfully');
            })
            .catch(err=>{
                setItem({...Item,loading:false,errorMsg:err.response.data.errorMessage})
                console.log('upload item api error',err);
            });
        
    }

    const form=()=>{
        return(
            <div>
                <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label >Image Url</label>
                            <input type="text" name="imageUrl" value={imageUrl} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label >Name</label>
                            <input type="text" className="form-control" name="itemName" value={itemName}  onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="text" className="form-control" name="price" value={price}  onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" className="form-control" name="desc" value={desc}  onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Rating</label>
                            <input type="text" className="form-control" name="rating" value={rating}  onChange={handleChange}/>
                        </div>
                        <div className="center">
                            <button type="submit" className="btn btn-primary " id="buttons">Submit</button>
                        </div>
                        
                    </form>
            </div>
        )
    };

    return(
        <div className="container" style={{padding: "30px"}}>
        <h4 className="center">Upload Items</h4>
        {errorMsg && showErrorMsg(errorMsg)}
        {successMsg && showSuccessMsg(successMsg)}
        {loading && showLoading()}
            {form()}
        </div>
    );
    
}

export default UploadItems