import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { client } from '../../utils/client';
import { Table, Button } from 'antd';

const columns = [{
  title: 'Name',
  render(text: string, record: any) {
    return [record.firstname, record.lastname].join(' ');
  }
}, {
  title: 'Email',
  dataIndex: 'email',
}];

export const Users = () => (
  <Query
    client={client}
    query={gql`
      query {
        allUsers {
          id
          firstname
          lastname
          email
          lastLogin
          createdAt
          updatedAt
        }
      }
    `}
  >
    {({ data, loading, error }) => {
      return (
        <>
          <Table
            columns={columns}
            dataSource={data.allUsers}
            rowKey="id"
          />
          <Button type="primary">Add User</Button>
        </>
      )
    }}
  </Query>
);
