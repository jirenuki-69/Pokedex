import React from 'react';
import { Container, Row, RowContent, BarStatus } from '../../../styles/stats';
import { statsContent } from '../../../utils/constants';

const Stats = ({ stats, color }) => (
  <Container>
    {statsContent &&
      statsContent.map((stat) => (
        <Row key={stat.field}>
          <strong>{stat.title}</strong>
          <RowContent>
            <span>{stats[stat.field] || 1}</span>
            <BarStatus
              percentage={stats[stat.field] < 100 ? stats[stat.field] : 100}
              color={color}
            >
              <span />
            </BarStatus>
            <span>100</span>
          </RowContent>
        </Row>
      ))}
  </Container>
);

export default Stats;
