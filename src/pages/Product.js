import React, { useState, useEffect } from 'react';
import '../reusable.css';
import './Product.css';
import category from '../ar';
import categoryEn from '../en';
import brandEn from '../brandEn';
import brandAr from '../brandAr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCamera, faLeaf } from '@fortawesome/free-solid-svg-icons'
import addProduct from '../API/addProduct.api';
import getAllProduct from '../API/getAllProduct.api';
import deleteProduct from '../API/deleteProduct.api';
import updateProduct from '../API/updateProduct.api';
import ReactPaginate from 'react-paginate';

const Product = () => {

    useEffect(() => {
        getProducts()
    }, [])

    const [allProduct, setAllProduct] = useState([]);
    const [serverErrors, setServerErrors] = useState(null);
    const [serverloading, setServerloading] = useState(true);

    const getProducts = async () => {
        await getAllProduct(setAllProduct, setServerErrors, setServerloading, 1)
    }

    const openPopup = () => {
        setPrevImage([]);
        setAllFiles([]);
        setPNameAr("");
        setPNameEn("");
        setpDescAr("");
        setpDescEn("");
        setpCategoryAr("");
        setpCategoryEn("");
        setpBrandAr("");
        setpBrandEn("");
        setPrice("");
        setpriceBeforeDisc("");
        setPercentage("");
        setSection("");
        setallImagesURL([]);
        setPrevImage([])
        setProductID("");
        document.querySelector(".add-product-popup").classList.replace("d-none", "d-block");
    }
    const closePopup = () => {
        document.querySelector(".add-product-popup").classList.replace("d-block", "d-none");
    }
    const [prevImage, setPrevImage] = useState([]);
    const [allImagesURL, setallImagesURL] = useState([]);
    const [allFiles, setAllFiles] = useState([]);
    const [pNameAr, setPNameAr] = useState('');
    const [pNameEn, setPNameEn] = useState('');
    const [pDescAr, setpDescAr] = useState('');
    const [pDescEn, setpDescEn] = useState('');
    const [pCategoryAr, setpCategoryAr] = useState('');
    const [pCategoryEn, setpCategoryEn] = useState('');
    const [pBrandAr, setpBrandAr] = useState('');
    const [pBrandEn, setpBrandEn] = useState('');
    const [Price, setPrice] = useState('');
    const [priceBeforeDisc, setpriceBeforeDisc] = useState('');
    const [section, setSection] = useState('');
    const [percentage, setPercentage] = useState('');
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);
    const [productID, setProductID] = useState('');


    const selectImage = (e) => {
        const allImages = e.target.files;
        const imagesArr = Array.from(allImages);
        const prevImage = [];
        const allFiles = [];
        for (let i = 0; i < imagesArr.length; i++) {
            prevImage.push(URL.createObjectURL(imagesArr[i]))
            allFiles.push(imagesArr[i]);
        }
        setPrevImage(prevImage);
        setAllFiles(allFiles);
    }


    const addProductFunc = () => {
        if (allFiles.length == 0) {
            setError("قم برفع صور المنتج اولا");
        } else {
            if (pNameAr == '' || pNameEn == ''
                || pDescAr == '' || pDescEn == '' ||
                Price == "" || pCategoryAr == "" || pCategoryEn == "" ||
                pBrandAr == '' || pBrandEn == '' || pCategoryEn == "Choice Category" ||
                pCategoryAr == "اختر الفئة" || pBrandAr == "اختر البراند" ||
                pBrandEn == "Choice Brand" || section == "اختر القسم") {
                setError("قم بإدخال بيانات المنتج كاملة");
            } else {
                let productData = new FormData();
                for (let i = 0; i < allFiles.length; i++) {
                    productData.append('image', allFiles[i]);
                }
                productData.append('translation.ar.productName', pNameAr);
                productData.append('translation.ar.description', pDescAr);
                productData.append('translation.ar.category', pCategoryAr);
                productData.append('translation.ar.brand', pBrandAr);
                productData.append('translation.en.productName', pNameEn);
                productData.append('translation.en.description', pDescEn);
                productData.append('translation.en.category', pCategoryEn);
                productData.append('translation.en.brand', pBrandEn);
                productData.append('price', Price);
                if (priceBeforeDisc != '')
                    productData.append('priceBeforeDiscount', priceBeforeDisc);
                if (percentage != '')
                    productData.append('discountPercentage', percentage);
                if (section != '')
                    productData.append('sectionType', section);
                addProduct(productData, setError, setloading, setAllProduct);
            }
        }
    }

    const closeDelete = () => {
        document.querySelector(".delete-product-popup").classList.replace("d-flex", "d-none");
    }
    const handleDeleteClick = (productID) => {
        setProductID(productID);
        document.querySelector(".delete-product-popup").classList.replace("d-none", "d-flex");
    }
    const deleteProd = () => {
        deleteProduct(productID, setError, setloading, setAllProduct);
    }

    const handleUpdateClick = (pNameAr, pNameEn, pDescAr, pDescEn, pCategoryAr, pCategoryEn, pBrandAr, pBrandEn, Price, priceBeforeDiscount, discountPercentage, sectionType, allImagesURL, productID) => {
        setPNameAr(pNameAr);
        setPNameEn(pNameEn);
        setpDescAr(pDescAr);
        setpDescEn(pDescEn);
        setpCategoryAr(pCategoryAr);
        setpCategoryEn(pCategoryEn);
        setpBrandAr(pBrandAr);
        setpBrandEn(pBrandEn);
        setPrice(Price);
        setpriceBeforeDisc(priceBeforeDiscount);
        setPercentage(discountPercentage);
        setSection(sectionType);
        setallImagesURL(allImagesURL);
        setPrevImage([])
        setProductID(productID);
        document.querySelector(".update-product-popup").classList.replace("d-none", "d-block");
    }
    const closeUpdatePopup = () => {
        document.querySelector(".update-product-popup").classList.replace("d-block", "d-none");
    }
    const updateProductFunc = () => {
        if (pNameAr == '' || pNameEn == ''
            || pDescAr == '' || pDescEn == '' ||
            Price == "" || pCategoryAr == "" || pCategoryEn == "" ||
            pBrandAr == '' || pBrandEn == '' || pCategoryEn == "Choice Category" ||
            pCategoryAr == "اختر الفئة" || pBrandAr == "اختر البراند" ||
            pBrandEn == "Choice Brand" || section == "اختر القسم") {
            setError("قم بإدخال بيانات المنتج كاملة");
        } else {
            let productData = new FormData();
            if (allFiles.length != 0) {
                for (let i = 0; i < allFiles.length; i++) {
                    productData.append('image', allFiles[i]);
                }
            }
            productData.append('translation.ar.productName', pNameAr);
            productData.append('translation.ar.description', pDescAr);
            productData.append('translation.ar.category', pCategoryAr);
            productData.append('translation.ar.brand', pBrandAr);
            productData.append('translation.en.productName', pNameEn);
            productData.append('translation.en.description', pDescEn);
            productData.append('translation.en.category', pCategoryEn);
            productData.append('translation.en.brand', pBrandEn);
            productData.append('price', Price);
            productData.append('priceBeforeDiscount', priceBeforeDisc);
            productData.append('discountPercentage', percentage);
            productData.append('sectionType', section);
            updateProduct(productData, setError, setloading, setAllProduct, productID);
        }
    }

    if (serverloading) return (<div className='loaderDiv container '><span className="loaderSelect"></span></div>)
    if (serverErrors) return (<div className='errorDiv container '><p>{serverErrors}</p></div>)


    return (
        <div className='container'>
            <div className='product-header-top' onClick={openPopup}>
                <div className='d-flex align-items-center'>
                    <FontAwesomeIcon icon={faPlus} />
                    <span>
                        أضف منتج جديد
                    </span>
                </div>
            </div>
            <div className='product-header-bottom d-flex justify-content-center align-items-center f-gap'>
                <div className='search-box'>
                    <input type="text" placeholder='بحث عن المنتجات' />
                </div>
                <div className='select-box'>
                    <select value="">
                        <option selected>اختر الفئة</option>
                        {category.map(item => {
                            return (
                                <option key={item}>{item}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className='d-flex flex-wrap'>
                {allProduct.map(product => {
                    return (
                        <div key={product._id} className='productBox'>
                            <img src={product.images[0]} />
                            <p className='firstP'>{product.translation.ar.productName}</p>
                            <p className='secondP'>{product.price}</p>
                            <button className='deleteBtn' onClick={() => handleDeleteClick(product._id)}>حذف</button>
                            <button className='updateBtn' onClick={() => handleUpdateClick(product.translation.ar.productName, product.translation.en.productName,
                                product.translation.ar.description, product.translation.en.description, product.translation.ar.category,
                                product.translation.en.category, product.translation.ar.brand, product.translation.en.brand, product.price, product.priceBeforeDiscount,
                                product.discountPercentage, product.sectionType, product.images, product._id)}>تعديل</button>
                        </div>
                    )
                })}
            </div>
            <div className='add-product-popup d-none'>
                <div className='add-product-popup-box t-center'>
                    <h1>إضافة منتج جديد</h1>
                    {(prevImage.length != 0) ? <div className='d-flex flex-wrap'>
                        {prevImage.map(item => {
                            return (
                                <div key={item} className='productImageBox'>
                                    <img src={item} />
                                </div>
                            )
                        })}
                    </div> : <label>

                        <div className='d-flex justify-content-center align-items-center flex-direction-column add-product-pic'>
                            <FontAwesomeIcon icon={faCamera} />
                            <p>اختر صور المنتج المطلوب</p>
                        </div>
                        <input className='select-input' multiple type="file" name='images' accept='.png, .jpg, .jpeg, .webp' onChange={selectImage} />
                    </label>}
                    {(error != '') ? <div className='d-flex justify-content-center align-items-center mt-1'><p className='errorMsg'>{error}</p></div> : null}
                    <div className='d-flex flex-wrap'>
                        <div className='ar-inputs d-flex flex-direction-column'>
                            <input type="text" placeholder='اسم المنتج' onChange={e => setPNameAr(e.target.value)} />
                            <textarea type="text" placeholder='وصف المنتج' onChange={e => setpDescAr(e.target.value)} />
                            <select onChange={e => setpCategoryAr(e.target.value)}>
                                <option selected>اختر الفئة</option>
                                {category.map(item => {
                                    return (
                                        <option key={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <select onChange={e => setpBrandAr(e.target.value)}>
                                <option selected>اختر البراند</option>
                                {brandAr.map(item => {
                                    return (
                                        <option key={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='en-inputs d-flex flex-direction-column'>
                            <input type="text" placeholder="Product Name" onChange={e => setPNameEn(e.target.value)} />
                            <textarea type="text" placeholder="Product Description" onChange={e => setpDescEn(e.target.value)} />
                            <select onChange={e => setpCategoryEn(e.target.value)}>
                                <option selected>Choice Category</option>
                                {categoryEn.map(item => {
                                    return (
                                        <option key={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <select onChange={e => setpBrandEn(e.target.value)}>
                                <option selected>Choice Brand</option>
                                {brandEn.map(item => {
                                    return (
                                        <option key={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='price-box d-flex'>
                        <input type="number" placeholder="السعر قبل الخصم" onChange={e => setpriceBeforeDisc(e.target.value)} />
                        <input type="number" placeholder="السعر بعد الخصم" onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div className='precintage-box'>
                        <input type="number" placeholder="نسبة الخصم" onChange={e => setPercentage(e.target.value)} />
                    </div>
                    <div className='sectionType-box'>
                        <select onChange={e => setSection(e.target.value)}>
                            <option selected>اختر القسم</option>
                            <option>Trending</option>
                            <option>On sale</option>
                            <option>Our selection</option>
                        </select>
                    </div>
                    <button className='cancel-btn' onClick={closePopup}>إلغاء</button>
                    <button className='add-btn' onClick={addProductFunc}>{(loading) ? <span className="loader"></span> : "إضافة"}</button>
                </div>
            </div>
            <div className='delete-product-popup d-none justify-content-center align-items-center'>
                <div className='delete-product-popup-box'>
                    <h3>هل انت متاكد من حذف هذا المنتج ؟</h3>
                    <button className="yesDelete" onClick={() => deleteProd()} >{(loading) ? <span className="loader"></span> : "نعم"}</button>
                    <button className="noDelete" onClick={closeDelete} >لا</button>
                </div>
            </div>
            <div className='update-product-popup d-none'>
                <div className='update-product-popup-box t-center'>
                    <h1>تعديل المنتج</h1>
                    {(prevImage.length != 0) ? <div className='d-flex flex-wrap'>
                        {prevImage.map(item => {
                            return (
                                <div key={item} className='productImageBox'>
                                    <img src={item} />
                                </div>
                            )
                        })}
                    </div> :
                        <div className='d-flex flex-wrap justify-content-center align-item-center'>
                            {
                                allImagesURL.map(item => {
                                    return (
                                        <img src={item} key={item} className='updateImage' />
                                    )
                                })
                            }
                        </div>

                    }
                    <label>
                        <div className='d-flex justify-content-center align-items-center flex-direction-column '>
                            <p>قم بتعديل صور المنتج</p>
                        </div>
                        <input className='select-input' multiple type="file" name='images' accept='.png, .jpg, .jpeg, .webp' onChange={selectImage} />
                    </label>
                    {(error != '') ? <div className='d-flex justify-content-center align-items-center mt-1'><p className='errorMsg'>{error}</p></div> : null}
                    <div className='d-flex flex-wrap'>
                        <div className='ar-inputs d-flex flex-direction-column'>
                            <input type="text" placeholder='اسم المنتج' value={pNameAr} onChange={e => setPNameAr(e.target.value)} />
                            <textarea type="text" placeholder='وصف المنتج' value={pDescAr} onChange={e => setpDescAr(e.target.value)} />
                            <select value={pCategoryAr} onChange={e => setpCategoryAr(e.target.value)}>
                                <option selected>اختر الفئة</option>
                                {category.map(item => {
                                    return (
                                        <option key={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <select value={pBrandAr} onChange={e => setpBrandAr(e.target.value)}>
                                <option selected>اختر البراند</option>
                                {brandAr.map(item => {
                                    return (
                                        <option key={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='en-inputs d-flex flex-direction-column'>
                            <input type="text" placeholder="Product Name" value={pNameEn} onChange={e => setPNameEn(e.target.value)} />
                            <textarea type="text" placeholder="Product Description" value={pDescEn} onChange={e => setpDescEn(e.target.value)} />
                            <select value={pCategoryEn} onChange={e => setpCategoryEn(e.target.value)}>
                                <option selected>Choice Category</option>
                                {categoryEn.map(item => {
                                    return (
                                        <option key={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <select value={pBrandEn} onChange={e => setpBrandEn(e.target.value)}>
                                <option selected>Choice Brand</option>
                                {brandEn.map(item => {
                                    return (
                                        <option key={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='price-box d-flex'>
                        <input type="number" placeholder="السعر قبل الخصم" value={priceBeforeDisc} onChange={e => setpriceBeforeDisc(e.target.value)} />
                        <input type="number" placeholder="السعر بعد الخصم" value={Price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div className='precintage-box'>
                        <input type="number" placeholder="نسبة الخصم" value={percentage} onChange={e => setPercentage(e.target.value)} />
                    </div>
                    <div className='sectionType-box'>
                        <select value={section} onChange={e => setSection(e.target.value)}>
                            <option selected>اختر القسم</option>
                            <option>Trending</option>
                            <option>On sale</option>
                            <option>Our selection</option>
                        </select>
                    </div>
                    <button className='cancel-btn' onClick={closeUpdatePopup}>إلغاء</button>
                    <button className='add-btn' onClick={updateProductFunc}>{(loading) ? <span className="loader"></span> : "تعديل"}</button>
                </div>
            </div>
        </div>
    )
}

export default Product;
