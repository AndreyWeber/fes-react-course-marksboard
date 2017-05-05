import React, { Component } from 'react';

import Error from '../components/Error.jsx';
import NavigationBar from '../components/NavigationBar.jsx';

const DEFAULT_ERROR_CODE = 404;
const DEFAULT_ERROR_MESSAGE = "Page, you are looking for, doesn't exist";

export default class ErrorPage extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <Error code={DEFAULT_ERROR_CODE}>
                    {DEFAULT_ERROR_MESSAGE}
                </Error>
            </div>
        );
    }
}
