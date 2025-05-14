import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { register, clearAuthError } from '../../actions/userActions'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
	const [inputs, setInputs] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		password: "",
		confirmPassword: "",
		terms: true
	})

	const [avatar, setAvatar] = useState("");
	const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, isAuthenticated } = useSelector(state => state.authState)

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
			return
		}
		if (error) {
			toast(error, {
				position: toast.POSITION.BOTTOM_CENTER,
				type: 'error',
				onOpen: () => { dispatch(clearAuthError) }
			})
			return
		}
	}, [error, isAuthenticated, dispatch, navigate])

	const handleChange = (event) => {
		if (event.target.name === 'avatar') {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(event.target.files[0])
				}
			}
			reader.readAsDataURL(e.target.files[0])
		} else {
			const name = event.target.name;
			const value = event.target.value;
			setInputs(values => ({ ...values, [name]: value }))
		}
	}


	function handleReset() {
		setInputs({
			fullName: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
		})
		toast.info("Reset Successfully");

	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (inputs.password !== inputs.confirmPassword) {
			toast.error("Password Mismatch", {
				position: toast.POSITION.BOTTOM_CENTER,
				type: 'error'
			})
			return
		}

		if (inputs.password.length < 6) {
			toast.error("Password must be at least 6 characters", {
				position: toast.POSITION.BOTTOM_CENTER,
				type: 'error'
			})
			return
		}

		const formData = new FormData();
		formData.append('fullName', inputs.fullName)
		formData.append('email', inputs.email)
		formData.append('password', inputs.password)
		formData.append('phoneNumber', inputs.phoneNumber)
		// formData.append('avatar', avatar);
		dispatch(register(formData))

	}

	return (
		<>
			<div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
				<div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

					<div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
						<div className='text-center h2'>Register Now</div>
						<form className="w-100" onSubmit={handleSubmit} encType='multipart/form-data'>
							<div className="w-100 mt-3">
								<label htmlFor="fullName" className="form-label">Full Name</label>
								<input type="text" className="form-control" id="fullName" name="fullName" value={inputs.fullName} onChange={handleChange} placeholder="Enter your full name" required />
							</div>
							<div className="w-100 mt-3">
								<label htmlFor="email" className="form-label">Email</label>
								<input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Enter your email address" required />
							</div>
							<div className="w-100 mt-3">
								<label htmlFor="phoneNumber" className="form-label">Phone Number</label>
								<input type="number" className="form-control" id="phoneNumber" name="phoneNumber" value={inputs.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" required />
							</div>
							<div className="w-100 mt-3">
								<label htmlFor="password" className="form-label">Create a password</label>
								<input type="password" className="form-control" id="password" name="password" value={inputs.password} onChange={handleChange} placeholder="Enter password" required />

							</div>
							<div className="w-100 mt-3">
								<label htmlFor="confirmPassword" className="form-label">Confirm your password</label>
								<input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={inputs.confirmPassword} onChange={handleChange} placeholder="Enter Confirm password" required />
							</div>

							<div className="form-check">
								<label className="form-check-label w-100 mt-3">
									<input type="checkbox" className="form-check-input" name="terms" value={inputs.terms} onChange={handleChange} checked={inputs.terms} required /> I accept the <a className="fw-bold" href="www.#.com">Terms of Use &
										Privacy Policy</a>
								</label>
							</div>


							<div className="mt-3 text-center">
								{loading ?
									(<div className="text-center">
										<div className="spinner-border text-primary " role="status">
										</div>
									</div>) : null
								}

								<button className="btn btn-primary me-5" type="submit">Submit</button>
								<button className="btn btn-danger" type="reset" onClick={handleReset}>Reset</button>
							</div>
							<div className="text-center mt-4">Already have an account? <Link className="fw-bold" to={"/login"}>Log in</Link></div>
						</form>
					</div>
				</div>
			</div>

		</>
	)
}