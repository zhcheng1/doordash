import { api } from "../common/api";

import '../main.scss';

class ChatWindow extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	loading: true,
            messages: [],
            roomInfo: {},
            message: "",
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
	}

    componentDidMount() {
        let roomId = this.props.roomId;

        const promises = [
            api.getRoomInfo(roomId),
            api.getMessages(roomId),
        ];

        Promise.all(promises).then(dataList => {
            this.setState({
                loading: false,
                roomInfo: dataList[0].data,
                messages: dataList[1].data,
            });
        }).catch(err => {
            console.log(err);
        });
    }

    renderNames(roomInfo) {
        let currentUserName = this.props.name;
        let isCurrentUser = false;
        let list =  roomInfo.users.map((u, i) => {
            isCurrentUser = u.toLowerCase() === currentUserName.toLowerCase();
            if (isCurrentUser) {
                return;
            }

            let name = i === roomInfo.users.length - 1 ? u : u + ", ";

            return (
                <span key={"users" + i}>{name}</span>
            )
        });

        list = [
        <span key={"users_self"} className={"chatWindow_currentUserName"}>{ currentUserName + ", " }</span>,
        ...list,
        ];

        return list;
    }

    renderMessages() {
        let currentUserName = this.props.name;

        return this.state.messages.map((m, i) => {
            let isSelfMsg = m.name === currentUserName;

            return (
                <div key={"message" + i} className={!isSelfMsg ? "chatWindow_messageContainer" : "chatWindow_messageContainer charWindow_message_self"}>
                    <div className={"chatWindow_message"}>
                        {m.message}
                    </div>
                    <div className={"chatWindow_label"}>
                        {!isSelfMsg ? m.name : ""}
                    </div>
                </div>
            )
        });
    }

    onMessageChange(e) {
        this.setState({
            message: e.target.value,
        });
    }

    onSubmit(e) {
        let { message, messages } = this.state;
        if (!message) {
            return;
        }

        api.sendMessage(this.props.roomId, {
            name: this.props.name,
            message: message,
        }).then((resp) => {
            console.log(resp);
            this.setState({
                messages: [...messages, resp.data],
                message: "",
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            )
        }

        let { roomInfo, message } = this.state;

        return (
            <div className={"chatWindow"}>
                <header className={"chatWindow_header"}>
                    <h3>{roomInfo.name}</h3>
                    <div className={"chatWindow_nameList"}>
                        { this.renderNames(roomInfo) }
                    </div>
                </header>
                <section className={"chatWindow_body"}>
                    { this.renderMessages() }
                </section>
                <section className={"chatWindow_bottom"}>
                    <div className={"chatWindow_bottom_inputContainer"}>
                        <input
                            placeholder={"Type your message here..."}
                            value={message}
                            onChange={this.onMessageChange}
                        />
                    </div>
                    <button className={"chatWindow_bottom_button"} onClick={this.onSubmit}>Send</button>
                </section>
            </div>
        )
    }
}

export default ChatWindow;