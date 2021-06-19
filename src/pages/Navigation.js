import { BrowserRouter as Router, Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Synchronous from './Synchronous';
import FormSubmit from './Form-Submit';
import FieldLevel from './Field-Level';
import Immutable from './Immutable';
import Asynchronous from './Asynchronous';

const handleSubmit = (values) => {
    console.log(JSON.stringify(values));
}

const Navigation = (props) => {
    return (
        <Router>
            <div className='navigation'>
                <ul className='nav-items'>
                    <li className='items'><Link to='/'>Field Level Validation</Link></li>
                    <li className='items'><Link to='/form-submit'>Form Submit Validation</Link></li>
                    <li className='items'><Link to='/synchronouus'>Synchronous Validation</Link></li>
                    <li className='items'><Link to='/asynchronous'>Asynchronous Validation</Link></li>
                    <li className='items'><Link to='/immutable'>Form Validation - Immutable</Link></li>
                </ul>
            </div>
            <div className='main-container'>
                <Switch>
                    <Route path="/" render={(props) => (<FieldLevel onSubmit={handleSubmit}></FieldLevel>)} exact />
                    <Route path="/form-submit" render={(props) => (<FormSubmit onSubmit={handleSubmit}></FormSubmit>)} />
                    <Route path="/synchronouus" render={(props) => (<Synchronous onSubmit={handleSubmit}></Synchronous>)} />
                    <Route path="/asynchronous" render={(props) => (<Asynchronous onSubmit={handleSubmit}></Asynchronous>)} />
                    <Route path="/immutable" render={(props) => (<Immutable onSubmit={handleSubmit}></Immutable>)} />
                </Switch>
            </div>
        </Router >
    )
}

export default Navigation;