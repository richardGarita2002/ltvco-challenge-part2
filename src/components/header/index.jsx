import AddUrl from "./components/addUrlModal"
import '../../styles/header.css';

export default function Header(){
    return (
        <>
            <nav className="navbar navbar-expand-lg header">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link link-item" href="/">Top 100 Urls</a>
                    </li>
                    <li className="nav-item active">
                        <AddUrl/>
                    </li>
                </ul>
            </nav>
        </>
    )
}
