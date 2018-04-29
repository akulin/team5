import React, { Component } from 'react';

import 'react-chat-elements/dist/main.css';
import Conversations from '../../components/conversations';
import Chat from '../../components/chat';
import Menu from '../../components/menu';
import axios from 'axios';

import './styles.css';

import LoadingSpinner from '../../components/LoadingSpinner';

export default class IndexPage extends Component {
    static async getInitialProps({ req }) {
        const [conversations, contactsList] = await Promise.all([
            axios.get('http://localhost:3000/api/conversations', req),
            axios.get('http://localhost:3000/api/contacts', req)
        ]);

        return {
            messagesInfo: {
                'currentUser': req.user.username
            },
            conversations: conversations.data,
            contacts: contactsList.data,
            menu: {
                'name': req.user.username,
                'avatar': `/api/avatar/${req.user.username}`,
                'link': req.user.profileUrl,
                'registered': req.user._json.created_at
            },
            loading: false
        };
    }

    constructor(props) {
        super(props);
        this.state = props;
    }

    async _onConversationClick(conversation) {
        this.setState({
            messagesInfo: {
                'currentUser': this.state.messagesInfo.currentUser
            },
            loading: true
        });

        this.loadConversations(conversation.id);
    }

    async loadConversations(conversationId) {
        const currentUser = this.state.messagesInfo.currentUser;
        let res = await axios.get(`api/messages/${conversationId}`,
            { withCredentials: true });

        this.setState({
            messagesInfo: {
                'conversationId': conversationId,
                'messages': res.data.map(elem => JSON.parse(elem)),
                'currentUser': currentUser
            },
            loading: false
        });
    }

    render() {
        const conversations = this.state.conversations;
        const messagesInfo = this.state.messagesInfo;
        const currentUser = this.props.messagesInfo.currentUser;
        const menu = this.state.menu;
        const contactsList = this.state.contacts;
        const loading = this.state.loading;

        return (
            <div className='content-wrapper'>
                {loading ? <LoadingSpinner /> : null}
                <Conversations conversations={conversations}
                    onConversationClick={this._onConversationClick.bind(this)}
                    currentUser={currentUser}
                />
                {messagesInfo.messages
                    ? <Chat messagesInfo={messagesInfo}/>
                    : null
                }
                <Menu contacts={contactsList}
                    menu={menu} />
            </div>
        );
    }
}