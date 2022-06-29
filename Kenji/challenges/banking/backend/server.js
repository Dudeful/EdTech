import express from 'express';
import accounts from './controllers/accounts.js';
import registerDeposit from './controllers/register-deposit.js';
import registerTransfer from './controllers/register-transfer.js';
import registerUser from './controllers/register-user.js';
import registerWithdraw from './controllers/register-withdraw.js';
import statements from './controllers/statements.js';
import transactions from './controllers/transactions.js';
import users from './controllers/users.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());

app.use('/accounts', accounts);
app.use('/register-deposit', registerDeposit);
app.use('/register-transfer', registerTransfer);
app.use('/register-user', registerUser);
app.use('/register-withdraw', registerWithdraw);
app.use('/statements', statements);
app.use('/transactions', transactions);
app.use('/users', users);

app.listen(port, () => console.log(`Server started on port ${port}`));
