"use client";

export default function PackageEnquiryModal({ packageItem }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      package_id: packageItem.id,
      package_title: packageItem.title,
      package_slug: packageItem.slug,
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      travel_date: String(formData.get("travel_date") || ""),
      no_of_people: String(formData.get("no_of_people") || ""),
      message: String(formData.get("message") || ""),
    };

    console.log("Package enquiry payload:", payload);
  }

  return (
    <div
      className="modal fade"
      id="packageEnquiryModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="packageEnquiryModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title" id="packageEnquiryModalTitle">
                Interested in this Package?
              </h5>
              <p className="mb-0">
                Fill out the form below and our travel expert will contact you shortly.
              </p>
            </div>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input type="hidden" name="package_id" value={packageItem.id || ""} readOnly />
              <input type="hidden" name="package_title" value={packageItem.title || ""} readOnly />
              <input type="hidden" name="package_slug" value={packageItem.slug || ""} readOnly />

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="text" name="name" className="form-control" placeholder="Name *" required />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email *"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <input type="tel" name="phone" className="form-control" placeholder="Phone *" required />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <input type="date" name="travel_date" className="form-control" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="number"
                      name="no_of_people"
                      className="form-control"
                      placeholder="No. of People"
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <textarea name="message" className="form-control" placeholder="Message"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="nir-btn-black" data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="nir-btn">
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
