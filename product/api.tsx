import { Product } from "./types";
import axios from "axios"
import Papa from "papaparse"


export default {
    list: async (): Promise<Product[]> => {

        return axios.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vTcHak1XyBTKTVDWZWavZ5BlkK-Y9GdgVHp-Hep1mD6zISLBV42d8PYUQZrBpZUo_SQePVjKGcDgy55/pub?output=csv",
            {
                responseType: "blob"
            }).then((response) => new Promise<Product[]>((resolve, reject) => {
                Papa.parse(response.data, {
                    header: true,
                    complete: results => {
                        const products = results.data as Product[]

                        return resolve(
                            products.map((product) => ({
                                ...product,
                                price: Number(product.price),
                            }))
                        )
                    },
                    error: error => reject(error.message)
                })
            }))
    }
}