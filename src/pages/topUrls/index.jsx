import { useState, useEffect } from "react"
import axios from "axios";

export default function TopUrls () {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        axios.get('/api').then((response) => {
            setUrls(response.data.urls);
            console.log(urls);
        }).catch((error) => {
            console.error(error);
            alert('An error was produced. Please, try again')
        })
    }, [])

    return (
        <>
            <h2 className="mb-2">Top 100 most frequently accessed URLs!</h2>
        </>
    )
} 