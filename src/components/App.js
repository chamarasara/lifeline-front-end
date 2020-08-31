import React from 'react';
import { Route, Router } from 'react-router-dom';
import history from "./history";
import SideBar from './navigation/SideBar';
import Dashboard from './views/Dashboard';
import NewUser from './views/users/NewUser';
import NewUserRole from './views/users/NewUserRole';
import Settings from './views/masterdata/Settings';
import Login from './views/users/Login';
import UserDashboard from './views/users/UserDashboard';
import UserProfile from './views/users/UserProfile';
import EditUser from './views/users/EditUser';
import Employee from './views/users/Employee';
import Customer from './views/users/Customer';
import Supplier from './views/users/Supplier';
import UserRole from './views/users/UserRole';
import EditUserRole from './views/users/EditUserRole';
import DeleteUserRole from './views/users/DeleteUserRole';
import NewCustomer from './views/users/NewCustomer';
import CustomerProfile from './views/users/CustomerProfile';
import EditCustomer from './views/users/EditCustomer';
import DeleteCustomer from './views/users/DeleteCustomer';
import NewSupplier from './views/users/NewSupplier';
import EditSupplier from './views/users/EditSupplier';
import SupplierProfile from './views/users/SupplierProfile';
import DeleteSupplier from './views/users/DeleteSupplier';
import DeleteUser from './views/users/DeleteUser';

import { PrivateRoute } from './PrivateRoute';
import RawMaterialDashboard from './views/masterdata/rawmaterial/RawMaterialDashboard';
import NewRawMaterial from './views/masterdata/rawmaterial/NewRawMaterial';

class App extends React.Component {

    renderNavBar(){
        const user = sessionStorage.getItem('user')
        console.log(user)
        if (user === null) {
            return null
        }else if(user){
            return <SideBar/>
        }
    }
    render() {
        return(
            <div className="ui container">
                <Router history={history}>
                {this.renderNavBar()}                   
                    <Route path="/login" component={Login} />                    
                    <PrivateRoute path="/" exact component={Dashboard}/>
                    <PrivateRoute path="/users"  component={UserDashboard} />
                    <PrivateRoute path="/createuser" component={NewUser} />
                    <PrivateRoute path="/userprofile/:id" component={UserProfile} />
                    <PrivateRoute path="/edituser/:id" component={EditUser} />
                    <PrivateRoute path="/delete-user/:id" component={DeleteUser} />
                    <PrivateRoute path="/createuserrole" component={NewUserRole} />
                    <PrivateRoute path="/edit-user-role/:id" component={EditUserRole} />
                    <PrivateRoute path="/delete-user-role/:id" component={DeleteUserRole} />
                    <PrivateRoute path="/user-role/:id" component={UserRole} />
                    <PrivateRoute path="/employee" component={Employee} />
                    <PrivateRoute path="/customer" component={Customer} />
                    <PrivateRoute path="/new-customer" component={NewCustomer} />
                    <PrivateRoute path="/customer-profile/:id" component={CustomerProfile} />
                    <PrivateRoute path="/edit-customer/:id" component={EditCustomer} />
                    <PrivateRoute path="/delete-customer/:id" component={DeleteCustomer} />
                    <PrivateRoute path="/supplier" component={Supplier} />
                    <PrivateRoute path="/new-supplier" component={NewSupplier} />
                    <PrivateRoute path="/supplier-profile/:id" component={SupplierProfile} />
                    <PrivateRoute path="/edit-supplier/:id" component={EditSupplier} />
                    <PrivateRoute path="/delete-supplier/:id" component={DeleteSupplier} />                    
                    <PrivateRoute path="/settings" component={Settings} />    
                    <PrivateRoute path="/raw-material" component={RawMaterialDashboard} />        
                    <PrivateRoute path="/new-raw-material" component={NewRawMaterial} />              
                </Router>
            </div>
        ) 
    }
}
export default App;