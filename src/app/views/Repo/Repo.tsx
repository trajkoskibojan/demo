import * as React from 'react';
import { Col, Divider, Input, Row, Table } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { columns } from './RepoConstants';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import PaginationPages from '../../components/PaginationPages';
import { Pagination } from '../../../assets/styles/pagination';

interface IUserData {
    name: string;
    description: string;
    id: string;
    url: string;
}

interface INode {
    node: IUserData;
}

type event = React.ChangeEvent<HTMLInputElement>;

const getRepo = gql`
    query myOrgRepos($user: String!, $first: Int) {
        search(query: $user, type: REPOSITORY, first: $first) {
            edges {
                node {
                    ... on Repository {
                        name
                        description
                        id
                        url
                    }
                }
            }
        }
    }
`;

let CUR_PAGE = 1;
const USERS_PER_PAGE = 6;

const Repo: React.FC = () => {
    const [initialData, setInitialData] = React.useState<IUserData[]>([]);
    const [userData, setUserData] = React.useState<IUserData[]>([]);
    const [userDataOnPage, setUserDataOnPage] = React.useState<IUserData[]>([]);
    const [value, setValue] = React.useState<string>('');
    const { Search } = Input;

    const { loading, error, data } = useQuery(getRepo, {
        variables: { user: 'org:trajkoskibojan', first: 21 },
    });

    // fetch data
    React.useEffect(() => {
        const updateData: IUserData[] = [];

        if (data) {
            data.search.edges.forEach((el: INode) => {
                updateData.push(el.node);
            });
        }

        setUserData(updateData);
        setInitialData(updateData);
    }, [data]);

    // search implementation for all properties
    React.useEffect(() => {
        const properties = ['id', 'name', 'description', 'url'];
        const filterData = initialData.filter((e: any) => {
            return properties.find((propertie: string) => {
                return (
                    e[propertie] &&
                    e[propertie].toLowerCase().includes(value.toLowerCase())
                );
            });
        });

        setUserData(filterData);
    }, [value, initialData]);

    // set user data accordingly to the clicked paggination
    const handleUsers = (page: number): void => {
        CUR_PAGE = Number(page);

        const start = (CUR_PAGE - 1) * USERS_PER_PAGE;
        const end = (CUR_PAGE - 1) * USERS_PER_PAGE + USERS_PER_PAGE;

        const userspage = userData.slice(start, end);
        setUserDataOnPage(userspage);
    };

    // initial set of the data pagination
    React.useEffect(() => {
        if (userData.length > 0) {
            setUserDataOnPage(userData.slice(0, 6));
        } else {
            handleUsers(CUR_PAGE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    const onSearch = (e: event): void => {
        setValue(e.target.value);
    };

    const page = Math.ceil(userData.length / 6);

    // next button click handler
    const nextHandler = (): void => {
        if (CUR_PAGE >= 1 && CUR_PAGE !== page) {
            CUR_PAGE += 1;
            handleUsers(CUR_PAGE);
        }
    };

    // previouse button click handler
    const prevHandler = (): void => {
        if (CUR_PAGE <= page && CUR_PAGE !== 1) {
            CUR_PAGE -= 1;
            handleUsers(CUR_PAGE);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }
    if (error) {
        return <ErrorMessage />;
    }
    return (
        <>
            <Divider orientation="center">Bojan GitHub Repositories</Divider>
            <Row>
                <Col span={16} offset={4}>
                    <Search
                        placeholder="input search text"
                        value={value}
                        onChange={onSearch}
                        style={{ width: 200 }}
                        allowClear
                    />
                    {/* Build in pagination from Antd library */}
                    {/* <Table dataSource={userDataOnPage} columns={columns} pagination={{ defaultPageSize: 6 }} /> */}
                    <Table
                        rowKey="id"
                        dataSource={userDataOnPage}
                        columns={columns}
                    />
                    <Pagination
                        showPrev={CUR_PAGE === 1}
                        showNext={CUR_PAGE === page}
                    >
                        <PaginationPages
                            page={page}
                            curPage={CUR_PAGE}
                            userData={userData}
                            handleUsers={handleUsers}
                            nextHandler={nextHandler}
                            prevHandler={prevHandler}
                        />
                    </Pagination>
                </Col>
            </Row>
        </>
    );
};

export default Repo;
