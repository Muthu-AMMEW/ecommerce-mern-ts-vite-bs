import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

export default function Search() {

    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState("")

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${keyword}`)

    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchHandler();
        }
    };

    const clearKeyword = () => {
        setKeyword("");
    }

    useEffect(() => {
        if (location.pathname === '/') {
            clearKeyword();
        }
    }, [location])

    return (
        <form className="mx-auto w-100 ms-xl-5 ps-xl-5 mm-input-box-color" style={{ maxWidth: "500px" }} onSubmit={searchHandler}>
            <div className="input-group px-5 px-lg-0">
                <input type="search" className="form-control" id='search' name='search' value={keyword} onChange={(e) => { setKeyword(e.target.value) }} onKeyDown={handleKeyDown} placeholder="Enter Product Name ..." required />
                <button id="search_btn" className="btn btn-warning">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>

            </div>
        </form>
    )
}