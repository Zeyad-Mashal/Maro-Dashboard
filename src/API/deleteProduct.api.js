const URL = 'https://maro-cares.onrender.com/product/removeProduct/';
const AccessTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWIwMDYzN2ExNjVlNmRlYzRmN2VjNCIsImlhdCI6MTcwNTcwNjIxOH0._jEOgPZadxZJmlnXHhRlIdhbiY0N2EwcvVZZgi4LO-U';

const deleteProduct = (productID, setError, setloading, setAllProduct) => {
    setloading(true)
    fetch(`${URL}${productID}`, {
        method: "delete",
        headers: {
            "authrization": `maroTK${AccessTOKEN}`,
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setloading(false)
                setAllProduct(responseJson.products)
                document.querySelector(".delete-product-popup").classList.replace("d-flex", "d-none");
            } else {
                setError(responseJson.message);
                setloading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setloading(false)
        })
}
export default deleteProduct;