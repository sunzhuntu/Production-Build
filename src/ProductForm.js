import { useState } from "react"
import './productForm.css' 

const ProductForm = ({addProduct}) => {

    const[newProductCode, setNewProductCode] = useState('a new product code')
    const[newProductName, setNewProductName] = useState('a new product name')
    const[newProductCate, setNewProductCate] = useState('a new product category')
  
    const handleNewProductCode = (event) => {
      console.log(event.target.value)
      setNewProductCode(event.target.value)
    }
  
    const handleNewProductName = (event) => {
      console.log(event.target.value)
      setNewProductName(event.target.value)
    }
  
    const handleNewProductCate = (event) => {
      console.log(event.target.value)
      setNewProductCate(event.target.value)
    }
  
    const formHandler = (event) => {
      event.preventDefault()
      const productObject = {
        code: newProductCode,
        name: newProductName, 
        category: newProductCate,
        likes: 0
    }
    addProduct(productObject)
    
    setNewProductCode('a new product code')
    setNewProductName('a new product name')
    setNewProductCate('a new product category')
  }
  
    return(
      <form className="productForm" onSubmit={formHandler}>
          <input 
            value={newProductCode}
            onChange={handleNewProductCode}
          />
          <br/>
          <input 
            value={newProductName}
            onChange={handleNewProductName}
          />
          <br/>
          <input 
            value={newProductCate}
            onChange={handleNewProductCate}
          />
          <br/><br/>
          <button type='submit'> Add </button>
        </form>
    )
    
}

export default ProductForm