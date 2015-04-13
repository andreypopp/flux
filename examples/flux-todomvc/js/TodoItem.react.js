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
import cx from 'react/lib/cx';

export default class TodoItem extends React.Component {

  static propTypes = {
   todo: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {isEditing: false};
  }

  render() {
    var todo = this.props.todo;

    var input;
    if (this.state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.text}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={cx({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  }

  @autobind
  _onToggleComplete() {
    Actions.toggleComplete(this.props.todo);
  }

  @autobind
  _onDoubleClick() {
    this.setState({isEditing: true});
  }

  @autobind
  _onSave(text) {
    Actions.updateText(this.props.todo.id, text);
    this.setState({isEditing: false});
  }

  @autobind
  _onDestroyClick() {
    Actions.destroy(this.props.todo.id);
  }

}
