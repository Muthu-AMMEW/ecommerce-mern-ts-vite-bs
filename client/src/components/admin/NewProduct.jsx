import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {
    const [inputs, setInputs] = useState({ name: "", price: "", description: "", category: "select", stock: 0, seller: "" });

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const { loading, isProductCreated, error } = useSelector(state => state.productState)

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (event) => {
        if (event.target.name === 'images') {
            const files = Array.from(event.target.files);
            files.forEach(file => {
                const reader = new FileReader();

                reader.onload = () => {
                    if (reader.readyState == 2) {
                        setImagesPreview(oldArray => [...oldArray, reader.result])
                        setImages(oldArray => [...oldArray, file])
                    }
                }
                reader.readAsDataURL(file)
            })

        } else {
            const name = event.target.name;
            const value = event.target.value;
            setInputs(values => ({ ...values, [name]: value }))
        }
    }

    function handleReset() {
        setInputs({
            name: "",
            price: "",
            description: "",
            category: "select",
            stock: "",
            seller: ""
        })
        toast.info("Reset Successfully");
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', inputs.name);
        formData.append('price', inputs.price);
        formData.append('stock', inputs.stock);
        formData.append('description', inputs.description);
        formData.append('seller', inputs.seller);
        formData.append('category', inputs.category);
        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(createNewProduct(formData))
    }

    useEffect(() => {
        if (isProductCreated) {
            toast('Product Created Succesfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductCreated())
            })
            // navigate('/admin/products')
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
    }, [isProductCreated, error, dispatch])


    return (
        <div className="row">
            <div className="col-12 col-md-2 p-0">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10 mm-bgpic">
                <>
                    <div className="wrapper my-5">
                        <form onSubmit={submitHandler} className="shadow-lg rounded-5 bg-body-tertiary bg-opacity-50" encType='multipart/form-data'>
                            <h1 className="mb-4">New Product</h1>

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={inputs.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input type="number" className="form-control" id="price" name="price" value={inputs.price} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" id="description" name="description" value={inputs.description} rows="8" onChange={handleChange} required ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <select className="form-control" id="category" name="category" value={inputs.category} onChange={handleChange} required >
                                    <option value="">Select</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock">Stock</label>
                                <input type="number" className="form-control" id="stock" name="stock" value={inputs.stock} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller">Seller Name</label>
                                <input type="text" className="form-control" id="seller" name="seller" value={inputs.seller} onChange={handleChange} required />
                            </div>

                            <div className='form-group'>
                                <label>Images</label>

                                <div className='custom-file'>
                                    <input type='file' name='images' className='custom-file-input' id='images' multiple onChange={handleChange} required />

                                    <label className='custom-file-label' htmlFor='images'>
                                        Choose Images
                                    </label>
                                </div>
                                {imagesPreview.map(image => (
                                    <img className="mt-3 mr-2" key={image} src={image} alt={`Image Preview`} width="55" height="52"
                                    />
                                ))}
                            </div>

                            <div className="mt-3 text-center">

                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary " role="status">
                                        </div>
                                    </div>) : null
                                }

                                <button className="btn btn-primary me-5" type="submit" disabled={loading}>Submit</button>
                                <button className="btn btn-danger" type="reset" onClick={handleReset}>Reset</button>
                            </div>

                        </form>
                    </div>
                </>
            </div>
        </div>

    )
}