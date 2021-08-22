/* eslint-disable camelcase */
/* eslint-disable react/react-in-jsx-scope */
import { ReactElement } from 'react';
import styled from 'styled-components';

interface IPagination {
    showNext: boolean;
    showPrev: boolean;
}

export const Pagination = styled.div<IPagination>`
    display: flex;
    justify-content: center;
    margin-bottom: 8rem;

    & .nextNav {
        width: 6rem;
        display: ${(p) => (p.showNext ? 'none' : 'flex')};
        padding-top: 0.8rem;
    }

    & .prevNav {
        width: 6rem;
        display: ${(p) => (p.showPrev ? 'none' : 'flex')};
        padding-top: 0.8rem;
    }
`;

export const Navigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 2.5rem;
    font-weight: 700;
    font-size: 1.2rem;
    background: ${(props) => props.color || '#ffe799'};
    border: 1px solid #e0cd8d;
    cursor: pointer;

    &:hover {
        background: #e2cb7f;
    }

    & .next {
        margin-right: 0.5rem;
    }
    & .prev {
        margin-right: 0.5rem;
    }
`;

const Svgs = styled.svg`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    fill: ${(p) => p.fill};
`;

interface ISvg {
    icon_path: string;
    icon_id: string;
}

export const Svg = ({ icon_path, icon_id }: ISvg): ReactElement => (
    <Svgs>
        <use xlinkHref={`${icon_path}#${icon_id}`} />
    </Svgs>
);
