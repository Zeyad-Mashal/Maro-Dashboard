const URL = 'https://maro-cares.onrender.com/product/addProduct';
const AccessTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWIwMDYzN2ExNjVlNmRlYzRmN2VjNCIsImlhdCI6MTcwNTcwNjIxOH0._jEOgPZadxZJmlnXHhRlIdhbiY0N2EwcvVZZgi4LO-U';
const addProduct = (productData, setErrors, setloading, setAllProduct) => {
    setloading(true)
    fetch(URL, {
        method: "POST",
        headers: {
            "authrization": `maroTK${AccessTOKEN}`
        },
        body: productData
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setloading(false)
                setAllProduct(responseJson.products)
                document.querySelector(".add-product-popup").classList.replace("d-block", "d-none");
            } else {
                setErrors(responseJson.message);
                setloading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setloading(false)
        })
}
export default addProduct;