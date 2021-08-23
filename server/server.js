const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

let products = [
    {id: 1, code: 'P1000', name:'UGG Women Classic Short Boot', category: 'Clothing', likes: 0},
    {id: 2, code: 'P2000', name:'Dell Inspiron 15.6-Inch Laptop', category: 'Electronic', likes: 0},
    {id: 3, code: 'P3000', name:'San Francisco Bay Coffee Breakfast Blend', category: 'Food', likes: 0}
]

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/products', (request, response) => {
    response.json(products)
})

app.get('/api/products/:id', (request, response) => {
    const id = Number (request.params.id)
    const product = products.find(product => product.id === id)
    if(product) {
        response.json(product)
    } 
    else{
        response.status(404).end()
    } 
})

app.delete('/api/products/:id', (request, response) => {
    const id = Number (request.params.id)
    products = products.filter(product => product.id !== id)
    response.status(204).end()
})

app.post('/api/products/', (request, response) => {
    const body = request.body
    if (!body.name || !body.category) {
        return response.status(400).json({
            error: 'name or category missing'
        })
    }

    const product = {
        id: generateId(),
        code: body.code,
        name: body.name,
        category: body.category, 
        likes: 0
    }
    
    products = products.concat(product)
    console.log('the posted product is', product)
    response.json(product)
})

const generateId = () => {
    const maxId = products.length > 0 
    ? Math.max(...products.map(product => product.id))
    : 0
    return maxId + 1
}

app.put('/api/products/:id', (request, response) => {
    const id = Number (request.params.id)
    const updatedProduct = request.body

    products = products.map(product => 
        product.id === id? updatedProduct : product
    )
    console.log('after update', updatedProduct)
    response.json(updatedProduct)

    //do not rely the updated product object from the frontend
    //find out the product with this id, and update its number of likes
    // const product = products.find(product => product.id === id)
    // console.log('before update', product)
    // const newProduct = {...product, likes: product.likes+1}
    // products = products.map((product) => 
    //     product.id === id? newProduct : product
    // )
    // console.log('after update', newProduct)
    // response.json(newProduct)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log('Server running on port', PORT)
})