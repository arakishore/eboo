"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        let previousScroll = window.scrollY || document.documentElement.scrollTop;

        function handleScroll() {
            const currentScroll = window.scrollY || document.documentElement.scrollTop;

            setIsSticky(currentScroll > 10);
            setIsHidden(currentScroll > previousScroll && currentScroll > 200);
            previousScroll = currentScroll;
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const isActive = (href) => (href === "/" ? pathname === href : pathname?.startsWith(href));

    return (
        <header className="main_header_area">
            <div className="header-content bg-navy">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="links">
                        <ul>
                            <li><a href={`tel:${siteConfig.contact.phone}`} className="white"><i className="fa fa-phone"></i> {siteConfig.contact.phone}</a></li>
                            <li><a href={`mailto:${siteConfig.contact.email}`} className="white"><i className="fa fa-support"></i> {siteConfig.contact.email}</a></li>
                        </ul>
                    </div>
                    <div className="links float-right">
                        <ul>
                            <li><a href={siteConfig.social.facebook} className="white"><i className="fab fa-facebook white" aria-hidden="true"></i></a></li>
                            <li><a href={siteConfig.social.twitter} className="white"><i className="fab fa-twitter white" aria-hidden="true"></i></a></li>
                            <li><a href={siteConfig.social.instagram} className="white"><i className="fab fa-instagram white" aria-hidden="true"></i></a></li>
                            <li><a href={siteConfig.social.linkedin} className="white"><i className="fab fa-linkedin white" aria-hidden="true"></i></a></li>

                        </ul>
                    </div>
                </div>
            </div>

            <div className={`header_menu${isHidden ? " hide" : ""}`} id="header_menu">
                <nav className={`navbar navbar-default${isSticky ? " navbar-sticky-in" : ""}`}>
                    <div className="container">
                        <div className="navbar-flex d-flex align-items-center justify-content-between w-100 pb-2 pt-2">

                            <div className="navbar-header">
                                <Link className="navbar-brand" href="/">
                                    <img src="/images/logo.png" alt="image" />
                                </Link>
                            </div>

                            <div className="navbar-collapse1 d-flex align-items-center" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav" id="responsive-menu">
                                    {menuItems.map((item) => (
                                        <li className={isActive(item.href) ? "active" : ""} key={item.href}>
                                            <Link href={item.href}>{item.label}</Link>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div id="slicknav-mobile">
                                <div className="slicknav_menu">
                                    <button
                                        type="button"
                                        aria-label="Toggle navigation"
                                        aria-expanded={isMobileMenuOpen}
                                        className={`slicknav_btn ${isMobileMenuOpen ? "slicknav_open" : "slicknav_collapsed"}`}
                                        onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
                                    >
                                        <span className="slicknav_menutxt"></span>
                                    </button>
                                    <ul className="slicknav_nav" style={{ display: isMobileMenuOpen ? "block" : "none" }}>
                                        {menuItems.map((item) => (
                                            <li className={isActive(item.href) ? "active" : ""} key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </header>
    );
}
