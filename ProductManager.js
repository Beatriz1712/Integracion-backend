import fs from "fs"

export default class ProductManager {
    constructor(path) {
        this.path = path
    }
    addProduct = async (productEn) => {
        const { title, description, code, price, stock, img } = productEn

        let products = await this.getProducts()
        if (Array.isArray(products)) {
            if (title !== undefined && description !== undefined && code !== undefined && price !== undefined && stock !== undefined ) {
                let validator = products.some((el) => el.code == code)
                if (!validator) {

                    let titleValidated = title.toString()
                    let descriptionValidated = description.toString()
                    let codeValidated = code.toString()
                    let priceValidated = parseFloat(price)
                    let stockValidated = parseInt(stock)
                
                    

                    let product = {
                        id: products.length > 0 ? (products[products.length - 1].id + 1) : 1,
                        title :titleValidated,
                        description: descriptionValidated,
                        price: priceValidated,
                        code: codeValidated,
                        stock: stockValidated
                    
                    }
                    products.push(product)
                    try {
                        await fs.promises.writeFile(this.path, JSON.stringify(products))
                        return "Producto agregado" 
                    } catch (error) {
                        return error
                    }

                } else {
                     mssgE = "Error: Error de codigo"
                    return mssgE
                }
            } else return "Error: Datos incompletos"
        }

    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            try {
                const data = await fs.promises.readFile(this.path, "utf-8")
                return JSON.parse(data)
            } catch (error) {
                return error
            }
        } else return []

    }

    getProductById = async (id) => {
        let products = await this.getProducts()
        if (Array.isArray(products)) {
            let response = products.filter((el) => el.id == id)
            if (response.length > 0) return response[0]
            else {
                return { Error: "Producto no encontrado" }
            }
        } else return "Error"

    }
    //falta
    updateProduct = async (id, keysObject) => {
        let products = await this.getProducts()
        if (Array.isArray(products)) {

            let response = products.filter((el) => el.id == id)
            let keysModified = 0

            if (keysObject.code) {
                let filter = products.filter((el) => el.code == keysObject.code)
                if (filter.length > 0) {
                    let finalFilter = filter.filter((el) => el.id == id)
                    if (finalFilter.length < 1) return "Ese codigo ya existe"
                }
            }


            if (response.length > 0) {
                let toModify = response[0]
                for (const key in keysObject) {
                    if (Object.hasOwnProperty.call(keysObject, key)) {
                        const newValor = keysObject[key];
                        if (toModify[key]) {
                            toModify[key] = newValor
                            keysModified += 1
                        }
                    }
                }

                if (keysModified > 0) {

                    let toWrite = products.filter((el) => el.id !== parseInt(id))

                    toWrite.push(toModify)
                    toWrite.sort((a, b) => {
                        if (a.id < b.id) {
                            return -1;
                        }
                        if (a.id > b.id) {
                            return 1;
                        }
                        // deben sr iguales
                        return 0;
                    })

                    try {
                        await fs.promises.writeFile(this.path, JSON.stringify(toWrite))
                        return `Producto con id: ${id} se actualizo ${keysModified} en ${Object.keys(keysObject).length} `
                    } catch (error) {
                        return error
                    }
                } else return " no coinciden los datos"

            }
            else {
                return "Error: No encontrado"
            }


        } else return "Error  file"


    }

    deleteProduct = async (id) => {
        let products = await this.getProducts()
        if (Array.isArray(products)) {
            let exist = products.some((el) => el.id == id)
            if (exist) {
                let response = products.filter((el) => el.id !== parseInt(id))
                try {
                    await fs.promises.writeFile(this.path, JSON.stringify(response))
                    return "Producto eliminado"
                } catch (error) {
                    return error
                }
            } else {
                return "Error: Id no encontrado"
            }

        } else return "Error"



    }

}





