import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { forgotPassword } from "../../actions/authActions";
import MetaData from "../layouts/MetaData";
import { clearAuthError } from "../../slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function ForgotPassword() {
    const [inputs, setInputs] = useState({
        email: ""
    })
    const dispatch = useAppDispatch();
    const { error, message, loading } = useAppSelector(state => state.authState);

    const handleChange = (event: any) => {
        setInputs(values => ({ ...values, [event.target.name]: event.target.value }))
    }

    function handleReset() {
        setInputs({
            email: ""
        })
        toast.info("Reset Successfully", { position: 'top-center' });

    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', inputs.email);
        dispatch(forgotPassword(formData))

    }


    useEffect(() => {
        if (message) {
            toast.success(message, { position: 'top-center' })
            setInputs({
                email: ""
            })
            return;
        }

        if (error) {
            toast.error(error, {
                position: 'top-center',
                onOpen: () => dispatch(clearAuthError())
            })
            return
        }
    }, [message, error, dispatch])


    return (
        <>
            <MetaData title={'Forgot Password'} />
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Reset Password</div>
                        <form className="w-100" onSubmit={handleSubmit}>

                            <div className="w-100 mt-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Enter email" required />
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}