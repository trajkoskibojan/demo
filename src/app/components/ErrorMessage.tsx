import * as React from 'react';
import { Error, H4 } from '../../assets/styles';

const ErrorMessage: React.FC = () => {
    return (
        <Error>
            <H4>Something went wrong, please try again!</H4>
        </Error>
    );
};

export default ErrorMessage;
