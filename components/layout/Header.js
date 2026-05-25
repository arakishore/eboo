import Link from "next/link";

export default function Header() {
   
    return (
        <header className="main_header_area">
            <div className="header-content bg-navy">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="links">
                        <ul>
                            <li><a href="#" className="white"><i className="fa fa-phone"></i> (000)999-898-888</a></li>
                            <li><a href="#" className="white"><i className="fa fa-support"></i> info@eboo.com</a></li>
                            <li><a href="#" className="white"><i className="fa fa-map-marker"></i> Mon-Fri: 10 AM – 5 PM</a></li>
                        </ul>
                    </div>
                    <div className="links float-right">
                        <ul>
                            <li><a href="#"><i className="fab fa-facebook white" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter white" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram white" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fab fa-linkedin white" aria-hidden="true"></i></a></li>

                        </ul>
                    </div>
                </div>
            </div>

            <div className="header_menu" id="header_menu">
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-flex d-flex align-items-center justify-content-between w-100 pb-2 pt-2">

                            <div className="navbar-header">
                                <Link className="navbar-brand" href="/">
                                    <img src="/images/logo.png" alt="image" />
                                </Link>
                            </div>

                            <div className="navbar-collapse1 d-flex align-items-center" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav" id="responsive-menu">
                                    <li><Link href="/">Home</Link></li>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                </ul>
                                 
                            </div>
                            <div id="slicknav-mobile"><div className="slicknav_menu"><a href="#" aria-haspopup="true" tabIndex="0" className="slicknav_btn slicknav_collapsed"><span className="slicknav_menutxt"></span><span className="slicknav_icon slicknav_no-text"><span className="slicknav_icon-bar"></span><span className="slicknav_icon-bar"></span><span className="slicknav_icon-bar"></span></span></a><ul className="slicknav_nav slicknav_hidden" role="menu" aria-hidden="true" style={{ display: "none" }}>
                                <li><Link href="/">Home</Link></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#" role="menuitem" tabIndex="-1">Contact Us</a></li>
                            </ul></div></div>
                        </div>
                    </div>
                </nav>

            </div>
        </header>
    );
}
