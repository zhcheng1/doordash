import { withRouter, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../main.scss';

class LoginPage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	name: "",
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
	}

	onNameChange(e) {
		let name = e.target.value;

		this.setState({
			name,
		});
	}

	onButtonClick() {
		const name = this.state.name;
		if (!name) {
			return;
		}
		this.props.setName(name);
		browserHistory.push("/room");
	}

	render() {
		return (
			<section className={"loginPage"}>
				<div className={"loginPage_inputContainer"}>
					<input
						className={"loginPage_input"}
						placeholder={"Type your name here..."}
						value={this.state.name}
						onChange={this.onNameChange}
					/>
				</div>
				<button className={"loginPage_button"} onClick={this.onButtonClick}>Join the Doordash Chat!</button>
			</section>
		)
	}
}

function mapStateToProps(state) {
    return {
        name: state.globalReducer.name
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        setName: actions.setName
    }, dispatch);
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage));