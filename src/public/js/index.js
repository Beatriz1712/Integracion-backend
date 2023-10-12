const socketClient = io()
const divProducts = document.getElementById('products-container')
const form = document.getElementById('formulario')
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const code = document.getElementById('code')
const stock = document.getElementById('stock')



const resetForm = () => {
    title.value = ''
    description.value = ''
    price.value = ''
    code.value = ''
    stock.value = ''

}

socketClient.on('productList', products => {
    console.log(products)
    const productList = products.map(product => {

        return `
        <img>
    
            <h5>${product.title}</h5>
            <p>Id producto: ${product.id}</p>
            <p>Descripcion: ${product.description}</p>
            <p>Precio: $${product.price}</p>
            <p>Codigo: ${product.code}</p>
            <p>Stock: ${product.stock}</p>
            
            <button class="btn btn-danger" data-id="${product.id}">Eliminar</button><hr>
        
        `
    }).join(' ')
    divProducts.innerHTML = productList

    let deleteButton = document.querySelectorAll('.btn-danger')
    console.log(deleteButton)
    deleteButton.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const idProduct = e.target.getAttribute('data-id')
            socketClient.emit('deleteProduct', idProduct)
        })
    })
})
    

form.onsubmit = (e) => {
    e.preventDefault()

    const product = {
        title: title.value,
        description: description.value,
        price: price.value,
        code: code.value,
        stock: stock.value
    }
   //ojo -lado del cliente-envia mssge el cliente
    socketClient.emit('addProduct', product)
    
    resetForm()
}
