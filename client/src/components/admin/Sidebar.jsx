import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export default function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components ps-3 pt-4">
                    <li>
                        <Link to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>
                    <li>
                        <div className="dropdown">
                            <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-brands fa-product-hunt"></i> Product
                            </a>

                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item text-black" to={'/admin/products'}><i className='fa fa-shopping-basket'> </i> All</Link></li>
                                <li><Link className="dropdown-item text-black" to={'/admin/products/create'}><i className='fa fa-plus'>  </i>Create</Link></li>

                            </ul>
                        </div>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-users"></i> Reviews</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}