/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';
import Rx from 'rx';

let _todos = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = {..._todos[id], ...updates};
}

/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (let id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (let id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

/**
  * Tests whether all the remaining TODO items are marked as completed.
  * @return {boolean}
  */
function areAllComplete() {
  for (let id in _todos) {
    if (!_todos[id].complete) {
      return false;
    }
  }
  return true;
}

function getState() {
  return {
    allTodos: _todos,
    areAllComplete: areAllComplete()
  };
}

let observable = new Rx.BehaviorSubject(getState());

// Register callback to handle all updates
Dispatcher.register(function(action) {
  let text;

  switch(action.actionType) {
    case ActionTypes.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        observable.onNext(getState());
      }
      break;

    case ActionTypes.TODO_TOGGLE_COMPLETE_ALL:
      if (areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      observable.onNext(getState());
      break;

    case ActionTypes.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      observable.onNext(getState());
      break;

    case ActionTypes.TODO_COMPLETE:
      update(action.id, {complete: true});
      observable.onNext(getState());
      break;

    case ActionTypes.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        observable.onNext(getState());
      }
      break;

    case ActionTypes.TODO_DESTROY:
      destroy(action.id);
      observable.onNext(getState());
      break;

    case ActionTypes.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      observable.onNext(getState());
      break;

    default:
      // no op
  }
});

export default observable;
