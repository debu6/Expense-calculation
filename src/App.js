import { Button, Card, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './App.css';
import { addExpense, addIncome, deleteExpense } from './slices/expenseSlice';

function App() {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.calculation.balance);
  const income = useSelector((state) => state.calculation.income);
  const expenses = useSelector((state) => state.calculation.expenses);

  const expenseDescriptionHandler = (value) => {
    const temp = {
      description: value,
      amount: expenses.amount,
    };
    dispatch(addExpense(temp));
  };

  const expenseAmountHandler = (value) => {
    if (parseInt(value) > parseInt(income)) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cannot spend more than your income',
      });
    }
    if (value == 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Amount cannot be 0',
      });
    }
    const temp = {
      description: expenses.description,
      amount: value,
    };
    dispatch(addExpense(temp));
  };

  const deleteHandler = () => {
    dispatch(deleteExpense({}));
  };

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        with: '100%',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4>Total Income: {income}</h4>
        <h4>Balance: {parseInt(income) - parseInt(expenses.amount) || 0}</h4>

        <Card sx={{ p: 3, bgcolor: 'lightblue', m: 2, minWidth: 345 }}>
          <h4> Expenses</h4>
          <h5> Description:{expenses.description}</h5>
          <h5>Amount:{expenses.amount}</h5>
          <Button
            variant="contained"
            onClick={() => {
              deleteHandler();
            }}
            disabled={expenses.amount == 0 || expenses.amount == undefined}
          >
            Delete
          </Button>
        </Card>
      </div>

      <Card sx={{ minWidth: 345, p: 3, bgcolor: 'lightblue', m: 2, opacity: 0.9 }}>
        <Input
          placeholder="Enter income"
          type="number"
          onChange={(e) => dispatch(addIncome(e.target.value))}
        />
        {income > 0 && (
          <Card sx={{ p: 3, bgcolor: 'lightblue', m: 2 }}>
            <h4>Expenses</h4>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Input
                value={expenses.description}
                type="text"
                placeholder="Enter expenses description"
                onChange={(e) => expenseDescriptionHandler(e.target.value)}
              />

              <Input
                value={expenses.amount}
                type="number"
                placeholder="Enter expenses amount"
                onChange={(e) => expenseAmountHandler(e.target.value)}
              />
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}

export default App;
