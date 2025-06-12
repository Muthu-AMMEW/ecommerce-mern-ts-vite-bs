import { useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteUser, getUsers } from "../../actions/userActions"
import { clearUserError, clearIsUserDeleted } from "../../slices/userSlice"
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify'
import AdminBar from "./AdminBar"
import MetaData from "../layouts/MetaData"

export default function UserList() {
    const { users = [], loading = true, error, isUserDeleted } = useSelector(state => state.userState);
    const { user: authUser } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    let sno = 0;

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'S.No ↕',
                    field: 'sno',
                    sort: 'asc'
                },
                {
                    label: 'ID ↕',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name ↕',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email ↕',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Phone Number ↕',
                    field: 'phoneNumber',
                    sort: 'asc'
                },
                // {
                //     label: 'Address ↕',
                //     field: 'address',
                //     sort: 'asc'
                // },
                {
                    label: 'Role ↕',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions ↕',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                sno: ++sno,
                id: <Link to={`/admin/user/${user._id}`} className="text-primary">{user._id}</Link>,
                name: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                actions: (
                    <div className="text-nowrap">
                        <Link to={`/admin/user/update/${user._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, user._id)} className="btn btn-danger ms-1" disabled={user._id === authUser._id}>
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: 'top-center',
                onOpen: () => dispatch(clearUserError())
            })
            return
        }
        if (isUserDeleted) {
            toast.success('User Deleted Succesfully!', {
                position: 'top-center',
                onOpen: () => dispatch(clearIsUserDeleted())
            })
            return;
        }

        dispatch(getUsers)
    }, [dispatch, error, isUserDeleted])


    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={'User List'} />
                    <AdminBar />
                    <div className="p-4">
                        <h1 className="my-1 ps-2">User List</h1>
                        {loading ? <Loader /> :
                            <div className="table-responsive">
                                <MDBDataTable
                                    data={setUsers()}
                                    bordered
                                    striped
                                    hover
                                    className="px-3"
                                />
                            </div>
                        }
                    </div>
                </>}
        </>
    )
}