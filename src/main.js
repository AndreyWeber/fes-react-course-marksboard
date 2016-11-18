import { toJS } from 'immutable';
import { getStudents } from './api';

getStudents().then(
    response => console.log(response.toJS()),
    error => console.log(error)
);
