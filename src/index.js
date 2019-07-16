import React from 'react';
import ReactDOM from 'react-dom';
// Router
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// container components
import { App, Home, Login, Register, Wall } from 'containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';
/* 로그 미들웨어를 생성 할 때 설정을 커스터마이징 할 수 있습니다.
   https://github.com/evgenyrodionov/redux-logger#options
*/
const logger = createLogger(); 

import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk, logger));

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="wall/:username" component={Wall}/>
        </Route>
    </Router>
    </Provider>, rootElement
);
