import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <>
            <div className="main-body container-fluid p-0">
                <div className="row m-0">
                    {/* <!-- Body left side start --> */}
                    <div className="welcome-message col-md-4 position-relative">
                        <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
                            <h2 className=" fst-italic fw-bold">THE BEST EXPERIENCE</h2>
                            <Link to={"/home"} className="btn btn-danger green p-3 rounded-5">ORDER NOW</Link>
                        </div>

                    </div>
                    {/* <!-- Body left side end --> */}
                    <div className="food-pictures col-md-8 p-0">
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                    className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="2000">
                                    <img src="./images/slide-01.jpg" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src="./images/slide-02.jpg" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src="./images/slide-03.jpg" className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
