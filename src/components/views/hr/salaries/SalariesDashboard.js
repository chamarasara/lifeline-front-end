import React from 'react'
import { Link } from 'react-router-dom';
import SalaryList from './SalaryList';
import SearchSalaryByDate from './SearchSalaryByDate';
import SearchSalary from './SearchSalary';

class SalariesDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/hr-dashboard"} className="ui button">Back</Link>
                        <Link to={"/new-salary"} className="ui blue button">New Record</Link>
                    </div>
                    <div className="ui grid" style={{ paddingTop: "30px" }}>
                        <div className="eight wide column">
                            <SearchSalary />
                        </div>
                        <div className="six wide column">
                            <SearchSalaryByDate />
                        </div>
                    </div>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <SalaryList />
                    </div>
                </div>
                
            </div>
        )
    }
}
export default SalariesDashboard;