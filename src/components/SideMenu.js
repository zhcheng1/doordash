import { withRouter, Link } from 'react-router';
import '../main.scss';

export default class SideMenu extends React.Component {
	constructor(props) {
        super(props);
	}

	render() {
		let onlineTime = this.props.onlineTime;
		if (onlineTime < 60000) {
			onlineTime = "less than 1 minute";
		} else {
			onlineTime = Math.floor(onlineTime / 60000) + " minutes";
		}

		return (
			<nav className={"sideMenu"} style={{ height: window.innerHeight }}>
				<header className={"sideMenu_header"}>
					<h3>{this.props.name}</h3>
					<div className={"sideMenu_onlineTime"}>Online for {onlineTime}</div>
				</header>
				<section>
					{
						this.props.rooms.map((room, i) => {
							return (
								<div key={"rooms" + i} className={this.props.activeId === room.id + "" ? "sideMenu_link sideMenu_link_active" : "sideMenu_link"}>
									<Link to={"/room/" + i}>{room.name}</Link>
								</div>
							)
						})
					}
				</section>

			</nav>
		)
	}
}