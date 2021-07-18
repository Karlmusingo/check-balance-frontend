import React, { useEffect } from 'react';
import { Button, Form, Message, Modal, TextArea } from 'semantic-ui-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addTransaction as addNewTransactionAction } from 'src/redux/reducers/transactions/addTransaction/actions';
import { selectNewTransaction } from 'src/redux/reducers/transactions/addTransaction/selectors';
import { toast } from 'react-toastify';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const addTransaction = ({ open, setOpen }: IProps): React.ReactElement => {
  const [transactionData, setTransactionData] = useState({
    transactionType: '',
    amount: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    transactionType: '',
    amount: '',
    description: '',
  });

  const { data, error, loading } = useSelector(selectNewTransaction);
  const dispatch = useDispatch();

  const handleSubmit = (): void => {
    if (!transactionData.transactionType) {
      setErrors((prev) => ({
        ...prev,
        transactionType: 'Please select the transaction type',
      }));
    }
    if (!transactionData.amount) {
      setErrors((prev) => ({
        ...prev,
        amount: 'Please enter the amount',
      }));
    }
    if (transactionData.transactionType && transactionData.amount) {
      toast.success('Your new transaction has been saved successfully');
      addNewTransactionAction({
        ...transactionData,
        amount: Number(transactionData.amount),
      })(dispatch)(() => {
        setTransactionData({
          transactionType: '',
          amount: '',
          description: '',
        });
        setOpen(false);
      });
    }
  };

  const clearError = (name: string) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleChange = ({ target: { name, value } }: Record<string, any>) => {
    clearError(name);
    setTransactionData({
      ...transactionData,
      [name]: value,
    });
  };

  return (
    <>
      <Modal
        size="tiny"
        open={open}
        onClose={() => setOpen(false)}
        closeOnDimmerClick={false}
      >
        <Modal.Header>Add a transaction</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field onChange={handleChange}>
              <label>Amount</label>
              <Form.Input
                name="amount"
                type="number"
                placeholder="amount"
                error={errors.amount || false}
              />
            </Form.Field>
            <Form.Field>
              <label>Transaction Type</label>
              <Form.Select
                placeholder="Select the transaction type"
                name="transactionType"
                fluid
                onChange={(e, { name, value }) => {
                  clearError(name);
                  setTransactionData({
                    ...transactionData,
                    [name]: value,
                  });
                }}
                options={[
                  { key: 'DEBIT', value: 'DEBIT', text: 'DEBIT' },
                  { key: 'CREDIT', value: 'CREDIT', text: 'CREDIT' },
                ]}
                error={errors.transactionType || false}
              />
            </Form.Field>
            <Form.Field onChange={handleChange}>
              <label>Description</label>
              <TextArea name="description" placeholder="Description" />
            </Form.Field>
            {error && (
              <Message negative>
                <p>{error.message}</p>
              </Message>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            positive
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
          >
            Add
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default addTransaction;
