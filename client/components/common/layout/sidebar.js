import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Import custom components
import UserPanel from './sidebarUserPanel';
import Search from './sidebarSearch';

class Sidebar extends Component {
    render() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">

                    <UserPanel/>

                    <Search/>

                    <ul className="sidebar-menu">
                        <li className="header">MAIN NAVIGATION</li>
                        <li className="active">
                            <Link to={'/dashboard'} activeClassName="active"><i
                                className="fa fa-dashboard"></i><span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/products'} activeClassName="active"><i
                                className="fa fa-cart-plus"></i><span>Product</span>
                            </Link>
                        </li>
                        <li className="treeview">
                            <Link to={'#'} activeClassName="active"><i
                                className="fa fa-gear"></i><span>Setting</span>
                                <span className="pull-right-container">
                                   <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </Link>

                            <ul className="treeview-menu">
                                <li><Link to={'#'} activeClassName="active"><i className="fa fa-circle-o"></i>Notification</Link></li>
                                <li><Link to={'#'} activeClassName="active"><i className="fa fa-circle-o"></i>Discount</Link></li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </aside>
        );
    }
}

export default Sidebar