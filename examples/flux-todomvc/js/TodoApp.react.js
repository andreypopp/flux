/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

import React from 'react';
import ReactAsync from 'react-async';
import Footer from './Footer.react';
import Header from './Header.react';
import MainSection from './MainSection.react';
import TodoStore from './TodoStore';

@ReactAsync
export default class TodoApp extends React.Component {

  static observe() {
    return {
      todo: TodoStore
    };
  }

  render() {
    let {todo} = this.props;
  	return (
      <div>
        <Header />
        <MainSection
          allTodos={todo.allTodos}
          areAllComplete={todo.areAllComplete}
          />
        <Footer allTodos={todo.allTodos} />
      </div>
  	);
  }

}
