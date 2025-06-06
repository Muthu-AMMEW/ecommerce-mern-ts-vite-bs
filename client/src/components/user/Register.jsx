import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { register, clearAuthError } from '../../actions/userActions'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { countries } from 'countries-list';


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
	const countryList = Object.values(countries);
	const navigate = useNavigate();
	const { loading, error, isAuthenticated } = useSelector(state => state.authState);
	const [addressInputs, setAddressInputs] = useState({
		addressLine1: "",
		addressLine2: "",
		city: "",
		state: "",
		country: "India",
		postalCode: ""
	})

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/home');
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
			reader.readAsDataURL(event.target.files[0])
		} else {
			const name = event.target.name;
			const value = event.target.value;
			setInputs(values => ({ ...values, [name]: value }))
		}
	}

	const handleAddressChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setAddressInputs(values => ({ ...values, [name]: value }))
	}


	function handleReset() {
		setInputs({
			fullName: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: ""
		});
		setAddressInputs({
			addressLine1: "",
			addressLine2: "",
			city: "",
			state: "",
			country: "India",
			postalCode: ""
		});
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
		formData.append('address[addressLine1]', addressInputs.addressLine1);
		formData.append('address[addressLine2]', addressInputs.addressLine2);
		formData.append('address[city]', addressInputs.city);
		formData.append('address[state]', addressInputs.state);
		formData.append('address[country]', addressInputs.country);
		formData.append('address[postalCode]', addressInputs.postalCode);
		dispatch(register(formData))

	}

	return (
		<>
			<div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
				<div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

					<div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 my-4 rounded-5 bg-body-tertiary bg-opacity-50">
						<div className='text-center h2'>Register Now</div>
						<form className="w-100 mm-input-box-color" onSubmit={handleSubmit} encType='multipart/form-data'>
							<div className="w-100 mt-3">
								<label htmlFor="fullName" className="form-label">Full Name</label>
								<input type="text" className="form-control" id="fullName" name="fullName" value={inputs.fullName} minLength={4} onChange={handleChange} placeholder="Enter your full name" required />
							</div>
							<div className="w-100 mt-3">
								<label htmlFor="email" className="form-label">Email</label>
								<input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Enter your email address" required />
							</div>
							<div className="w-100 mt-3">
								<label htmlFor="phoneNumber" className="form-label">Phone Number</label>
								<input type="number" className="form-control" id="phoneNumber" name="phoneNumber" value={inputs.phoneNumber} minLength={10} onChange={handleChange} placeholder="Enter your phone number" required />
							</div>

							<div className="w-100 mt-3 form-group">
								<label htmlFor="addressLine1" className="form-label">Address Line 1</label>
								<input type="text" className="form-control" id="addressLine1" name="addressLine1" value={addressInputs.addressLine1} placeholder="House No, Building" onChange={handleAddressChange} required />

							</div>

							<div className="w-100 mt-3 form-group">
								<label htmlFor="addressLine2" className="form-label">Address Line 2</label>
								<input type="text" className="form-control" id="addressLine2" name="addressLine2" value={addressInputs.addressLine2} placeholder="Street, Area" onChange={handleAddressChange} required />

							</div>

							<div className="row w-100 mt-3">
								<div className="col-6">
									<div className="form-group">
										<label htmlFor="city" className="form-label">City</label>
										<input type="text" className="form-control" id="city" name="city" value={addressInputs.city} placeholder="City" onChange={handleAddressChange} required />
									</div>
								</div>
								<div className="col-6">
									<div className="form-group">
										<label htmlFor="state" className="form-label">State</label>
										<input type="text" className="form-control" id="state" name="state" value={addressInputs.state} placeholder="State" onChange={handleAddressChange} required />
									</div>
								</div>
							</div>

							<div className="row w-100 mt-3">
								<div className="col-6">
									<div className="form-group">
										<label htmlFor="country" className="form-label">Country</label>
										<select className="form-control" id="country" name="country" value={addressInputs.country} onChange={handleAddressChange} required>
											{countryList.map((country, i) => (
												<option key={i} value={country.name}>
													{country.name}
												</option>
											))
											}
										</select>
									</div>
								</div>
								<div className="col-6">
									<div className="form-group">
										<label htmlFor="postalCode" className="form-label" >Postal Code</label>
										<input type="number" id="postalCode" className="form-control" name="postalCode" placeholder="Postal Code" value={addressInputs.postalCode} onChange={handleAddressChange} required />
									</div>
								</div>
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

								<button className="btn btn-primary me-5" type="submit" disabled={loading}>Submit</button>
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