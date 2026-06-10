import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer style={{ backgroundImage: "url(/images/bg/bg3.jpg)" }}>
            <div className="footer-upper">
                <div className="container">
                    <div className="footer-grid">

                        {/* Col 1 — Brand */}
                        <div className="footer-brand">
                            <img src="/images/eboo-logo-new.png" alt="eboo logo" style={{ height: 100 }} />
                            <p>Explore handpicked tour packages, holiday destinations, family vacations, honeymoon trips, and customized travel experiences.</p>
                            <div className="social-links">
                                <ul>
                                    <li><a href="#"><i className="fab fa-facebook" /></a></li>
                                    <li><a href="#"><i className="fab fa-twitter" /></a></li>
                                    <li><a href="#"><i className="fab fa-instagram" /></a></li>
                                    <li><a href="#"><i className="fab fa-linkedin" /></a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Col 2 — Quick Links */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">Quick links</h4>
                            <ul className="footer-nav">
                                <li><Link href="/about">About us</Link></li>
                                <li><Link href="/destinations">Destinations</Link></li>
                                <li><Link href="/packages">Packages</Link></li>
                                <li><Link href="/faqs">FAQ</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Col 3 — Legal */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">Legal</h4>
                            <ul className="footer-nav">
                                <li><Link href="/terms-and-conditions">Terms &amp; conditions</Link></li>
                                <li><Link href="/privacy-policy">Privacy policy</Link></li>
                                <li><Link href="/cookie-policy">Cookies policy</Link></li>
                            </ul>
                        </div>

                        {/* Col 4 — Contact */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">Contact us</h4>
                            {/* Address stays as its own row */}
                            <div className="footer-contact-item">
                                <i className="fa fa-map-marked" />
                                <div>
                                    <span className="label">Address</span>
                                    <p>{siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.state}</p>
                                </div>
                            </div>

                            {/* Phone + Email in one row */}
                            <div className="footer-contact-row">
                                <div className="footer-contact-half">
                                    <i className="fa fa-phone" />
                                    <div>
                                        <span className="label">Phone</span>
                                        <p>{siteConfig.contact.phone}</p>
                                    </div>
                                </div>
                                <div className="footer-contact-half">
                                    <i className="fa fa-envelope" />
                                    <div>
                                        <span className="label">Email</span>
                                        <p>{siteConfig.contact.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="footer-divider" />

            <div className="footer-copyright">
                <div className="container">
                    <div className="copyright-inner">
                        <div className="copyright-text text-center">
                            <p>© {currentYear} eboo. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dot-overlay" />
        </footer>
    );
}