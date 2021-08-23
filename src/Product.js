//import React from 'react';

const Product = ({product, addLike}) => {

  const style = {
    listStyle: 'none',
    // backgroundColor: '#8d5d8d'
    margin: '10px'
  }
    return(
      <li style={style}> 
        {product.code} -- {product.name} -- {product.category} -- {product.likes} 
        &nbsp;&nbsp;
        <button onClick={() => addLike(product)}> Like </button>
      </li>
    )
}

export default Product