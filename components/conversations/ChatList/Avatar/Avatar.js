import React, { Component } from 'react';
import './styles.css';

const classNames = require('classnames');

export default class Avatar extends Component {
    render() {
        return (
            <div className={classNames('rce-avatar-container',
                this.props.type, this.props.size, this.props.className)}>
                <img alt={this.props.alt} src={this.props.src} className={'rce-avatar'} />
                {this.props.sideElement}
            </div>
        );
    }
}
