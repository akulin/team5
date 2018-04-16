/* eslint-disable */
import React from 'react';
import { ChatList } from 'react-chat-elements';
import io from 'socket.io-client';

import Search from './Search/Search.js';
import CreateConversationModal from './CreateConversationModal/CreateConversationModal.js';

export default class Conversations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            conversations: props.conversations,
            shownConversations: props.conversations,
            isModalOpen: false
        };

        this.handleNewConversation = this.handleNewConversation.bind(this);
        this.setShowedConversations = this.setShowedConversations.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

    componentDidMount() {
        this.socket = io();
        this.socket.on(`conversation_${this.props.currentUser}`, this.handleNewConversation);
    }

    handleNewConversation(newConversation) {
        const newConversations = this.state.conversations.slice();
        newConversations.push(newConversation);

        this.setState({
            conversations: newConversations,
            shownConversations: newConversations
        });
    }

    setShowedConversations(conversations) {
        this.setState({
            shownConversations: conversations
        });
    }

    handleOpenModal() {
        this.setState({
            isModalOpen: true
        });
    }

    handleCloseModal() {
        this.setState({
            isModalOpen: false
        });
    }

    render() {
        const dataSource = this.state.shownConversations.map(conversation => {
            return {
                avatar: `/api/avatar/${conversation.title}`,
                title: conversation.title,
                id: conversation.id
            };
        });

        return (
            <div className='conversations-container'>
                <CreateConversationModal
                    isOpen={this.state.isModalOpen}
                    handleCloseModal={this.handleCloseModal}
                    handleNewConversation={this.handleNewConversation}
                />

                <Search
                    conversations={this.state.conversations}
                    handleNewConversation={this.handleNewConversation}
                    handleFilteredConversations={this.setShowedConversations}
                />

                <button onClick={this.handleOpenModal}>+</button>

                <ChatList
                    dataSource={dataSource}
                    onClick={this.props.onConversationClick}
                />

                <style>{`
                    .coversation-form, .conversation-input {
                        border: none;
                        border: 1px solid #c7c7bf;
                        border-radius: 4px;
                        width: 95%;
                        height: 30px;
                        padding-left: 5px;
                    }
                    .rce-container-mbox {
                        flex-direction: column;
                        display: block;
                        overflow: hidden;
                        min-width: 200px;
                    }
                    .rce-mbox-forward {
                        width: 30px;
                        height: 30px;
                        border-radius: 20px;
                        background: #fff;
                        position: absolute;
                        /*display: none;*/
                        flex-direction: row;
                        align-self: center;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 0 5px 0 rgba(164, 164, 164, 1);
                        cursor: pointer;
                        transition: all 0.3s ease;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                    }
    
                    .rce-mbox-forward-left {
                        display: flex;
                        opacity: 0;
                        visibility: hidden;
                        left: -50px;
                    }
    
                    .rce-mbox-forward-right {
                        display: flex;
                        opacity: 0;
                        visibility: hidden;
                        right: -50px;
                    }
    
                    .rce-container-mbox:hover .rce-mbox-forward-left {
                        opacity: 1;
                        visibility: visible;
                    }
    
                    .rce-container-mbox:hover .rce-mbox-forward-right {
                        opacity: 1;
                        visibility: visible;
                    }
    
                    .rce-mbox {
                        position: relative;
                        background: white;
                        border-radius: 5px;
                        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .2);
                        border-top-left-radius: 0px;
                        margin-left: 20px;
                        margin-right: 5px;
                        margin-top: 3px;
                        flex-direction: column;
                        margin-bottom: 3px;
                        padding: 6px 9px 8px 9px;
                        float: left;
                        min-width: 140px;
                    }
    
                    .rce-mbox-body {
                        margin: 0;
                        padding: 0;
                        position: relative;
                    }
    
                    .rce-mbox.rce-mbox-right {
                        float: right;
                        margin-left: 5px;
                        margin-right: 20px;
                        border-top-right-radius: 0px;
                        border-top-left-radius: 5px;
                    }
    
                    .rce-mbox-text {
                        font-size: 13.6px;
                        word-break: break-word;
                    }
    
                    .rce-mbox-text:after {
                        content: "\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0"
                    }
    
                    .rce-mbox-time {
                        text-align: right;
                        color: rgba(0, 0, 0, 0.45);
                        font-size: 12px;
                        position: absolute;
                        right: -4px;
                        bottom: -5px;
                    }
    
                    .rce-mbox-time.non-copiable:before {
                        content: attr(data-text);
                    }
    
                    .rce-mbox-time-block {
                        /*position: relative;*/
                        right: 0;
                        bottom: 0;
                        left: 0;
                        margin-right: -6px;
                        margin-left: -6px;
                        padding-top: 5px;
                        padding-right: 3px;
                        padding-bottom: 2px;
                        background: linear-gradient(to top, rgba(0,0,0,0.33), transparent);
                        border-bottom-left-radius: 5px;
                        border-bottom-right-radius: 5px;
                        color: #fff;
                    }
    
                    .rce-mbox--clear-padding {
                        padding-bottom: 3px;
                    }
    
                    .rce-mbox.rce-mbox--clear-notch {
                        border-radius: 5px 5px 5px 5px !important;
                    }
    
                    .rce-mbox-right-notch {
                        position: absolute;
                        right: -14px;
                        top: 0px;
                        width: 15px;
                        height: 15px;
                        fill: white;
                        filter: drop-shadow( 2px 0px 1px rgba(0, 0, 0, .2));
                    }
    
                    .rce-mbox-left-notch {
                        position: absolute;
                        left: -14px;
                        top: 0px;
                        width: 15px;
                        height: 15px;
                        fill: white;
                    }
    
                    .rce-mbox-title {
                        margin: 0;
                        margin-bottom: 8px;
                        font-weight: 500;
                        font-size: 13px;
                        color: #4f81a1;
                        user-select: none;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                    }
    
                    .rce-mbox-title:hover {
                        text-decoration: underline;
                    }
    
                    .rce-mbox-title--clear {
                        margin-bottom: 5px;
                    }
    
                    .rce-mbox-status {
                        margin-left: 3px;
                        font-size: 15px;
                    }
    
                    .rce-mbox-title > .rce-avatar-container {
                        margin-right: 5px;
                    }
                    .rce-mbox-photo {
                        margin-top: -3px;
                        margin-right: -6px;
                        margin-left: -6px;
                    }
    
                    .rce-mbox-photo .rce-mbox-text {
                        padding: 5px 0px;
                        max-width: 300px;
                        margin: auto;
                    }
    
                    .rce-mbox-photo--img {
                        position: relative;
                        display: flex;
                        overflow: hidden;
                        justify-content: center;
                        border-radius: 5px;
                        max-height: 300px;
                    }
    
                    .rce-mbox-photo--img__block {
                        position: absolute;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        background-color: rgba(0,0,0,0.5);
                        border-radius: 5px;
                        display: flex;
                    }
    
                    .rce-mbox-photo--img img {
                        height: 100%;
                        min-height: 100px;
                        user-select: none;
                    }
    
                    .rce-mbox-photo--img__block-item {
                        margin: auto;
                        cursor: pointer;
                        width: 100px;
                        height: 100px;
                    }
    
                    .rce-mbox-photo--download {
                        color: #efe;
                        display: flex;
                        justify-content: center;
                        background: none;
                        border: none;
                        font-size: 3.2em;
                        outline: none;
                        border: 1px solid #eee;
                        border-radius: 100%;
                        height: 100px;
                        width: 100px;
                    }
    
                    .rce-mbox-photo--download:hover {
                        opacity: .7;
                    }
    
                    .rce-mbox-photo--download:active {
                        opacity: .3;
                    }
                    .rce-mbox-file {
                        padding-bottom: 13px;
                    }
    
                    .rce-mbox-file > button {
                        background: #e9e9e9;
                        display: flex;
                        border-radius: 5px;
                        margin-top: -3px;
                        margin-right: -6px;
                        margin-left: -6px;
                        align-items: center;
                        min-height: 52px;
                        max-width: 500px;
                        padding: 5px 0;
                        cursor: pointer;
                        user-select: none;
                        outline: none;
                        border:none;
                    }
    
                    .rce-mbox-file > button > * {
                        padding: 0px 10px;
                    }
    
                    .rce-mbox-file--icon {
                        font-size: 30px;
                        align-items: center;
                        display: flex;
                        flex-direction: column;
                    }
    
                    .rce-mbox-file--size {
                        font-size: 10px;
                        margin-top: 3px;
                        max-width: 52px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
    
                    .rce-mbox-file--text {
                        font-size: 13.6px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
    
                    .rce-mbox-file--buttons {
                        font-size: 30px;
                        align-items: center;
                        display: flex;
                    }
    
                    .rce-mbox-file--loading {
                        font-size: 15px;
                        width: 40px;
                        height: 40px;
                    }
                    .rce-container-smsg {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
    
                    .rce-smsg {
                        position: relative;
                        background: white;
                        border-radius: 10px;
                        box-shadow: 1px 1px 1px 1px rgba(0,0,0,.2);
                        display: flex;
                        flex-direction: column;
                        margin: 5px 0px;
                        padding: 6px 9px 8px 9px;
                        float: left;
                        max-width: 70%;
                        align-items: center;
                        justify-content: center;
                    }
    
                    .rce-smsg-text {
                        text-align: center;
                        display: inline-block;
                        font-size: 15px;
                    }
                    .rce-mbox-location {
                        position: relative;
                        width: 250px;
                        height: 150px;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-top: -3px;
                        margin-right: -6px;
                        margin-left: -6px;
                        border-radius: 5px;
                    }
    
                    .rce-mbox-location-img {
                        width: 100%;
                    }
    
                    .rce-mbox-location-text {
                        padding: 5px 0;
                        width: 250px;
                        margin-left: -6px;
                        margin-right: -6px;
                    }
                    .rce-mbox-spotify {
                        margin-top: -2px;
                        overflow: hidden;
                        margin-right: -6px;
                        margin-left: -6px;
                        display: flex;
                        border-radius: 5px;
                    }
                    .rce-avatar-container {
                        overflow: hidden;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        overflow: hidden;
                    }
    
                    .rce-avatar-container .rce-avatar {
                        width: 100%;
                        height: 100%;
                    }
    
                    .rce-avatar-container.flexible .rce-avatar {
                        height: auto !important;
                        width: 100% !important;
                        border-radius: unset !important;
                        overflow: unset !important;
                    }
    
                    .rce-avatar-container.default{
                        width: 25px;
                        height: 25px;
                    }
    
                    .rce-avatar-container.rounded{
                        border-radius: 5px;
                    }
    
                    .rce-avatar-container.circle{
                        border-radius: 100%;
                    }
    
                    .rce-avatar-container.xsmall{
                        width: 30px;
                        height: 30px;
                    }
    
                    .rce-avatar-container.small{
                        width: 35px;
                        height: 35px;
                    }
    
                    .rce-avatar-container.medium{
                        width: 40px;
                        height: 40px;
                    }
    
                    .rce-avatar-container.large{
                        width: 45px;
                        height: 45px;
                    }
    
                    .rce-avatar-container.xlarge{
                        width: 55px;
                        height: 55px;
                    }
                    .rce-container-citem {
                        flex-direction: column;
                        display: block;
                        overflow: hidden;
                        min-width: 240px;
                    }
    
                    .rce-citem {
                        position: relative;
                        background: white;
                        display: flex;
                        flex-direction: row;
                        height: 72px;
                        cursor: pointer;
                        user-select: none;
                        max-width: 100%;
                        overflow: hidden;
                        min-width: 240px;
                    }
    
                    .rce-citem:hover {
                        background: #f9f9f9;
                    }
    
                    .rce-citem-avatar {
                        position: relative;
                        padding: 0 15px 0 13px;
                        justify-content: center;
                        display: flex;
                        align-items: center;
                    }
    
                    .rce-citem-status {
                        width: 20px;
                        height: 20px;
                        bottom: 10px;
                        right: 10px;
                        position: absolute;
                        border-radius: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #ccc;
                    }
    
                    .rce-citem-avatar img {
                        width: 50px;
                        height: 50px;
                        border: none !important;
                        background: #ccc;
                        border-radius: 100%;
                        overflow: hidden;
                        font-size: 10px;
                        text-align: center;
                        line-height: 50px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
    
                    .rce-citem-body {
                        display: flex;
                        flex: 1;
                        flex-direction: column;
                        display: flex;
                        justify-content: center;
                        padding-right: 15px;
                        border-bottom: 1px solid rgba(0,0,0,.05);
                        overflow: hidden;
                    }
    
                    .rce-citem-body--top {
                        display: flex;
                    }
    
                    .rce-citem-body--bottom {
                        margin-top: 4px;
                        display: flex;
                    }
    
                    .rce-citem-body--bottom-title, .rce-citem-body--top-title {
                        flex: 1;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
    
                    .rce-citem-body--top-title {
                        font-size: 16px;
                    }
    
                    .rce-citem-body--bottom-title {
                        color: #555;
                        font-size: 15px;
                    }
    
                    .rce-citem-body--top-time {
                        font-size: 12px;
                        color: rgba(0,0,0,0.4)
                    }
    
                    .rce-citem-body--bottom-status {
                        margin-left: 3px;
                    }
    
                    .rce-citem-body--bottom-status span {
                        width: 18px;
                        height: 18px;
                        font-size: 12px;
                        color: white;
                        font-weight: bold;
                        text-align: center;
                        align-items: center;
                        justify-content: center;
                        display: flex;
                        border-radius: 100%;
                        background: red;
                    }
                    .rce-container-clist {
                        display: block;
                        overflow: auto;
                    }
                    .rce-container-mlist {
                        position: relative;
                        display: flex;
                    }
    
                    .rce-mlist {
                        display: block;
                        overflow: auto;
                        position: relative;
                        flex: 1;
                    }
    
                    .rce-mlist-down-button {
                        position: absolute;
                        right: 10px;
                        bottom: 15px;
                        width: 40px;
                        height: 40px;
                        background: #fff;
                        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.05), 0 2px 5px 0 rgba(0,0,0,0.1);
                        border-radius: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #333;
                        cursor: pointer;
                        transition: 200ms;
                    }
    
                    .rce-mlist-down-button:hover {
                        opacity: 0.7;
                    }
    
                    .rce-mlist-down-button--badge {
                        position: absolute;
                        right: -5px;
                        top: -5px;
                        background: red;
                        width: 20px;
                        height: 20px;
                        border-radius: 100%;
                        font-size: 12px;
                        display: flex;
                        text-align: center;
                        align-items: center;
                        justify-content: center;
                        color: #fff;
                        font-weight: 700;
                    }
                    .rce-container-input {
                        display: flex;
                        min-width: 100%;
                        box-sizing: border-box;
                        flex-direction: row;
                        background: #fff;
                        align-items: center;
                    }
    
                    .rce-input {
                        flex: 1;
                        height: 40px;
                        padding: 0 5px;
                        border: none;
                        border-radius: 5px;
                        color: #333;
                        font-size: 14px;
                        box-sizing: border-box;
                        outline: none;
                    }
    
                    .rce-input-textarea {
                        height: 37px;
                        padding: 10px 5px;
                        resize: none;
                    }
    
                    .rce-input-buttons {
                        display: flex;
                        flex-direction: row;
                        margin: 5px;
                    }
    
                    .rce-input-buttons > * {
                        display: flex;
                        flex-direction: row;
                    }
    
                    .rce-input-buttons .rce-button:nth-child(even) {
                        margin-left: 5px;
                        margin-right: 5px;
                    }
    
                    .rce-input-buttons .rce-button:last-child {
                        margin-right: 0;
                    }
    
                    .rce-left-padding {
                        padding-left: 10px;
                        padding-right: 0px !important;
                    }
    
                    .rce-right-padding {
                        padding-right: 10px;
                        padding-left: 0px !important;
                    }
    
                    .rce-input::placeholder {
                        color: #afafaf;
                    }
                    .rce-button {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        border-radius: 5px;
                        cursor: pointer;
                        padding: 8px;
                        text-align: center;
                        box-sizing: border-box;
                        background: #3979aa;
                        color: white;
                        transition: all 0.15s ease;
                        user-select: none;
                        border: none;
                        outline: none;
                        border: none;
                        position: relative;
                    }
    
                    .rce-button-icon--container {
                        display: flex;
                        align-items: center;
                    }
    
                    .rce-button:hover {
                        opacity: 0.8;
                    }
    
                    .rce-button:active {
                        opacity: 0.6;
                    }
    
                    .rce-button.outline {
                        background: rgba(0, 0, 0, 0) !important;
                        border: 1px solid #3979aa;
                        color: #3979aa;
                    }
    
                    .rce-button.outline:hover {
                        opacity: 0.6;
                    }
    
                    .rce-button.outline:active {
                        opacity: 0.3;
                    }
    
                    .rce-button.transparent {
                        background: rgba(0, 0, 0, 0) !important;
                    }
    
                    .rce-button.transparent:hover {
                        opacity: 0.6;
                    }
    
                    .rce-button.transparent:active {
                        opacity: 0.3;
                    }
    
                    .rce-button-icon {
                        position: relative;
                        font-size: 18px;
                        display: flex;
                        padding: 0 3px;
                    }
    
                    .rce-button-badge{
                        border-radius: 4px;
                        padding: 4px;
                        background: #f64b34;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        right: -7px;
                        top:-7px;
                        font-size: 10px;
                    }
    
                    .rce-button.circle {
                        min-width: 35px;
                        min-height: 35px;
                        border: 1px solid #3979aa;
                        border-radius: 100%;
                    }
                    .rce-navbar {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px 10px;
                    }
    
                    .rce-navbar.light {
                        background: #f4f4f4;
                    }
    
                    .rce-navbar.dark {
                        background: #2f414c;
                    }
    
                    .rce-navbar-item {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-start;
                    }
    
                    .rce-navbar-item > * {
                        display: flex;
                        flex-direction: row;
                    }
    
                    .rce-navbar-item > * > * {
                        margin-left: 5px;
                    }.rce-dropdown-container {
                        position: relative;
                    }
                    .rce-dropdown {
                        min-width: 100%;
                        box-sizing: border-box;
                        padding: 8px 15px;
                        background: #fff;
                        border-radius: 5px;
                        display: none;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        transform: scale(0);
                        position: absolute;
                        box-shadow: 0px 0px 5px 0px rgba(163, 163, 163, 1);
                        transform-origin: left top;
                        z-index: 99999;
                    }
    
                    .rce-dropdown.dropdown-show{
                        animation: dropdown-scaling 0.2s ease forwards;
                        display: flex;
                    }
    
                    @keyframes dropdown-scaling {
                        0% {
                            opacity: 0;
                        }
                        50% {
                            opacity: 0.5;
                            transform: scale(1.1);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
    
                    .rce-dropdown.dropdown-hide{
                        animation: dropdown-reverse-scaling 0.2s ease forwards;
                        display: flex;
                    }
    
                    @keyframes dropdown-reverse-scaling {
                        0% {
                            opacity: 1;
                            transform: scale(1);
                        }
                        50% {
                            opacity: 0.5;
                            transform: scale(1.1);
                        }
                        100% {
                            opacity: 0;
                            transform: scale(0);
                        }
                    }
    
                    .rce-dropdown-open__nortwest {
                        transform-origin: left top;
                        left: 0;
                        top: 100%;
                        margin-top: 5px
                    }
    
                    .rce-dropdown-open__norteast {
                        transform-origin: right top;
                        right: 0;
                        top: 100%;
                        margin-top: 5px
                    }
    
                    .rce-dropdown-open__southwest {
                        transform-origin: left bottom;
                        left: 0;
                        bottom: 100%;
                        margin-bottom: 5px
                    }
    
                    .rce-dropdown-open__southeast {
                        transform-origin: right bottom;
                        right: 0;
                        bottom: 100%;
                        margin-bottom: 5px
                    }
    
                    .rce-dropdown ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
    
                    .rce-dropdown ul li {
                        white-space: nowrap;
                        color: #767676;
                        padding: 8px;
                        cursor: pointer;
                        font-size: 16px;
                        width: 100%;
                        border-bottom: 1px solid #e9e9e9;
                        box-sizing: border-box;
                        user-select: none;
                    }
    
                    .rce-dropdown ul li:last-child {
                        border: none;
                    }
    
                    .rce-dropdown ul li:hover a {
                        color: #3a6d8c;
                    }
    
                    .rce-dropdown.fade {
                        opacity: 0;
                        transform: scale(1);
                        animation: dropdown-fade 0.5s ease forwards;
                    }
    
                    @keyframes dropdown-fade {
                        0% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 1;
                        }
                    }
                    .rce-sbar {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px;
                        box-sizing: border-box;
                        min-height: 100%;
                    }
    
                    .rce-sbar.light {
                        background: #f4f4f4;
                    }
    
                    .rce-sbar.dark {
                        background: #2f414c;
                    }
    
                    .rce-sbar-item {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-start;
                        max-width: 100%;
                    }
    
                    .rce-sbar-item > * {
                        display: flex;
                        flex-direction: column;
                    }
    
                    .rce-sbar-item__center {
                        margin: 15px 0;
                    }.rce-popup-wrapper {
                        position: fixed;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        background: rgba(255, 255, 255, 0.7);
                        z-index: 9999999999;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                    }
    
                    .rce-popup {
                        background: #fff;
                        border-radius: 5px;
                        padding: 0 10px 0 10px;
                        width: 400px;
                        min-height: 100px;
                        box-shadow: 0px 0px 25px -2px rgba(79, 79, 79, 1);
                        display: flex;
                        flex-direction: column;
                        align-items: stretch;
                        justify-content: flex-start;
                        animation: popup-scaling 0.4s ease forwards;
                        box-sizing: border-box;
                    }
    
                    @keyframes popup-scaling {
                        0% {
                            transform: scale(0);
                            opacity: 0;
                        }
                        50% {
                            transform: scale(1.2);
                            opacity: 0.5;
                        }
                        100% {
                            transform: scale(1);
                            opacity: 1;
                        }
                    }
    
                    .rce-popup-header {
                        padding: 18px 8px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        box-sizing: border-box;
                    }
    
                    .rce-popup-content {
                        padding: 8px;
                        font-size: 14px;
                        box-sizing: border-box;
                    }
    
                    .rce-popup-content * {
                        margin: 0
                    }
    
                    .rce-popup-footer {
                        padding: 18px 8px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-end;
                        box-sizing: border-box;
                    }
    
                    .rce-popup-footer>* {
                        margin-left: 5px;
                    }
                    .conversations-container
                    {
                        position: fixed;
                        overflow-y: auto;
                        margin-top: 70px;
                        margin-left: 20px;
                        margin-bottom: 100px;
                        float: left;
                        width: 40%;
                        height: 80%;
                    }
                    .contact
                    {
                        margin-top: 10px;
                        width: 90%;
                        height: 100px;
                        background-color: rgba(255,255,255,0.9);
                        box-shadow: inset 0px 0px 0px #e5e5e5, inset 0px 0px 0px #e5e5e5, inset 0px -2px 0px #d7d7d7;
                    }
    
                    .avatar-container img
                    {
                        margin-left: 10px;
                        margin-top: -5px;
                        width: 100px;
                        height: 100px;
                        border-radius: 60%;
                    }
    
                    .contact-name
                    {
                        text-align: center;
                        margin-top: -50px;
                        margin-left: 20px;
                        font-family: Arial, serif;
                        font-size: 20px;
                    }
    
                    a
                    {
                        color: rgba(82,179,217,0.9);
                    }
                    `}</style>
            </div>
        );
    }
}
