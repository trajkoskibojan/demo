import * as React from 'react';

import { v4 as uuid } from 'uuid';
import { Navigation, Svg } from '../../assets/styles/pagination';
import next from '../../assets/images/next.svg';
import previouse from '../../assets/images/previouse.svg';

interface IUserData {
    name: string;
    description: string;
    id: string;
    url: string;
}
interface IPaginationPagesProps {
    userData: IUserData[];
    page: number;
    curPage: number;
    handleUsers: (i: number) => void;
    nextHandler: () => void;
    prevHandler: () => void;
}

const PaginationPages: React.FC<IPaginationPagesProps> = ({
    userData,
    page,
    handleUsers,
    nextHandler,
    prevHandler,
    curPage,
}) => {
    const pages = [];

    // create pagination dinamicaly
    if (userData) {
        for (let i = 1; i <= page; i++) {
            pages.push(
                <Navigation
                    key={uuid()}
                    color={curPage === i ? '#e2cb7f' : '#ffe799'}
                    onClick={() => handleUsers(i)}
                >
                    {i}
                </Navigation>
            );
        }
        pages.push(
            <Navigation key={uuid()} className="nextNav" onClick={nextHandler}>
                <p className="next">next</p>
                <Svg icon_path={next} icon_id="Layer_1" />
            </Navigation>
        );
        pages.unshift(
            <Navigation key={uuid()} className="prevNav" onClick={prevHandler}>
                <Svg icon_path={previouse} icon_id="Layer_1" />
                <p>prev</p>
            </Navigation>
        );
    }
    return <>{pages}</>;
};

export default PaginationPages;
