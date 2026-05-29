import Link from "next/link";
import { siteConfig } from "@/config/site";
export default function Header() {

    return (
        <header className="main_header_area">
            <div className="header-content bg-navy">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="links">
                        <ul>
                            <li><a href="{`tel:${siteConfig.contact.phone}`}" className="white"><i className="fa fa-phone"></i> {`tel:${siteConfig.contact.phone}`}</a></li>
                            <li><a href="{`mailto:${siteConfig.contact.email}`}" className="white"><i className="fa fa-support"></i> {siteConfig.contact.email}</a></li>
                        </ul>
                    </div>
                    <div className="links float-right">
                        <ul>
                            <li><a href="{siteConfig.social.facebook}" className="white"><i className="fab fa-facebook white" aria-hidden="true"></i></a></li>
                            <li><a href="{siteConfig.social.twitter}" className="white"><i className="fab fa-twitter white" aria-hidden="true"></i></a></li>
                            <li><a href="{siteConfig.social.instagram}" className="white"><i className="fab fa-instagram white" aria-hidden="true"></i></a></li>
                            <li><a href="{siteConfig.social.linkedin}" className="white"><i className="fab fa-linkedin white" aria-hidden="true"></i></a></li>

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
                                    <li><Link href="/about">About Us</Link></li>
                                    <li><Link href="/destinations">Destinations</Link></li>
                                    <li><Link href="/packages">Packages</Link></li>
                                    {/* <li><Link href="/services">Services</Link></li> */}
                                    <li><Link href="/contact">Contact Us</Link></li>
                                </ul>

                            </div>
                            <div id="slicknav-mobile">
                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </header>
    );
}
