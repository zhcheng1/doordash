import { Router, browserHistory } from 'react-router';
import { Route, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import store from "./store/store";
import { Provider } from 'react-redux';
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";

const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
	    <Router history={browserHistory} >
		    <div>
		        <Route path="/" component={LoginPage}></Route>
		        <Route path="/room" component={Homepage}></Route>
		        <Route path="/room/:roomId" component={Homepage}></Route>
	        </div>
	    </Router>
    </Provider>,
app);


