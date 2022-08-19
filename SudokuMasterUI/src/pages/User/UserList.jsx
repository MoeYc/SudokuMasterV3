/*
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import { Card, Col, Row } from 'antd';
import UserTable from './UserTable';

const UserList = (props) => (
  <div className="gutter-example">
    <Row gutter={16}>
      <Col className="gutter-row" md={14}>
        <div className="gutter-box">
          <Card title="用户列表" bordered={false}>
            <UserTable />
          </Card>
        </div>
      </Col>
      <Col className="gutter-row" md={10}>
        <div className="gutter-box">
          <Card title="编辑用户" bordered={false} />
        </div>
      </Col>
    </Row>
  </div>
);

export default UserList;
