import * as React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';
import { Loader } from '../../assets/styles';

const LoadingSpinner: React.FC = () => {
    return (
        <Loader>
            <ClipLoader color="blue" loading size={100} />
        </Loader>
    );
};

export default LoadingSpinner;
