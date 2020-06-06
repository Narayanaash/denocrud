import { v4 } from "https://deno.land/std/uuid/mod.ts"
import { Product } from "../types.ts";
let products: Product[] = [
    {
        id: "1",
        name: "Product One",
        description: "This is product one",
        price: 20,
    },
    {
        id: "2",
        name: "Product two",
        description: "This is product two",
        price: 40,
    },
    {
        id: "3",
        name: "Product three",
        description: "This is product three",
        price: 10,
    }
]

// @desc get all products
// @route GET /api/v1/products
const getProducts = ({ response } : { response: any }) => {
    response.body = {
        succes: true,
        data: products,
    }
}

// @desc get single product
// @route GET /api/v1/products/:id
const getProduct = ({ params, response } : { params: { id: string }, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if (product) {
        response.status = 200
        response.body = {
            succes: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            succes: false,
            msg: "product not found!"
        }
    }
}

// @desc add product
// @route POST /api/v1/products
const addProduct = async ({ request, response } : { request: any, response: any }) => {
    const body = await request.body()

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            succes: false,
            msg: "No data"
        }
    } else {
        const product: Product = body.value
        product.id = v4.generate()
        products.push(product)
        response.status = 201
        response.body = {
            succes: true,
            data: product
        }
    }
}

// @desc update a product
// @route PUT /api/v1/products/:id
const updateProduct = async ({ params, request, response } : { params: { id: string }, request: any, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)
    
    if (product) {
        const body = await request.body()

        const updateData: { name?: string; description?: string; price?: number } = body.value

        products = products.map(p => p.id === params.id ? { ...p, ...updateData } : p)
        
        response.status = 200
        response.body = {
            succes: true,
            data: products
        }
    } else {
        response.status = 404
        response.body = {
            succes: false,
            msg: "product not found!"
        }
    }
}

// @desc delete  product
// @route DELETE /api/v1/products/:id
const deleteProduct = ({ params, response } : { params: { id: string }, response: any }) => {
    products = products.filter(p => p.id !== params.id)

    response.body = {
        succes: true,
        msg: "product removed"
    }
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }