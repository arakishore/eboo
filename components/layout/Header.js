"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

function buildMenuItems(services = []) {
    const activeServices = Array.isArray(services) ? services : [];
    const items = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/destinations", label: "Destinations" },
    ];

    if (activeServices.length) {
        items.push({
            href: activeServices[0].href,
            label: "Services",
            children: activeServices.map((service) => ({
                href: service.href,
                label: service.label,
            })),
        });
    }

    items.push(
        //   { href: "/packages", label: "Packages" },
        { href: "/contact", label: "Contact Us" }
    );

    return items;
}

export default function Header({ services = [] }) {
    const pathname = usePathname();
    const menuItems = buildMenuItems(services);
    const isServicesPath = menuItems.some((item) =>
        item.children?.some((child) =>
            child.href === "/" ? pathname === child.href : pathname?.startsWith(child.href)
        )
    );
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(isServicesPath);
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
    const isMenuItemActive = (item) =>
        isActive(item.href) || item.children?.some((child) => isActive(child.href));

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
                        <div className="navbar-flex d-flex align-items-center justify-content-between w-100 pb-1 pt-1">

                            <div className="navbar-header">
                                <Link className="navbar-brand" href="/">
                                    <img src="/images/eboo-textlogo.png" alt="Eboo Logo" />
                                </Link>
                            </div>

                            <div className="navbar-collapse1 d-flex align-items-center" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav" id="responsive-menu">
                                    {menuItems.map((item) => (
                                        <li
                                            className={`${isMenuItemActive(item) ? "active" : ""}${item.children ? " submenu dropdown" : ""}`}
                                            key={item.href}
                                        >
                                            {item.children ? (
                                                <>
                                                    <Link
                                                        href={item.href}
                                                        className="dropdown-toggle"
                                                        role="button"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        {item.label}{" "}
                                                        <i className="icon-arrow-down" aria-hidden="true"></i>
                                                    </Link>
                                                    <ul className="dropdown-menu">
                                                        {item.children.map((child) => (
                                                            <li key={child.href}>
                                                                <Link href={child.href}>{child.label}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            ) : (
                                                <Link href={item.href}>{item.label}</Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div
                                id="slicknav-mobile"
                                className={isMobileMenuOpen ? "eboo-mobile-menu-open" : ""}
                            >
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
                                    <ul
                                        className="slicknav_nav eboo-mobile-nav"
                                        role="menu"
                                        aria-hidden={!isMobileMenuOpen}
                                        style={{ display: isMobileMenuOpen ? "block" : "none" }}
                                    >
                                        {menuItems.map((item) => (
                                            <li
                                                className={`${isMenuItemActive(item) ? "active" : ""}${item.children ? ` slicknav_parent ${isMobileServicesOpen ? "slicknav_open" : "slicknav_collapsed"}` : ""}`}
                                                key={item.href}
                                                role="none"
                                            >
                                                {item.children ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className="slicknav_item slicknav_row eboo-mobile-submenu-toggle"
                                                            aria-expanded={isMobileServicesOpen}
                                                            onClick={() =>
                                                                setIsMobileServicesOpen((isOpen) => !isOpen)
                                                            }
                                                        >
                                                            <span className="eboo-mobile-menu-label">{item.label}</span>
                                                            <span className="slicknav_arrow">
                                                                <i
                                                                    className={`fa ${isMobileServicesOpen ? "fa-minus" : "fa-plus"}`}
                                                                    aria-hidden="true"
                                                                ></i>
                                                            </span>
                                                        </button>
                                                        <ul
                                                            className={`dropdown-menu${isMobileServicesOpen ? "" : " slicknav_hidden"}`}
                                                            role="menu"
                                                            aria-hidden={!isMobileServicesOpen}
                                                            style={{ display: isMobileServicesOpen ? "block" : "none" }}
                                                        >
                                                            {item.children.map((child) => (
                                                                <li
                                                                    className={isActive(child.href) ? "active" : ""}
                                                                    key={child.href}
                                                                    role="none"
                                                                >
                                                                    <Link
                                                                        href={child.href}
                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                        role="menuitem"
                                                                    >
                                                                        {child.label}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        role="menuitem"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                )}
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
