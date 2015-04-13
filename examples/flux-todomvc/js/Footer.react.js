/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';
import autobind from 'autobind-decorator';
import * as Actions from './Actions';

export default class Footer extends React.Component {

  static propTypes = {
    allTodos: React.PropTypes.object.isRequired
  }

  render() {
    let allTodos = this.props.allTodos;
    let keys = Object.keys(allTodos);
    let total = keys.length;
    let completed = keys.filter(key => allTodos[key].complete).length;

    if (total === 0) {
      return null;
    }

    let itemsLeft = total - completed;
    let itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    let clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>;
    }

  	return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  }

  @autobind
  _onClearCompletedClick() {
    Actions.destroyCompleted();
  }

}
