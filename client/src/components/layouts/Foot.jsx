import { Link } from 'react-router-dom';
export default function Foot() {
    return (
        <>
            <footer className="container-fluid bg-body-tertiary p-2 p-sm-5 pb-1 mm-navbg">
                <div className="row">

                    <div className="col-6 col-md d-flex flex-column mb-2 justify-content-around">
                        <h5>Social Networks</h5>
                        <div>
                            <Link to={"https://www.facebook.com/Muthu.AMMEW"}><i className="fa-brands fa-facebook fa-beat fa-2xl py-3 me-2 bg-white rounded-5" style={{color: "#2568ef"}}></i></Link>
                            <Link to={"https://x.com/Muthu_AMMEW"}><i className="fa-brands fa-square-x-twitter fa-shake fa-2xl py-3 me-2 bg-white rounded-5"></i></Link>
                            <Link to={"https://www.instagram.com/muthu.ammew"}><i className="fa-brands fa-square-instagram fa-beat-fade fa-2xl py-3 me-2 bg-white rounded-5" style={{color: "#ff7b00"}}></i></Link>
                            <Link to={"https://www.linkedin.com/in/muthu-ammew"}><i className="fa-brands fa-linkedin fa-bounce fa-2xl py-3 me-2 bg-white rounded-5" style={{color: "#0075d5"}}></i></Link>
                        </div>
                        <img src="/images/play-store.webp" alt="" width="160" height="50" />
                        <img src="/images/app-store.webp" alt="" width="160" height="50" />
                    </div>
                    <div className="col-6 col-md d-flex flex-column mb-2">
                        <h5>About Ecommerce</h5>
                        <div>
                            <a href="javascript;">Who We Are</a><br />
                            <a href="javascript;">Blog</a><br />
                            <a href="javascript;">Work With Us</a><br />
                            <a href="javascript;">Investor Relations</a><br />
                            <a href="javascript;">Report Fraud</a><br />
                            <a href="javascript;">Press Kit</a><br />
                            <a href="https://wa.me/919022690226?text=Hi" target="_blank" rel="noreferrer">Contact Us</a><br />
                        </div>
                    </div>
                    <div className="col-6 col-md d-flex flex-column mb-2">
                        <h5>For Ecommerce</h5>
                        <div>
                            <a href="javascript;">Partner With Us</a><br />
                            <a href="javascript;">Apps For You</a><br />
                        </div>
                    </div>
                    <div className="col-6 col-md d-flex flex-column mb-2">
                        <h5>Learn More</h5>
                        <div>
                            <a href="javascript;">Privacy</a><br />
                            <a href="javascript;">Security</a><br />
                            <a href="javascript;">Terms</a><br />
                        </div>
                    </div>


                </div>
                <hr />
                <div>
                    <p className="mb-0">By continuing past this page, you agree to our Terms of Service, Cookie Policy,
                        Privacy Policy and Content Policies. All trademarks are properties of their respective owners.
                        2008-2025 © Ecommerce™ Ltd. All rights reserved.<a href="https://www.linkedin.com/in/muthu-ammew" className="text-black text-decoration-none">Designed by <span className="text-success text-decoration-underline fw-bolder">Muthu</span></a>
                    </p>
                </div>

            </footer>
        </>
    )
}
