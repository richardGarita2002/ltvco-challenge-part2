import { useState, useEffect } from "react"
import axios from "axios";
import '../../styles/topUrls.css';

export default function TopUrls () {
    const [urls, setUrls] = useState([]);   // State to store fetched URLs
    const [currentUrls, setCurrentUrls] = useState([]); // State to store URLs for current page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const urlsPerPage = 20;

    // Fetch URLs from the backend when component mounts
    useEffect(() => {
        axios.get('/api').then((response) => {
            setUrls(response.data.urls);
        }).catch((error) => {
            console.error(error);
            alert('An error was produced. Please, try again');  // Alert user on error
        })
    }, []);

    // Update current URLs and total pages when currentPage or URLs change
    useEffect(() => {
        const startIndex = (currentPage - 1) * urlsPerPage;
        const endIndex = startIndex + urlsPerPage;
        setCurrentUrls(urls.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(urls.length / urlsPerPage));
    }, [currentPage, urls, urlsPerPage]);

    const goToPage = (page) => {
        setCurrentPage(page);
    }

    return (
        <>
            <h2 className="mb-2">Top 100 most frequently accessed URLs!</h2>
                <table className="table table-striped table-hover w-75 mx-auto">
                    <thead>
                        <tr>
                            <td><strong>Top</strong></td>
                            <td><strong>Short Code</strong></td>
                            <td><strong>Title</strong></td>
                            <td><strong>Full Url</strong></td>
                            <td><strong>Click Count</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentUrls.map((url, index) => (
                                <tr key={index}>
                                    <td>{((currentPage-1) * urlsPerPage) + index+1}</td>
                                    <td>{url.short_code}</td>
                                    <td>{url.title ? url.title : 'Untitled Page'}</td>
                                    <td>{url.full_url}</td>
                                    <td>{url.click_count}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <nav>
                <ul className="pagination justify-content-center">
                    <li key={'prev'} className="page-item pag-button">
                        <span onClick={() => goToPage(Math.max(currentPage-1, 1))} className="page-link">&laquo;</span>
                    </li>
                    {Array.from({length: totalPages}, (_, i) => i + 1).map((i) => (
                        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''} pag-button`}>
                            <span onClick={() => goToPage(i)} className="page-link ">{i}</span>
                        </li>
                    ))}
                    <li key={'next'} className="page-item pag-button">
                        <span onClick={() => goToPage(Math.min(currentPage+1, totalPages))} className="page-link">&raquo;</span>
                    </li>
                </ul>
            </nav>
        </>
    )
} 