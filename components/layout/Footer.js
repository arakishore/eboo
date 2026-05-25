export default function Footer() {
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
                                      In ut odio libero, at vulputate urna. Nulla tristique mi a massa convallis cursus. Nulla eu mi magna
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
                                          <a href="#">About Us</a>
                                      </li>
                                      <li>
                                          <a href="#">Travel Booking</a>
                                      </li>
                                      <li>
                                          <a href="#">Flight Booking</a>
                                      </li>
                                      <li>
                                          <a href="#">Car Booking</a>
                                      </li>
                                      <li>
                                          <a href="#">Blog</a>
                                      </li>
                                      <li>
                                          <a href="#">Contact</a>
                                      </li>
                                  </ul>
                              </div>
                              <div className="footer-listing-main d-lg-flex align-items-center justify-content-between mt-4 text-center">
                                  <div className="footer-listing white">
                                      <i className="fa fa-map-marked white mb-1"></i>
                                      123 Collins Street, sydney, <br />Australia 750
                                  </div>
                                  <div className="footer-listing">
                                      <i className="fa fa-fax white mb-1"></i>
                                      <p className="white mb-0">Toll Free: +47-252-254-2542</p>
                                      <p className="white mb-0">Fax: +47-252-254-2542</p>
                                  </div>
                                  <div className="footer-listing">
                                      <i className="fa fa-headphones white mb-1"></i>
                                      <p className="white mb-0">Support@eboo.com</p>
                                      <p className="white mb-0">info@eboo.com</p>
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
                              <p className="m-0 white">2026 eboo. All rights reserved.</p>
                          </div>
                      </div>    
                  </div>
              </div>
              <div className="dot-overlay"></div>
          </footer>
    </>
  );
}
