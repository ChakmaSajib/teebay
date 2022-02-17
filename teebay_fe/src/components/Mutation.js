import React from 'react'
import { gql, useMutation } from "@apollo/client"

const CREATE_PRODUCT = gql`
mutation CreateProduct($name: String!, $quantityPerUnit: Int!){
    createProduct(record : {
        name: $name, 
        quantityPerUnit: $quantityPerUnit
    }){
        record{ name}
    }
}
`

export default function Mutation() {
    const [createProduct, { error, loading, data }] = useMutation(CREATE_PRODUCT, {
        variables: { name: "sajib", quantityPerUnit: 12 }
    })
    return (
        <div>
            <button onclick={createProduct()}>Add</button
        </div>
            )
} !
