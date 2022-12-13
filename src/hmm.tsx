import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
const fetchSneakers = () => {
    return axios.get('https://611a826e5710ca00173a1a6e.mockapi.io/items')
}
const Hmm = () => {
    const result = useQuery('fetch-sneakers', fetchSneakers);
    console.log(result);
    return (
        <>
            <div>
                {
                    result.data &&
                    result.data!.data.map((sneaker: any) => (
                        <div key={sneaker.id}>
                            <h3>{sneaker.title}</h3>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Hmm;