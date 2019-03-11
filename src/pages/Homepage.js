import SideMenu from "../components/SideMenu";
import ChatWindow from "./ChatWindow";

import { withRouter, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { api } from "../common/api";
import '../main.scss';

class Homepage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	loading: true,
        	rooms: [],
            onlineTimeSince: new Date(),
        }
	}

	componentDidMount() {
		api.getRooms().then((resp) => {
			this.setState({
				loading: false,
				rooms: resp.data,
			});
		}).catch((error) => {
			console.log(error);
		});

        // set the online time every min
        this.props.setOnlineTime(new Date());

        setInterval(() => {
            this.props.setOnlineTime(new Date());
            // console.log("tick");
        }, 60000);
	}

    render() {
    	if (this.state.loading) {
    		return (
    			<div>
    				<h1>Loading</h1>
    			</div>
    		)
    	}

    	let roomId = this.props.router.params.roomId || 0;
        let { onlineTimeSince, rooms } = this.state;
        let { name, onlineTime } = this.props;

        return (
            <div className={"homePage"}>
            	<SideMenu rooms={rooms} activeId={roomId} onlineTime={onlineTime - onlineTimeSince} name={name || "user"} />

                { roomId ?
                	<ChatWindow roomId={roomId} key={"chatroom" + roomId} name={name || "user"} />
                	:
                	<h1>Choose one</h1>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        name: state.globalReducer.name,
        onlineTime: state.globalReducer.onlineTime
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        setOnlineTime: actions.setOnlineTime
    }, dispatch);
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage));