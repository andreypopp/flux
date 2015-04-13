/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';
import autobind from 'autobind-decorator';

const ENTER_KEY_CODE = 13;

export default class TodoTextInput extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onSave: React.PropTypes.func.isRequired,
    value: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
    };
  }

  render() /*object*/ {
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true}
      />
    );
  }

  @autobind
  _save() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  }

  @autobind
  _onChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  @autobind
  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

}
