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
import * as Actions from './Actions';
import TodoTextInput from './TodoTextInput.react';

export default class Header extends React.Component {

  render() {
    return (
      <header id="header">
        <h1>todos</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave}
        />
      </header>
    );
  }

  @autobind
  _onSave(text) {
    if (text.trim()){
      Actions.create(text);
    }
  }

}
