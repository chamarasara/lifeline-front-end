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
import NewRawMaterial from './views/masterdata/rawmaterial/WizardForm';
import NewPackingMaterial from './views/masterdata/packingmaterial/WizardFormPackingMaterial';
import SinglePackingMaterial from './views/masterdata/packingmaterial/SinglePackingMaterial';
import PackingMaterialDashboard from './views/masterdata/packingmaterial/PackingMaterialDashboard';
import FinishGoodDashboard from './views/masterdata/finishgoods/FinishGoodDashboard';
import NewFinishGood from './views/masterdata/finishgoods/WizardFormFinishGood';
import NewSemiFinishGood from './views/masterdata/semifinishgoods/WizardFormSemiFinishGood';
import SalesDashboard from './views/sales/SalesDashboard';
import NewInvoice from './views/sales/NewInvoice';
import PurchaseOrderDashboardRaw from './views/sales/PurchaseOrderDashboardRaw';
import InvoiceDashboard from './views/sales/InvoiceDashboard';
import SemiFinishGoodDashboard from './views/masterdata/semifinishgoods/SemiFinishGoodDashboard';
import SingleRawMaterial from './views/masterdata/rawmaterial/SingleRawMaterial';
import EditRawMaterial from './views/masterdata/rawmaterial/EditRawMaterial';
import EditRawMaterialMrpOne from './views/masterdata/rawmaterial/EditRawMaterialMrpOne';
import EditRawMaterialMrpTwo from './views/masterdata/rawmaterial/EditRawMaterialMrpTwo';
import EditRawMaterialMrpThree from './views/masterdata/rawmaterial/EditRawMaterialMrpThree';
import EditRawMaterialMrpFour from './views/masterdata/rawmaterial/EditRawMaterialMrpFour';
import EditRawMaterialPlantOne from './views/masterdata/rawmaterial/EditRawMaterialPlantOne';
import EditRawMaterialPlantTwo from './views/masterdata/rawmaterial/EditRawMaterialPlantTwo';
import DeleteRawMaterial from './views/masterdata/rawmaterial/DeleteRawMaterial';
import EditPackingMaterial from './views/masterdata/packingmaterial/EditPackingMaterial';
import EditPackingMaterialMrpOne from './views/masterdata/packingmaterial/EditPackingMaterialMrpOne';
import EditPackingMaterialMrpTwo from './views/masterdata/packingmaterial/EditPackingMaterialMrpTwo';
import EditPackingMaterialMrpThree from './views/masterdata/packingmaterial/EditPackingMaterialMrpThree';
import EditPackingMaterialMrpFour from './views/masterdata/packingmaterial/EditPackingMaterialMrpFour';
import EditPackingMaterialPlantOne from './views/masterdata/packingmaterial/EditPackingMaterialPlantOne';
import EditPackingMaterialPlantTwo from './views/masterdata/packingmaterial/EditPackingMaterialPlantTwo';
import DeletePackingMaterial from './views/masterdata/packingmaterial/DeletePackingMaterial';
import SingleSemiFinishGoodMaterial from './views/masterdata/semifinishgoods/SingleSemiFinishGoodMaterial';
import EditSemiFinishGoodMaterial from './views/masterdata/semifinishgoods/EditSemiFinishGoodMaterial';
import EditSemiFinishGoodMaterialMrpOne from './views/masterdata/semifinishgoods/EditSemiFinishGoodMaterialMrpOne';
import EditSemiFinishGoodMaterialMrpTwo from './views/masterdata/semifinishgoods/EditSemiFinishGoodMaterialMrpTwo';
import EditSemiFinishGoodMaterialMrpThree from './views/masterdata/semifinishgoods/EditSemiFinishGoodMaterialMrpThree';
import EditSemiFinishGoodMaterialMrpFour from './views/masterdata/semifinishgoods/EditSemiFinishGoodMaterialMrpFour';
import EditSemiFinishGoodMaterialPlantTwo from './views/masterdata/semifinishgoods/EditSemiFinishGoodMaterialPlantTwo';
import EditSemiFinishGoodMaterialPlantOne from './views/masterdata/semifinishgoods/EditSemiFinishGoodMaterialPlantOne';
import DeleteSemiFinishGoodMaterial from './views/masterdata/semifinishgoods/DeleteSemiFinishGoodMaterial';
import SingleFinishGoodMaterial from './views/masterdata/finishgoods/SingleFinishGoodMaterial';
import EditFinishGoodMaterial from './views/masterdata/finishgoods/EditFinishGoodMaterial';
import DeleteFinishGoodMaterial from './views/masterdata/finishgoods/DeleteFinishGoodMaterial';
import ProductDashboard from './views/masterdata/productmaster/ProductDashboard';
import NewProductMaster from './views/masterdata/productmaster/NewProductMaster';
import SingleProductMaster from './views/masterdata/productmaster/SingleProductMaster';
import EditProductMaster from './views/masterdata/productmaster/EditProductMaster';
import DeleteProductMaster from './views/masterdata/productmaster/DeleteProductMaster';
import SinglePurchaseOrderRaw from './views/sales/SinglePurchaseOrderRaw';
import DeletePurchaseOrderRaw from './views/sales/DeletePurchaseOrderRaw';
import SinglePurchaseOrderPacking from './views/sales/SinglePurchaseOrderPacking';
import EditInvoice from './views/sales/EditInvoice ';
import DeleteInvoice from './views/sales/DeleteInvoice';
import PurchaseOrderDashboard from './views/sales/PurchaseOrderDashboard';
import PurchaseOrderDashboardPacking from './views/sales/PurchaseOrderDashboardPacking';
import NewPurchaseOrderRaw from './views/sales/NewPurchaseOrderRaw';
import NewPurchaseOrderPacking from './views/sales/NewPurchaseOrderPacking';
import DeletePurchaseOrderPacking from './views/sales/DeletePurchaseOrderPacking';
import ApprovalsDashboard from './views/approvals/ApprovalsDashboard';
import ApprovalsRaw from './views/approvals/raw/ApprovalsRaw';
import ApprovalsPacking from './views/approvals/packing/ApprovalsPacking';
import ApprovalsSingleOrderRaw from './views/approvals/raw/ApprovalsSingleOrderRaw';
import ApprovalsEdirOrderRaw from './views/approvals/raw/ApprovalsEditOrderRaw';
import DeclineOrderRaw from './views/approvals/raw/DeclineOrderRaw';
import ApprovalsSingleOrderPacking from './views/approvals/packing/ApprovalsSingleOrderPacking';
import ApprovalsEditOrderPacking from './views/approvals/packing/ApprovalsEditOrderPacking';
import DeclineOrderPacking from './views/approvals/packing/DeclineOrderPacking';
import BomDashboard from './views/masterdata/billofmaterial/BomDashboard';
import NewBom from './views/masterdata/billofmaterial/WizardFormBom';
import SingleBom from './views/masterdata/billofmaterial/SingleBom';
import EditBom from './views/masterdata/billofmaterial/EditBom';
import DeleteBom from './views/masterdata/billofmaterial/DeleteBom';
import QuotationDashboard from './views/sales/quotations/QuotationDashboard';
import NewQuotation from './views/sales/quotations/NewQuotation';
import ViewQuotation from './views/sales/quotations/ViewQuotation';
import DeleteQuotation from './views/sales/quotations/DeleteQuotation';
import ApprovalsQuotation from './views/approvals/quotation/ApprovalsQuotation';
import ApprovalsSingleQuotation from './views/approvals/quotation/ApprovalsSingleQuotation';
import ApprovalsEditQuotation from './views/approvals/quotation/ApprovalsEditQuotation';
import DeclineQuotation from './views/approvals/quotation/DeclineQuotation';
import InventoryDashboard from './views/inventory/InventoryDashboard';
import NewFinishGoodInventory from './views/inventory/finishgoodinventory/NewFinishGood';
import FinishGoodInventoyDashboard from './views/inventory/finishgoodinventory/FinishGoodDashboard';
import ReviseFinishGood from './views/inventory/finishgoodinventory/ReviseFinishGood';
import SingleFinishGood from './views/inventory/finishgoodinventory/SingleFinishGood';
import DistributorDashboard from './views/masterdata/distributormaster/DistributorDashboard';
import NewDistributor from './views/masterdata/distributormaster/NewDistributor';
import DistributorProfile from './views/masterdata/distributormaster/DistributorProfile';
import EditDistributor from './views/masterdata/distributormaster/EditDistributor';
import DeleteDistributor from './views/masterdata/distributormaster/DeleteDistributor';
import EditManagementData from './views/masterdata/finishgoods/EditManagementData';
import EditFinancialData from './views/masterdata/finishgoods/EditFinancialData';
import EditDistributorData from './views/masterdata/finishgoods/EditDistributorData';
import EditQualityData from './views/masterdata/finishgoods/EditQualityData';




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
                    <PrivateRoute path="/userprofile/:_id/:id" component={UserProfile} />
                    <PrivateRoute path="/edituser/:_id/:id" component={EditUser} />
                    <PrivateRoute path="/delete-user/:_id/:id" component={DeleteUser} />
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

                    <PrivateRoute path="/distributor-dashboard" component={DistributorDashboard} />
                    <PrivateRoute path="/new-distributor" component={NewDistributor} />
                    <PrivateRoute path="/distributor-profile/:id" component={DistributorProfile} />
                    <PrivateRoute path="/edit-distributor/:id" component={EditDistributor} />
                    <PrivateRoute path="/delete-distributor/:id" component={DeleteDistributor} />

                    <PrivateRoute path="/supplier" component={Supplier} />
                    <PrivateRoute path="/new-supplier" component={NewSupplier} />
                    <PrivateRoute path="/supplier-profile/:id" component={SupplierProfile} />
                    <PrivateRoute path="/edit-supplier/:id" component={EditSupplier} />
                    <PrivateRoute path="/delete-supplier/:id" component={DeleteSupplier} />                    
                    <PrivateRoute path="/settings" component={Settings} />    
                    <PrivateRoute path="/raw-material" component={RawMaterialDashboard} />        
                    <PrivateRoute path="/new-raw-material" component={NewRawMaterial} />  
                    <PrivateRoute path="/single-raw-material/:id" component={SingleRawMaterial} /> 
                    <PrivateRoute path="/raw-material-edit-details/:id" component={EditRawMaterial} />   
                    <PrivateRoute path="/edit-raw-material-mrp-one/:id" component={EditRawMaterialMrpOne} />      
                    <PrivateRoute path="/edit-raw-material-mrp-two/:id" component={EditRawMaterialMrpTwo} />    
                    <PrivateRoute path="/edit-raw-material-mrp-three/:id" component={EditRawMaterialMrpThree} />  
                    <PrivateRoute path="/edit-raw-material-mrp-four/:id" component={EditRawMaterialMrpFour} />  
                    <PrivateRoute path="/edit-raw-material-plant-one/:id" component={EditRawMaterialPlantOne} /> 
                    <PrivateRoute path="/edit-raw-material-plant-two/:id" component={EditRawMaterialPlantTwo} />  
                    <PrivateRoute path="/delete-raw-material/:id" component={DeleteRawMaterial} />                   
                    <PrivateRoute path="/packing-material" component={PackingMaterialDashboard} /> 
                    <PrivateRoute path="/single-packing-material/:id" component={SinglePackingMaterial} />
                    <PrivateRoute path="/new-packing-material" component={NewPackingMaterial} />
                    <PrivateRoute path="/packing-material-edit-details/:id" component={EditPackingMaterial} /> 
                    <PrivateRoute path="/edit-packing-material-mrp-one/:id" component={EditPackingMaterialMrpOne} />
                    <PrivateRoute path="/edit-packing-material-mrp-two/:id" component={EditPackingMaterialMrpTwo} />                  
                    <PrivateRoute path="/edit-packing-material-mrp-three/:id" component={EditPackingMaterialMrpThree} /> 
                    <PrivateRoute path="/edit-packing-material-mrp-four/:id" component={EditPackingMaterialMrpFour} /> 
                    <PrivateRoute path="/edit-packing-material-plant-one/:id" component={EditPackingMaterialPlantOne} />                    
                    <PrivateRoute path="/edit-packing-material-plant-two/:id" component={EditPackingMaterialPlantTwo} />  
                    <PrivateRoute path="/delete-packing-material/:id" component={DeletePackingMaterial} />  

                    <PrivateRoute path="/finish-goods" component={FinishGoodDashboard} /> 
                    <PrivateRoute path="/new-finish-good" component={NewFinishGood} />  
                    <PrivateRoute path="/single-finish-good-material/:id" component={SingleFinishGoodMaterial} />
                    <PrivateRoute path="/finish-good-edit-details/:id" component={EditFinishGoodMaterial} />
                    <PrivateRoute path="/finish-good-edit-management-details/:id" component={EditManagementData} />
                    <PrivateRoute path="/finish-good-edit-financial-details/:id" component={EditFinancialData} />
                    <PrivateRoute path="/finish-good-edit-distributor-details/:id" component={EditDistributorData} />
                    <PrivateRoute path="/finish-good-edit-quality-details/:id" component={EditQualityData} />
                    <PrivateRoute path="/delete-finish-good-material/:id" component={DeleteFinishGoodMaterial} />  

                    <PrivateRoute path="/semi-finish-goods" component={SemiFinishGoodDashboard} />
                    <PrivateRoute path="/new-semi-finish-good" component={NewSemiFinishGood} />
                    <PrivateRoute path="/single-semi-finish-good-material/:id" component={SingleSemiFinishGoodMaterial} />
                    <PrivateRoute path="/semi-finish-good-edit-details/:id" component={EditSemiFinishGoodMaterial} />
                    <PrivateRoute path="/edit-semi-finish-good-mrp-one/:id" component={EditSemiFinishGoodMaterialMrpOne} />
                    <PrivateRoute path="/edit-semi-finish-good-mrp-two/:id" component={EditSemiFinishGoodMaterialMrpTwo} />
                    <PrivateRoute path="/edit-semi-finish-good-mrp-three/:id" component={EditSemiFinishGoodMaterialMrpThree} />
                    <PrivateRoute path="/edit-semi-finish-good-mrp-four/:id" component={EditSemiFinishGoodMaterialMrpFour} />
                    <PrivateRoute path="/edit-semi-finish-good-plant-one/:id" component={EditSemiFinishGoodMaterialPlantOne} />
                    <PrivateRoute path="/edit-semi-finish-good-plant-two/:id" component={EditSemiFinishGoodMaterialPlantTwo} />
                    <PrivateRoute path="/delete-semi-finish-good-material/:id" component={DeleteSemiFinishGoodMaterial} />  
                    <PrivateRoute path="/sales-dashboard" component={SalesDashboard} />
                    <PrivateRoute path="/purchase-order-dashboard" component={PurchaseOrderDashboard} />
                    <PrivateRoute path="/purchase-order-dashboard-raw" component={PurchaseOrderDashboardRaw} />
                    <PrivateRoute path="/purchase-order-dashboard-packing" component={PurchaseOrderDashboardPacking} />
                    <PrivateRoute path="/new-purchase-order-raw" component={NewPurchaseOrderRaw} />
                    <PrivateRoute path="/new-purchase-order-packing" component={NewPurchaseOrderPacking} />
                    <PrivateRoute path="/invoice-dashboard" component={InvoiceDashboard} />                    
                    <PrivateRoute path="/single-purchase-order-raw/:id" component={SinglePurchaseOrderRaw} />
                    <PrivateRoute path="/delete-purchase-order-raw/:id" component={DeletePurchaseOrderRaw} />
                    <PrivateRoute path="/single-purchase-order-packing/:id" component={SinglePurchaseOrderPacking} />
                    <PrivateRoute path="/delete-purchase-order-packing/:id" component={DeletePurchaseOrderPacking} />
                    <PrivateRoute path="/new-invoice" component={NewInvoice} />
                    <PrivateRoute path="/edit-invoice/:id" component={EditInvoice} />
                    <PrivateRoute path="/delete-invoice/:id" component={DeleteInvoice} />

                    <PrivateRoute path="/quotation-dashboard" component={QuotationDashboard} />
                    <PrivateRoute path="/new-quotation" component={NewQuotation} />
                    <PrivateRoute path="/view-quotation/:id" component={ViewQuotation} />
                    <PrivateRoute path="/delete-quotation/:id" component={DeleteQuotation} />
                    
                    <PrivateRoute path="/products-dashboard" component={ProductDashboard} />
                    <PrivateRoute path="/new-product" component={NewProductMaster} />
                    <PrivateRoute path="/single-product-master/:id" component={SingleProductMaster} />
                    <PrivateRoute path="/product-master-edit-details/:id" component={EditProductMaster} />
                    <PrivateRoute path="/delete-product-master/:id" component={DeleteProductMaster} />

                    <PrivateRoute path="/approvals-dashboard" component={ApprovalsDashboard} />
                    <PrivateRoute path="/approvals-raw" component={ApprovalsRaw} />
                    <PrivateRoute path="/approvals-single-raw/:id" component={ApprovalsSingleOrderRaw} />
                    <PrivateRoute path="/approvals-edit-raw/:id" component={ApprovalsEdirOrderRaw} />
                    <PrivateRoute path="/approvals-delete-raw/:id" component={DeclineOrderRaw} />

                    <PrivateRoute path="/approvals-packing" component={ApprovalsPacking} />
                    <PrivateRoute path="/approvals-single-packing/:id" component={ApprovalsSingleOrderPacking} />
                    <PrivateRoute path="/approvals-edit-packing/:id" component={ApprovalsEditOrderPacking} />
                    <PrivateRoute path="/approvals-delete-packing/:id" component={DeclineOrderPacking} />

                    <PrivateRoute path="/approvals-quotations" component={ApprovalsQuotation} />
                    <PrivateRoute path="/approvals-single-quotation/:id" component={ApprovalsSingleQuotation} />
                    <PrivateRoute path="/approvals-edit-quotation/:id" component={ApprovalsEditQuotation} />
                    <PrivateRoute path="/approvals-delete-quotation/:id" component={DeclineQuotation} />

                    <PrivateRoute path="/bom" component={BomDashboard} />
                    <PrivateRoute path="/new-bom" component={NewBom} />
                    <PrivateRoute path="/single-bom/:id" component={SingleBom} />
                    <PrivateRoute path="/edit-bom/:id" component={EditBom} />
                    <PrivateRoute path="/delete-bom/:id" component={DeleteBom} />   
                    
                    <PrivateRoute path="/inventory-dashboard" component={InventoryDashboard} /> 
                    <PrivateRoute path="/finish-good-inventory-dashboard" component={FinishGoodInventoyDashboard} /> 
                    <PrivateRoute path="/new-finish-good-inventory" component={NewFinishGoodInventory} /> 
                    <PrivateRoute path="/single-finish-good-inventory/:id" component={SingleFinishGood} /> 
                    <PrivateRoute path="/revise-finish-good-inventory/:id" component={ReviseFinishGood} />
                    
                    
                </Router>
            </div>
        ) 
    }
}
export default App;