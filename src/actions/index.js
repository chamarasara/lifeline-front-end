import api from "../apis/api";
import history from '../components/history';
import {
    CREATE_USER,
    EDIT_USER,
    FETCH_USERS,
    FETCH_USER,
    DELETE_USER,
    CREATE_USER_ROLE,
    EDIT_USER_ROLE,
    FETCH_USERS_ROLES,
    FETCH_USER_ROLE,
    DELETE_USER_ROLE,
    AUTHENTICATED,
    UNAUTHENTICATED,
    AUTHENTICATION_ERROR,
    CREATE_CUSTOMER,
    EDIT_CUSTOMER,
    FETCH_CUSTOMER,
    FETCH_CUSTOMERS,
    DELETE_CUSTOMER,
    CREATE_SUPPLIER,
    EDIT_SUPPLIER,
    FETCH_SUPPLIER,
    FETCH_SUPPLIERS,
    DELETE_SUPPLIER,
    CREATE_RAW_MATERIAL,
    EDIT_RAW_MATERIAL,
    FETCH_RAW_MATERIAL,
    FETCH_RAW_MATERIALS,
    DELETE_RAW_MATERIAL
} from './types';

//create user
export const createUser = formValues => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.post('/user/create-employee', { ...formValues }, header);
    console.log(response)
    dispatch({ type: CREATE_USER, payload: response.data });
    history.push('/employee');
    //window.location.reload();
};
//List all users
export const fetchUsers = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.get('/user/get-all-employee', header);
    console.log(response)
    dispatch({ type: FETCH_USERS, payload: response.data });
};
//View single user
export const fetchUser = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.get(`/user/get-employee/${id}`, header);
    dispatch({ type: FETCH_USER, payload: response.data });
};
//Edit user
export const editUser = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.patch(`/users/${id}`, { formValues }, header);
    console.log(formValues)
    dispatch({ type: EDIT_USER, payload: id });
    window.location.reload()
};
//Delete user
export const deleteUser = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    await api.delete(`/user/delete-employee/${id}`, header);
    dispatch({ type: DELETE_USER, payload: id });
    history.push('/users');
};

//create user role
export const createUserRole = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.post('/user/create-user-type', { ...formValues }, header);
    console.log(response)
    dispatch({ type: CREATE_USER_ROLE, payload: response.data });
    history.push('/employee');
    //window.location.reload();
};
//get all user roles
export const fetchUsersRoles = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.get('/user/get-all-user-type', header);
    console.log(response)
    console.log(response.data)
    dispatch({ type: FETCH_USERS_ROLES, payload: response.data });
};
//get single user role
export const fetchUserRole = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.get(`/user/get-user-type-by-id/${id}`, header);
    dispatch({ type: FETCH_USER_ROLE, payload: response.data });
};
//edit user role
export const editUserRole = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.patch(`/user/get-user-type-by-id/${id}`, { ...formValues }, header);
    console.log(formValues)
    dispatch({ type: EDIT_USER_ROLE, payload: id });
    window.location.reload()
};
//delete user role
export const deleteUserRole = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    await api.delete(`/user/delete-user-type/${id}`, header);
    dispatch({ type: DELETE_USER_ROLE, payload: id });
    history.push('/employee');
};

//create customer
export const createCustomer = formValues => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.post('/user/create-customer', { ...formValues }, header);
    console.log(response)
    dispatch({ type: CREATE_CUSTOMER, payload: response.data });
    history.push('/customer');
};
//List all customers
export const fetchCustomers = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.get('/user/get-all-customer', header);
    console.log(response)
    dispatch({ type: FETCH_CUSTOMERS, payload: response.data });
};
//View single customer
export const fetchCustomer = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.get(`/user/get-customer/${id}`, header);
    dispatch({ type: FETCH_CUSTOMER, payload: response.data });
};
//Edit customer
export const editCustomer = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.patch(`/users/${id}`, { ...formValues }, header);
    console.log(formValues)
    dispatch({ type: EDIT_CUSTOMER, payload: id });
    window.location.reload()
};
//Delete customer
export const deleteCustomer = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    await api.delete(`/user/delete-customer/${id}`, header);
    dispatch({ type: DELETE_CUSTOMER, payload: id });
    history.push('/customer');
};
//create supplier
export const createSupplier = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.post('/user/create-supplier', { ...formValues }, header);
    console.log(response)
    dispatch({ type: CREATE_SUPPLIER, payload: response.data });
    history.push('/supplier');
};
//List all customers
export const fetchSuppliers = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.get('/user/get-all-supplier', header);

    dispatch({ type: FETCH_SUPPLIERS, payload: response.data });
};
//View single supplier
export const fetchSupplier = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.get(`/user/get-supplier/${id}`, header);
    console.log(response)
    dispatch({ type: FETCH_SUPPLIER, payload: response.data });
};
//Edit supplier
export const editSupplier = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.patch(`/users/${id}`, { ...formValues }, header);
    console.log(formValues)
    dispatch({ type: EDIT_SUPPLIER, payload: id });

    history.push(`/customer-profile/${id}`);
};
//Delete supplier
export const deleteSupplier = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    await api.delete(`/user/delete-supplier/${id}`, header);
    dispatch({ type: DELETE_SUPPLIER, payload: id });
    history.push('/supplier')
};
//create raw material
export const createRawMaterial = formValues => async dispatch => {
    console.log(formValues)
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.post('/material/create', { ...formValues }, header);
    console.log(response)
    dispatch({ type: CREATE_SUPPLIER, payload: response.data });
    //history.push('/supplier');
};
//List all raw material
export const fetchRawMaterials = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.get('/user/get-all-supplier', header);

    dispatch({ type: FETCH_SUPPLIERS, payload: response.data });
};
//View single raw material
export const fetchRawMaterial = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.get(`/user/get-supplier/${id}`, header);
    console.log(response)
    dispatch({ type: FETCH_SUPPLIER, payload: response.data });
};
//Edit raw material
export const editRawMaterial = (id, formValues) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await api.patch(`/users/${id}`, { ...formValues }, header);
    console.log(formValues)
    dispatch({ type: EDIT_SUPPLIER, payload: id });

    history.push(`/customer-profile/${id}`);
};
//Delete raw material
export const deleteRawMaterial = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    await api.delete(`/user/delete-supplier/${id}`, header);
    dispatch({ type: DELETE_SUPPLIER, payload: id });
    history.push('/supplier')
};
//Autheticate User
export function signInAction({ username, password }, history) {
    return async (dispatch) => {
        try {
            const res = await api.post('/authenticate', { username, password });
            dispatch({ type: AUTHENTICATED, payload: res.data });
            history.push('/');
            window.location.reload();
        } catch (error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: 'Invalid username or password'
            });
        }
    };
}
//logout user
export function signOutAction() {
    sessionStorage.clear();
    history.push('/login');
    window.location.reload();
    //window.location.reload();
    return {
        type: UNAUTHENTICATED
    };
}