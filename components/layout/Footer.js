import Link from "next/link";
import { siteConfig } from "@/config/site";
export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="pt-10" style={{ backgroundImage: "url(/images/bg/bg3.jpg)" }}>
              <div className="footer-upper pb-5">
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mb-4">
                              <div className="footer-about">
                                  <img src="/images/logo.png" alt="" />
                                  <p className="mt-3 mb-3">
                                      Explore handpicked tour packages, holiday destinations, family vacations, honeymoon trips, adventure tours, and customized travel experiences with EBOO. Find your perfect getaway today
                                  </p>
                                  <div className="social-links">
                                      <ul>  
                                          <li><a href="#"><i className="fab fa-facebook" aria-hidden="true"></i></a></li>
                                          <li><a href="#"><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                                          <li><a href="#"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                                          <li><a href="#"><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                              <div className="footer-links text-center">
                                  <ul className="list">
                                      <li>
                                          <Link href="/about">About Us</Link>
                                      </li>
                                      <li>
                                          <Link href="/destinations">Destinations</Link>
                                      </li>

                                      <li>
                                          <Link href="/packages">Packages</Link>
                                      </li>
                                      {/* <li>
                                          <Link href="/services">Services</Link>
                                      </li> */}
                                      <li>
                                          <Link href="/faqs">Faq</Link>
                                      </li>
                                      <li>
                                          <Link href="/contact">Contact</Link>
                                      </li>
                                  </ul>
                              </div>
                              <div className="footer-listing-main d-lg-flex align-items-center justify-content-between mt-4 text-center">
                                  <div className="footer-listing white">
                                      <i className="fa fa-map-marked white mb-1"></i>
                                      {siteConfig.address.line1},  {siteConfig.address.line2},
                                      <br />
                                       {siteConfig.address.city}, {siteConfig.address.state}, {siteConfig.address.country}
                                  </div>
                                  <div className="footer-listing">
                                      <i className="fa fa-fax white mb-1"></i>
                                      <p className="white mb-0">{siteConfig.contact.phone}</p>

                                  </div>
                                  <div className="footer-listing">
                                      <i className="fa fa-headphones white mb-1"></i>
                                      <p className="white mb-0">{siteConfig.contact.email}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="footer-copyright pt-2 pb-2">
                  <div className="container">
                      <div className="copyright-inner">
                          <div className="copyright-text text-center">
                              <p className="m-0 white">{currentYear} eboo. All rights reserved.</p>
                          </div>
                      </div>    
                  </div>
              </div>
              <div className="dot-overlay"></div>
          </footer>
    </>
  );
}
