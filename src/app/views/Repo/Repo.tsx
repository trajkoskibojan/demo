import * as React from 'react';
import { Col, Divider, Row, Table } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { columns } from './RepoConstants';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

interface IUserData {
    name: string;
    description: string;
    id: string;
    url: string;
}

interface INode {
    node: IUserData;
}

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

const Repo: React.FC = () => {
    const [initialData, setInitialData] = React.useState<IUserData[]>([]);
    const [userData, setUserData] = React.useState<IUserData[]>([]);
    const [userDataOnPage, setUserDataOnPage] = React.useState<IUserData[]>([]);

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
        console.log(updateData);
        setUserData(updateData);
        setInitialData(updateData);
        setUserDataOnPage(updateData);
    }, [data]);

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
                    {/* Build in pagination from Antd library */}
                    {/* <Table dataSource={userDataOnPage} columns={columns} pagination={{ defaultPageSize: 6 }} /> */}
                    <Table
                        rowKey="id"
                        dataSource={userDataOnPage}
                        columns={columns}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Repo;
