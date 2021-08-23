//import logo from './logo.svg';
import './App.css';
import { useEffect, useState} from 'react';
import Product from './Product';
import ProductForm from './ProductForm';
import productServices from './services/products';

const App = () => {
  const[products, setProducts] = useState([])
  const[showAll, setShowAll] = useState(true)

  useEffect(()=> {
    console.log('effect')
    productServices.getAll()
    .then(object => {
      console.log('promise fulfilled')
      setProducts(object)
    })
  }, [])

  console.log('render', products.length, 'pieces of products')

  const productToShow = showAll
  ? products
  : products.filter(product => product.category === 'Electronic')

  const addLike = (product) => {
    const newProduct = {...product, likes: product.likes+1}
    console.log('update likes in item', newProduct)
    productServices.update(newProduct)
        .then(data => {
          console.log("got response", data)
          const newProducts = products.map(
            product => product.id === data.id ? data : product
          )
          setProducts(newProducts)
        })
        .catch(
          (error) => {
            alert('we got an error')
          }
        )
        .finally(
          console.log('We have done')
        )
  }

  const addProduct = (productObject) => {
    productServices.create(productObject)
    .then(object => {
      console.log('the returned response for the post request', object)
      setProducts(products.concat(object)) 
    })
  }

  return(
    <div className="App">
      <h3> My Favorite Products</h3>
      <div>
        <button onClick={() => setShowAll(!showAll)}> 
          Show {showAll? 'Electronics' : 'All'}
        </button>
      </div>
      <ul>
        {productToShow.map((product, index) => 
          <Product key={index} product={product} addLike={addLike}/>
        )}
      </ul>
      <ProductForm addProduct={addProduct}/>
    </div>
  )
}

export default App;
