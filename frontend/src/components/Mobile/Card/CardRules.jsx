import React, { useEffect, useState } from 'react';
import { Skeleton, List, Modal, Button } from 'antd';
import styled from 'styled-components';

const StyledRulesWrapper = styled.div`
  width: 100%;
  height: 32px;
  margin-top: 16px;
`;

export default ({ card = {} }) => {
  const { rulings_uri, name, oracle_id } = card;
  const [rules, setRules] = useState(null);
  const [isOpen, setIsOpen] = useState(null);

  useEffect(() => {
    setRules(null);
    if (!rulings_uri) return;
    fetch(rulings_uri)
      .then(response => response.json())
      .then(({ data }) => setRules(data));
    // Don't refetch when only set is changed
    // eslint-disable-next-line
  }, [oracle_id]);

  const hasRules = rules && rules.length;
  const buttonText = rules
    ? hasRules
      ? 'Show Rulings for this card'
      : 'No rules found'
    : null;

  return (
    <>
      <StyledRulesWrapper showBorder={Boolean(rules)} hasRules={hasRules}>
        {buttonText ? (
          <Button block onClick={() => setIsOpen(true)} disabled={!hasRules}>
            {buttonText}
          </Button>
        ) : (
          <Skeleton active paragraph={null} />
        )}
      </StyledRulesWrapper>
      <Modal footer={null} visible={isOpen} onCancel={() => setIsOpen(false)}>
        <List
          size="small"
          header={
            <span style={{ fontWeight: 600 }}>{`Rules for ${name}`}</span>
          }
          dataSource={rules}
          onClick={() => setIsOpen(false)}
          renderItem={({ comment }) => <List.Item>{comment}</List.Item>}
        />
      </Modal>
    </>
  );
};