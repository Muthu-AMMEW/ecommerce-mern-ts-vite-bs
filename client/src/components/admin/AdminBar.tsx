import { Link } from 'react-router-dom';

export default function AdminBar() {

    return (

        <nav id="adminBar">
            <ul className="list-unstyled components d-flex justify-content-around p-3 m-0 px-lg-5">

                <li>
                    <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                </li>

                <li>
                    <div className="dropdown">
                        <a className="dropdown-toggle p-0 me-3 m-sm-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='blocker'><i className="fa-brands fa-product-hunt"></i></span> Product
                        </a>

                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item text-black" to={'/admin/products'}><i className='fa fa-shopping-basket'> </i> All</Link></li>
                            <li><Link className="dropdown-item text-black" to={'/admin/products/create'}><i className='fa fa-plus'>  </i>Create</Link></li>

                        </ul>
                    </div>
                </li>

                <li>
                    <Link to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                </li>

                <li>
                    <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                </li>

                <li>
                    <Link to="/admin/reviews"><i className="fa fa-users"></i> Reviews</Link>
                </li>

            </ul>
        </nav>
    )
}