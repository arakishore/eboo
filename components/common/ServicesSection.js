import Link from "next/link";
export default function ServicesSection() {
    return (
        <section className=" pb-6">
            <div className="container">

                <div className="why-us pt-4 border-t">
                    <div className="why-us-box">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-us-item text-center bg-lgrey h-100 d-flex flex-column">
                                    <Link href="/destinations">
                                        <div className="why-us-icon mb-2">
                                            <img src="/images/icons/world-tour.png" alt="" style={{ width: "86px", height: "auto" }} />
                                        </div>
                                        <div className="why-us-content">
                                            <h4>Tour Packages</h4>
                                            <p className="mb-0">Meticulously Crafted tours, Exclusively curated for Perfection, giving you Unforgettable Memories.</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-us-item text-center bg-lgrey h-100 d-flex flex-column">
                                    <Link href="/hotels"><div className="why-us-icon mb-2">
                                        <img src="/images/icons/desert.png" alt="" style={{ width: "86px", height: "auto" }} />
                                    </div>
                                    <div className="why-us-content">
                                        <h4>Hotel</h4>
                                        <p className="mb-0">Great offers for Luxury stays in tranquil natural retreats, providing the comfort and warmth of home.</p>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-us-item text-center bg-lgrey h-100 d-flex flex-column">
                                    <Link href="/flights">
                                        <div className="why-us-icon mb-2">
                                            <img src="/images/icons/airplane-ticket.png" alt="" style={{ width: "86px", height: "auto" }} />
                                        </div>
                                        <div className="why-us-content">
                                            <h4>Flight</h4>
                                            <p className="mb-0">Your Best Flight Deals is just One Click Away.</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-us-item text-center bg-lgrey h-100 d-flex flex-column">
                                    <Link href="/cruises">
                                        <div className="why-us-icon mb-2">
                                            <img src="/images/icons/cruise.png" alt="" style={{ width: "86px", height: "auto" }} />
                                        </div>
                                        <div className="why-us-content">
                                            <h4>Cruise</h4>
                                            <p className="mb-0">Enjoy the Ultimate Voyage on Elite Cruises across globe curated for the Discerning</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-us-item text-center bg-lgrey h-100 d-flex flex-column">
                                    <Link href="/cars">
                                        <div className="why-us-icon mb-2">
                                            <img src="/images/icons/bus-color.png" alt="" style={{ width: "86px", height: "auto" }} />
                                        </div>
                                        <div className="why-us-content">
                                            <h4>Cars</h4>
                                            <p className="mb-0">Experience seamless travel in comfortable car and bus rentals, featuring genuine local drivers and 24/7 round-the-clock support</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-us-item text-center bg-lgrey h-100 d-flex flex-column">
                                    <Link href="/forex">
                                        <div className="why-us-icon mb-2">
                                            <img src="/images/icons/currency-card-color.png" alt="" style={{ width: "86px", height: "auto" }} />
                                        </div>
                                        <div className="why-us-content">
                                            <h4>Forex</h4>
                                            <p className="mb-0">Get the ultimate convenience of Forex cards and currency exchange delivered to your doorstep, all at competitive rates.</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-us-item text-center bg-lgrey h-100 d-flex flex-column">
                                    <Link href="/visa">
                                        <div className="why-us-icon mb-2">
                                            <img src="/images/icons/visa-trave.png" alt="" style={{ width: "86px", height: "auto" }} />
                                        </div>
                                        <div className="why-us-content">
                                            <h4>Visa</h4>
                                            <p className="mb-0">Entrust your visa needs to our qualified team, who provide hassle-free services with on-time delivery for all major destinations worldwide.</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-us-item text-center bg-lgrey h-100 d-flex flex-column">
                                    <Link href="/mice">
                                        <div className="why-us-icon mb-2">
                                            <img src="/images/icons/Mice.png" alt="" style={{ width: "86px", height: "auto" }} />
                                        </div>
                                        <div className="why-us-content">
                                            <h4>MICE</h4>
                                            <p className="mb-0">Trust us to manage all aspects of your next corporate event, so you can focus on your business goals</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>

    );
}   
