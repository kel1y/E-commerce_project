import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import search from '../assets/Icons/search_dashboard.svg';
import truck from '../assets/Icons/truck.svg';
import wish from '../assets/Icons/wish.svg';
import expired from '../assets/Icons/expired.svg';
import menu from '../assets/Icons/menu.svg';
import bell from '../assets/Icons/bell.svg';
import avatar from '../assets/Icons/avatar.svg';
import ellipsis from '../assets/Icons/ellipsis.svg';
import left_arrow from '../assets/Icons/left-arrow.svg';
import right_arrow from '../assets/Icons/right-arrow.svg';
import arrow_down from '../assets/Icons/arrow_down.svg';
import arrow_up from '../assets/Icons/arrow_up.svg';

import next from '../assets/Icons/next.svg';
import spinner from '../assets/Icons/spinner.svg';
import Chev from '../assets/Icons/Chev.svg';
import { fetchUsers } from '../redux/slices/user/getUsers';
import { current } from '@reduxjs/toolkit';
import { ChangeStatus, FetchStatus } from '../redux/slices/user/changestatus';
import { ChangeRole } from '../redux/slices/user/changerole';
import { PaginationDashboard } from '../components';

const AdminDashboard = () => {
  const { users, loading } = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchUsers({
        page: currentPage,
        limit: 10,
        sortField: 'email',
        sortOrder: 'asc',
      })
    );

    const delay = 3000;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [dispatch, currentPage]);
  const buyers = users.allUsers?.filter(
    (user) => user.role === 'buyer'
  )?.length;
  const sellers = users.allUsers?.filter(
    (user) => user.role === 'seller'
  )?.length;
  const admins = users.allUsers?.filter(
    (user) => user.role === 'admin'
  )?.length;
  const handleChangeStatus = (email, currentPage) => {
    setIsLoading(false);
    dispatch(ChangeStatus(email, currentPage));
  };
  const handleChangeRole = (email, role, currentPage) => {
    dispatch(ChangeRole(email, role, currentPage));
  };
  const sortByFirstName = () => {
    setSortBy('firstname');
    setSortOrder('asc');
  };
  const revertSortByFirstName = () => {
    setSortBy('firstname');
    setSortOrder('desc');
  };
  const sortByEmail = () => {
    setSortBy('email');
    setSortOrder('asc');
  };
  const revertSortByEmail = () => {
    setSortBy('email');
    setSortOrder('desc');
  };
  const sortByRole = () => {
    setSortBy('role');
    setSortOrder('asc');
  };
  const revertSortByRole = () => {
    setSortBy('role');
    setSortOrder('desc');
  };
  const sortByStatus = () => {
    setSortBy('status');
    setSortOrder('asc');
  };
  const revertSortByStatus = () => {
    setSortBy('status');
    setSortOrder('desc');
  };
  return (
    <div className="seller_dashboard" data-testid="admin_dashboard">
      <div
        className="seller_dashboard_container"
        data-testid="admin-dashboard-container"
      >
        <div
          className="admin_dashboard_header"
          data-testid="admin-dashboard-header"
        >
          <div className="all_products" data-testid="all_products">
            <p className="all_products_title">
              <a href="/">
                <img src={Chev} alt="arrow" />
              </a>
              Dashboard
            </p>
          </div>
        </div>

        <div className="cards">
          <div className="available">
            <img src={truck} alt="truck" />
            <p className="card_title">Sellers</p>
            <p className="card_number">{sellers}</p>
          </div>
          <div className="wished">
            <img src={wish} alt="wish" />
            <p className="card_title">Buyers</p>
            <p className="card_number">{buyers}</p>
          </div>
          <div className="expired">
            <img src={expired} alt="expired" />
            <p className="card_title">Admins</p>
            <p className="card_number">{admins}</p>
          </div>
        </div>
        <div className="user_container">
          <div className="users_title">All Users</div>
          {isLoading ? (
            <div className="user_table_container">
              <img
                src={spinner}
                style={{ height: '55px' }}
                alt="loader"
                data-testid="loader-container"
              />
            </div>
          ) : null}
          {users && !isLoading && (
            <div
              className="user_table_container"
              data-testid="user_table_container"
            >
              <table className="user_table" data-testid="user_table">
                <thead>
                  <tr className="table_headers_container">
                    <th className="table_headers_names">
                      <div>Names</div>
                      <div className="sort-controls-names">
                        <button
                          type="button"
                          className="sort-arrow"
                          onClick={sortByFirstName}
                        >
                          <img src={arrow_up} alt="previous" />
                        </button>
                        <button
                          type="button"
                          className="sort-down-arrow"
                          onClick={revertSortByFirstName}
                        >
                          <img src={arrow_down} id="arrow_down" alt="next" />
                        </button>
                      </div>
                    </th>
                    <th className="table_headers_email">
                      <div>Email</div>
                      <div className="sort-controls-email">
                        <button
                          type="button"
                          className="sort-arrow"
                          onClick={sortByEmail}
                        >
                          <img src={arrow_up} alt="previous" />
                        </button>
                        <button
                          type="button"
                          className="sort-down-arrow"
                          onClick={revertSortByEmail}
                        >
                          <img src={arrow_down} alt="next" />
                        </button>
                      </div>
                    </th>
                    <th className="table_headers_role">
                      Role{' '}
                      <div className="sort-controls-role">
                        <button
                          type="button"
                          className="sort-arrow"
                          onClick={sortByRole}
                        >
                          <img src={arrow_up} alt="previous" />
                        </button>
                        <button
                          type="button"
                          className="sort-down-arrow"
                          onClick={revertSortByRole}
                        >
                          <img src={arrow_down} alt="next" />
                        </button>
                      </div>
                    </th>
                    <th className="table_headers_status">
                      Status{' '}
                      <div className="sort-controls-status">
                        <button
                          type="button"
                          className="sort-arrow"
                          onClick={sortByStatus}
                        >
                          <img src={arrow_up} alt="previous" />
                        </button>
                        <button
                          type="button"
                          className="sort-down-arrow"
                          onClick={revertSortByStatus}
                        >
                          <img src={arrow_down} alt="next" />
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody data-testid="user_table_body">
                  {users.allUsers
                    ?.slice()
                    ?.sort((a, b) => {
                      if (sortBy === 'email') {
                        return sortOrder === 'asc'
                          ? a.email.localeCompare(b.email)
                          : b.email.localeCompare(a.email);
                      } else if (sortBy === 'role') {
                        return sortOrder === 'asc'
                          ? a.role.localeCompare(b.role)
                          : b.role.localeCompare(a.role);
                      } else if (sortBy === 'status') {
                        return sortOrder === 'asc'
                          ? a.status - b.status
                          : b.status - a.status;
                      } else if (sortBy === 'firstname') {
                        return sortOrder === 'asc'
                          ? a.firstname.localeCompare(b.firstname)
                          : b.firstname.localeCompare(a.firstname);
                      } else {
                        return a.email.localeCompare(b.email);
                      }
                    })
                    ?.map((currentUser) => (
                      <tr
                        className="table_data_container"
                        key={currentUser.id}
                        data-testid="user_table_data"
                      >
                        <td>
                          <div className="user-list-names-container">
                            <img
                              src={currentUser.avatar}
                              className={`user-list-avatar ${
                                currentUser.status
                                  ? 'active-avatar'
                                  : 'inactive-avatar'
                              }`}
                            />{' '}
                            <div className="user-list-names">
                              <div className="user-list-firstname">
                                {currentUser.firstname}
                              </div>
                              <div className="user-list-lastname">
                                {' '}
                                {currentUser.lastname}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {currentUser.email}
                          <br></br>{' '}
                          <div className="isVerified">
                            {currentUser.isVerified
                              ? 'Verifed'
                              : 'Not Verified'}
                          </div>
                        </td>
                        <td className="current-user-role">
                          {currentUser.role}
                        </td>
                        <td className="current-user-status">
                          {currentUser.status ? (
                            <button className="user-list-active">ACTIVE</button>
                          ) : (
                            <button className="user-list-disabled">
                              DISABLED
                            </button>
                          )}
                        </td>

                        <td>
                          <div className="user-list-dropdown-container">
                            <img
                              src={ellipsis}
                              alt=""
                              className="ellipsis-icon"
                            />
                            <div className="user-list-dropdown-content">
                              <a
                                className="user-list-status-link"
                                onClick={() =>
                                  handleChangeStatus({
                                    email: currentUser.email,
                                    currentPage: currentPage,
                                  })
                                }
                              >
                                Change Status
                              </a>

                              <div className="change-role">
                                <select
                                  className="user-list-role"
                                  placeholder="Change Role"
                                  onChange={(e) =>
                                    handleChangeRole({
                                      email: currentUser.email,
                                      role: e.target.value,
                                      currentPage: currentPage,
                                    })
                                  }
                                >
                                  <option value="">Change Role</option>
                                  <option value="buyer">Buyer</option>
                                  <option value="seller">Seller</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </div>
                              <div className="user-list-role-dropdown-content"></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <PaginationDashboard
                currentPage={currentPage}
                totalPages={users.totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
