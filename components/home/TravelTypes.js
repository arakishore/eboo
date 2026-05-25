export default function TravelTypes() {
  return (
          <section className="about-us pb-6">
              <div className="container">
                  <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
                      <h2 className="m-0">Find what <span>fits you Best</span></h2>
                      <p className="mb-0">Travel has helped us to understand the meaning of life and it has helped us become better people. Each time we travel, we see the world with new eyes.</p>
                  </div>
                  <style>{`
                      .why-us-item {
                          background: #f9f9f9;
                          border-radius: 16px;
                          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                          transition: transform 0.3s ease, box-shadow 0.3s ease;
                          padding: 30px 20px;
                          height: 100%;
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                          justify-content: space-between;
                          border: 1px solid #eee;
                          text-align: center;
                      }
      
                      .why-us-item:hover {
                          transform: translateY(-5px);
                          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                      }
      
                      .why-us-icon img {
                          width: 80px;
                          height: auto;
                          transition: transform 0.3s ease;
                      }
      
                      .why-us-item:hover .why-us-icon img {
                          transform: scale(1.1);
                      }
      
                      .why-us-content h4 {
                          font-size: 18px;
                          margin: 15px 0 8px;
                          font-weight: 600;
                          color: #4a154b;
                      }
      
                      .why-us-content p {
                          color: #666;
                          font-size: 14px;
                          margin: 0;
                      }
                  `}</style>
      
                  <div className="why-us pt-4 border-t">
                      <div className="container">
                          <div className="row">
                              
                              <div className="col-lg-3 col-md-6 mb-4">
                                  <div className="why-us-item">
                                      <div className="why-us-icon mb-3">
                                          <img src="/images/icons/Groups.svg" alt="Groups" />
                                      </div>
                                      <div className="why-us-content">
                                          <h4><a href="/travel-styles/groups/">Groups</a></h4>
                                          <p>For over 15 pax</p>
                                      </div>
                                  </div>
                              </div>
      
                              
                              <div className="col-lg-3 col-md-6 mb-4">
                                  <div className="why-us-item">
                                      <div className="why-us-icon mb-3">
                                          <img src="/images/icons/Small-Groups.svg" alt="Small Groups" />
                                      </div>
                                      <div className="why-us-content">
                                          <h4><a href="/travel-styles/small-group-touring/">Small Groups</a></h4>
                                          <p>Small-sized groups</p>
                                      </div>
                                  </div>
                              </div>
      
                              
                              <div className="col-lg-3 col-md-6 mb-4">
                                  <div className="why-us-item">
                                      <div className="why-us-icon mb-3">
                                          <img src="/images/icons/FIT.svg" alt="FIT" />
                                      </div>
                                      <div className="why-us-content">
                                          <h4><a href="/travel-styles/fit/">FIT</a></h4>
                                          <p>Fully independent travellers</p>
                                      </div>
                                  </div>
                              </div>
      
                              
                              <div className="col-lg-3 col-md-6 mb-4">
                                  <div className="why-us-item">
                                      <div className="why-us-icon mb-3">
                                          <img src="/images/icons/MICE.svg" alt="MICE" />
                                      </div>
                                      <div className="why-us-content">
                                          <h4><a href="/travel-styles/mice/">MICE</a></h4>
                                          <p>Meetings, Incentives, Conferences, Events</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
      
              </div>
          </section>
  );
}   