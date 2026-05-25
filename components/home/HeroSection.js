export default function HeroSection() {
  return (
    <section className="banner overflow-hidden">
              <div className="slider slider1">
                  <div className="swiper-container">
                      <div className="swiper-wrapper ">
                          <div className="swiper-slide">
                              <div className="slide-inner">
                                  <div className="slide-image" style={{ backgroundImage: "url(/images/slider/1.jpg)" }}></div>
                                  <div className="swiper-content container">
                                      <h1 className="white mb-2">Travel – Explore the world with a backpack</h1>
                                      <p className="white mb-4">Primis aptent vel turpis a a class suspendisse et augue orci a diam tristique consequat hendrerit ullamcorper top50torquent </p>
                                      <a href="#" className="per-btn">
                                          <span className="white">Explore</span>
                                          <i className="fa fa-arrow-right white"></i>
                                      </a>
                                  </div>
                                  <div className="overlay"></div>
                              </div>
                          </div>
                          <div className="swiper-slide">
                              <div className="slide-inner">
                                  <div className="slide-image" style={{ backgroundImage: "url(/images/slider/5.jpg)" }}></div>
                                  <div className="swiper-content1 container">
                                      <h1 className="white mb-2">IT’S A BIG WORLD OUT THERE GO EXPLORE</h1>
                                      <p className="white mb-4">Lorem consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet <br /> contetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                                      <a href="#" className="per-btn">
                                          <span className="white">Explore</span>
                                          <i className="fa fa-arrow-right white"></i>
                                      </a>
                                  </div>
                                  <div className="overlay"></div>
                              </div>
                          </div>
                          <div className="swiper-slide">
                              <div className="slide-inner">
                                  <div className="slide-image" style={{ backgroundImage: "url(/images/slider/10.jpg)" }}></div>
                                  <div className="swiper-content2 container">
                                      <h1 className="white mb-2">DISCOVER THE WORLD YOU HAVE NEVER SEEN</h1>
                                      <p className="white mb-4">Lorem consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet <br /> contetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                                      <a href="#" className="per-btn">
                                          <span className="white">Discover</span>
                                          <i className="fa fa-arrow-right white"></i>
                                      </a>
                                  </div>
                                  <div className="overlay"></div>
                              </div>
                          </div>
      
                      </div>
                      
                      <div className="swiper-pagination"></div>
                  </div>
              </div>
          </section>
  );
}   