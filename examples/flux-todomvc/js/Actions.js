/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';

/**
  * @param  {string} text
  */
export function create(text) {
  Dispatcher.dispatch({
    actionType: ActionTypes.TODO_CREATE,
    text: text
  });
}

/**
  * @param  {string} id The ID of the ToDo item
  * @param  {string} text
  */
export function updateText(id, text) {
  Dispatcher.dispatch({
    actionType: ActionTypes.TODO_UPDATE_TEXT,
    id: id,
    text: text
  });
}

/**
  * Toggle whether a single ToDo is complete
  * @param  {object} todo
  */
export function toggleComplete(todo) {
  var id = todo.id;
  if (todo.complete) {
    Dispatcher.dispatch({
      actionType: ActionTypes.TODO_UNDO_COMPLETE,
      id: id
    });
  } else {
    Dispatcher.dispatch({
      actionType: ActionTypes.TODO_COMPLETE,
      id: id
    });
  }
}

/**
  * Mark all ToDos as complete
  */
export function toggleCompleteAll() {
  Dispatcher.dispatch({
    actionType: ActionTypes.TODO_TOGGLE_COMPLETE_ALL
  });
}

/**
  * @param  {string} id
  */
export function destroy(id) {
  Dispatcher.dispatch({
    actionType: ActionTypes.TODO_DESTROY,
    id: id
  });
}

/**
  * Delete all the completed ToDos
  */
export function destroyCompleted() {
  Dispatcher.dispatch({
    actionType: ActionTypes.TODO_DESTROY_COMPLETED
  });
}
