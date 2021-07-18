import React, { useEffect } from 'react';
import {
  Button,
  Dropdown,
  Icon,
  Menu,
  Pagination,
  Placeholder,
  Table,
} from 'semantic-ui-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectLogin } from 'src/redux/reducers/login/selectors';
import { selectTransactions } from 'src/redux/reducers/transactions/getTransactions/selectors';
import { getTransactions as getTransactionsAction } from 'src/redux/reducers/transactions/getTransactions/actions';
import AddTransaction from './AddTransaction';
import { useHistory } from 'react-router-dom';

const HeaderContainer = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 24px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const UserInfoWrapper = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfo = styled.span``;

const TableContainer = styled.div`
  background-color: #fff;
  padding: 24px;
  margin: 24px auto;
  width: 80%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const DropdownUsername = styled.div`
  padding: 0px 30px;
  font-weight: bold;
  font-size: 1.3em;
`;

const Home = (): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useSelector(selectLogin);
  const { data, meta, loading } = useSelector(selectTransactions);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getTransactionsAction()(dispatch);
  }, []);

  const onPageChange = (_: any, { activePage }: any) => {
    getTransactionsAction({ limit: 10, page: activePage })(dispatch);
  };

  const handleUserLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <>
      <AddTransaction open={open} setOpen={setOpen} />
      <HeaderContainer>
        <Logo>Check Balance</Logo>
        <UserInfoWrapper>
          <Info>
            <UserInfo>{user.username.toUpperCase()}</UserInfo>
            <UserInfo>{user.email}</UserInfo>
          </Info>

          <Dropdown disabled={loading} closeOnChange={false} closeOnBlur>
            <Dropdown.Menu direction="left">
              <Dropdown.Header>
                <DropdownUsername>
                  <UserInfo>{user.username.toUpperCase()}</UserInfo>
                </DropdownUsername>
              </Dropdown.Header>
              <Dropdown.Item
                onClick={() => {
                  handleUserLogout();
                }}
              >
                <>
                  {!loading && (
                    <div>
                      <Icon name="sign-out" />
                      Log out
                    </div>
                  )}
                </>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </UserInfoWrapper>
      </HeaderContainer>

      <TableContainer>
        <Header>
          <Title>Transaction List</Title>
          <Button primary onClick={() => setOpen(true)}>
            New
          </Button>
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>New Balance</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((item: any, index: number) => (
              <Table.Row key={`${item._id}_${index}`}>
                <Table.Cell>{item.transactionType}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.amount}</Table.Cell>
                <Table.Cell>{item.newBalance}</Table.Cell>
              </Table.Row>
            ))}
            {loading && (
              <Table.Row>
                <Table.Cell>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length="full" />
                      <Placeholder.Line length="full" />
                    </Placeholder.Header>
                  </Placeholder>
                </Table.Cell>
                <Table.Cell>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length="full" />
                      <Placeholder.Line length="full" />
                    </Placeholder.Header>
                  </Placeholder>
                </Table.Cell>
                <Table.Cell>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length="full" />
                      <Placeholder.Line length="full" />
                    </Placeholder.Header>
                  </Placeholder>
                </Table.Cell>
                <Table.Cell>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length="full" />
                      <Placeholder.Line length="full" />
                    </Placeholder.Header>
                  </Placeholder>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Menu floated="right" pagination>
                  <Pagination
                    // boundaryRange={0}
                    // siblingRange={1}
                    // defaultActivePage={1}
                    // activePage={meta.page}
                    // ellipsisItem={null}
                    // // firstItem={null}
                    // // lastItem={null}
                    // totalPages={meta.total / 10}
                    // onPageChange={onPageChange}

                    data={data}
                    defaultActivePage={1}
                    activePage={meta.page}
                    totalPages={Math.ceil(meta.total / 10)}
                    boundaryRange={0}
                    floated="right"
                    siblingRange={1}
                    onPageChange={onPageChange}
                  />
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
