import { useEffect, useState } from "react";
import AdminBar from "./AdminBar";
import { useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearProductError, clearIsProductUpdated } from "../../slices/productSlice";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function UpdateProduct() {
    const [inputs, setInputs] = useState({ name: "", price: "", description: "", category: "select", stock: 0, seller: "" });
    const [images, setImages] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);
    const { id: productId } = useParams();

    const { loading, isProductUpdated, error, product } = useAppSelector(state => state.productState)

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

    const dispatch = useAppDispatch();

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
        toast.info("Reset Successfully", { position: 'top-center' });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (images.length === 0 && imagesCleared) {
            toast.error("Please select at least one image", { position: 'top-center' })
            return;
        }

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
        formData.append('imagesCleared', imagesCleared);
        dispatch(updateProduct(productId, formData))
    }

    const clearImagesHandler = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    }


    useEffect(() => {
        if (isProductUpdated) {
            toast.success('Product Updated Succesfully!', {
                position: 'top-center',
                onOpen: () => dispatch(clearIsProductUpdated())
            })
            setImages([])
            return;
        }

        if (error) {
            toast.error(error, {
                position: 'top-center',
                onOpen: () => dispatch(clearProductError())
            })
            return
        }

        dispatch(getProduct(productId))
    }, [isProductUpdated, productId, error, dispatch])


    useEffect(() => {
        if (product._id) {
            setInputs(values => ({
                ...values,
                name: product.name,
                price: product.price,
                stock: product.stock,
                description: product.description,
                seller: product.seller,
                category: product.category
            }));

            if (product.images) {
                let images = [];
                product.images.forEach(image => {
                    images.push(image.image)
                });
                setImagesPreview(images)
            }
        }

    }, [product])


    return (
        <>
            <MetaData title={'Update Product'} />
            <AdminBar />
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 my-5 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Update Product</div>

                        <form className="w-100 mm-input-box-color" onSubmit={handleSubmit} encType='multipart/form-data'>
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
                                    <input type='file' name='images' className='custom-file-input' id='images' multiple onChange={handleChange} />

                                    <label className='custom-file-label' htmlFor='images'>
                                        Choose Images
                                    </label>
                                </div>
                                {imagesPreview.length > 0 && <span className="me-2" onClick={clearImagesHandler} style={{ cursor: "pointer" }}><i className="fa fa-trash"></i></span>}
                                {imagesPreview.map(image => (
                                    <img className="mt-3 me-2" key={image} src={image} alt={`Image Preview`} width="55" height="52"
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
                </div>
            </div>
        </>
    )
}