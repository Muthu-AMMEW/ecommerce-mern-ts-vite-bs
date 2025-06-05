
export default function SocialNetworks() {
    return (
        <>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle ms-lg-2 me-4 fw-bold" href="javascript:void(0)" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false"><i
                        className="fa-brands fa-slack fa-spin fa-lg me-2"></i>
                    Social Networks
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="https://www.facebook.com/Muthu.AMMEW">
                        <i className="fa-brands fa-facebook fa-beat me-2" style={{ color: "#2568ef" }}></i>Facebook</a>
                    </li>
                    <li><a className="dropdown-item" href="https://x.com/Muthu_AMMEW">
                        <i className="fa-brands fa-square-x-twitter fa-shake me-2"></i>X-Twitter</a></li>
                    <li><a className="dropdown-item" href="https://www.youtube.com/@Muthu_AMMEW">
                        <i className="fa-brands fa-youtube fa-beat-fade me-2" style={{ color: "#ff0000" }}></i>Youtube</a></li>
                    <li><a className="dropdown-item" href="https://www.instagram.com/muthu.ammew">
                        <i className="fa-brands fa-square-instagram fa-beat-fade me-2" style={{ color: "#ff7b00" }}></i>Instagram</a></li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li><a className="dropdown-item me-2" href="https://m.me/Muthu.AMMEW"><i
                        className="fa-brands fa-facebook-messenger fa-shake fa-lg me-2" style={{ color: "#0080f7" }}></i>Chat (Messenger)</a>
                    </li>
                </ul>
            </li>
        </>
    )
}
