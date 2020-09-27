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
import RawMaterialDashboard from './views/masterdata/rawmaterial/PackingMaterialDashboard';
import NewRawMaterial from './views/masterdata/rawmaterial/NewRawMaterial';
import RawMaterialMrpOne from './views/masterdata/rawmaterial/RawMaterialMrpOne';
import RawMaterialMrpTwo from './views/masterdata/rawmaterial/RawMaterialMrpTwo';
import RawMaterialMrpThree from './views/masterdata/rawmaterial/RawMaterialMrpThree';
import RawMaterialMrpFour from './views/masterdata/rawmaterial/RawMaterialMrpFour';
import RawMaterialPlantDataOne from './views/masterdata/rawmaterial/RawMaterialPlantDataOne';
import RawMaterialPlantDataTwo from './views/masterdata/rawmaterial/RawMaterialPlantDataTwo';
import NewPackingMaterial from './views/masterdata/packingmaterial/NewPackingMaterial';
import PackingMaterialDashboard from './views/masterdata/rawmaterial/PackingMaterialDashboard';
import PackingMaterialMrpOne from './views/masterdata/packingmaterial/PackingMaterialMrpOne';
import PackingMaterialMrpTwo from './views/masterdata/packingmaterial/PackingMaterialMrpTwo';
import PackingMaterialMrpThree from './views/masterdata/packingmaterial/PackingMaterialMrpThree';
import PackingMaterialMrpFour from './views/masterdata/packingmaterial/PackingMaterialMrpFour';
import PackingMaterialPlantDataOne from './views/masterdata/packingmaterial/PackingMaterialPlantDataOne';
import PackingMaterialPlantDataTwo from './views/masterdata/packingmaterial/PackingMaterialPlantDataTwo';
import FinishGoodsDashboard from './views/masterdata/finishgoods/FinishGoodsDashboard';
import NewFinishGood from './views/masterdata/finishgoods/NewFinishGood';
import FinishGoodMrpOne from './views/masterdata/finishgoods/FinishGoodMrpOne';
import FinishGoodMrpTwo from './views/masterdata/finishgoods/FinishGoodMrpTwo';
import FinishGoodMrpThree from './views/masterdata/finishgoods/FinishGoodMrpThree';
import FinishGoodlMrpFour from './views/masterdata/finishgoods/FinishGoodlMrpFour';
import FinishGoodPlantDataOne from './views/masterdata/finishgoods/FinishGoodPlantDataOne';
import FinishGoodPlantDataTwo from './views/masterdata/finishgoods/FinishGoodPlantDataTwo';
import SalesDashboard from './views/sales/SalesDashboard';
import NewPurchaseOrder from './views/sales/NewPurchaseOrder';
import NewInvoice from './views/sales/NewInvoice';
import PurchaseOrderDashboard from './views/sales/PurchaseOrderDashboard';
import InvoiceDashboard from './views/sales/InvoiceDashboard';

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
                    <PrivateRoute path="/material-mrp-one" component={RawMaterialMrpOne} /> 
                    <PrivateRoute path="/material-mrp-two" component={RawMaterialMrpTwo} />   
                    <PrivateRoute path="/material-mrp-three" component={RawMaterialMrpThree} />      
                    <PrivateRoute path="/material-mrp-four" component={RawMaterialMrpFour} />      
                    <PrivateRoute path="/material-plant-data-one" component={RawMaterialPlantDataOne} />      
                    <PrivateRoute path="/material-plant-data-two" component={RawMaterialPlantDataTwo} /> 
                    <PrivateRoute path="/packing-material" component={PackingMaterialDashboard} /> 
                    <PrivateRoute path="/new-packing-material" component={NewPackingMaterial} />
                    <PrivateRoute path="/packing-material-mrp-one" component={PackingMaterialMrpOne} /> 
                    <PrivateRoute path="/packing-material-mrp-two" component={PackingMaterialMrpTwo} /> 
                    <PrivateRoute path="/packing-material-mrp-three" component={PackingMaterialMrpThree} /> 
                    <PrivateRoute path="/packing-material-mrp-four" component={PackingMaterialMrpFour} /> 
                    <PrivateRoute path="/packing-material-plant-data-one" component={PackingMaterialPlantDataOne} /> 
                    <PrivateRoute path="/packing-material-plant-data-two" component={PackingMaterialPlantDataTwo} /> 
                    <PrivateRoute path="/finish-goods" component={FinishGoodsDashboard} /> 
                    <PrivateRoute path="/new-finish-good" component={NewFinishGood} />  
                    <PrivateRoute path="/finish-good-mrp-one" component={FinishGoodMrpOne} />  
                    <PrivateRoute path="/finish-good-mrp-two" component={FinishGoodMrpTwo} />  
                    <PrivateRoute path="/finish-good-mrp-three" component={FinishGoodMrpThree} />
                    <PrivateRoute path="/finish-good-mrp-four" component={FinishGoodlMrpFour} />
                    <PrivateRoute path="/finish-good-plant-data-one" component={FinishGoodPlantDataOne} />
                    <PrivateRoute path="/finish-good-plant-data-two" component={FinishGoodPlantDataTwo} />
                    <PrivateRoute path="/sales-dashboard" component={SalesDashboard} />
                    <PrivateRoute path="/purchase-order-dashboard" component={PurchaseOrderDashboard} />
                    <PrivateRoute path="/invoice-dashboard" component={InvoiceDashboard} />
                    <PrivateRoute path="/new-purchase-order" component={NewPurchaseOrder} />
                    <PrivateRoute path="/new-invoice" component={NewInvoice} />
                </Router>
            </div>
        ) 
    }
}
export default App;