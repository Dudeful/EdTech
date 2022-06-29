import crypto from 'crypto';
import pg from 'pg';
const { Client } = pg;

const newDeposit = async (data) => {
  const client = new Client();
  await client.connect();

  try {
    const selectDestinationQuery = `
      SELECT *
      FROM public.accounts
      WHERE account_number = $1 AND branch = $2
    `;
    const destinationResult = await client.query(selectDestinationQuery, [
      data.destination.account,
      data.destination.branch,
    ]);
    const destinationAccount = destinationResult.rows[0];

    if (!destinationAccount) {
      throw new Error("we couldn't find the account");
    }

    const updateDestinationQuery = `
      UPDATE public.accounts 
      SET balance = $1 
      WHERE account_number = $2 AND branch = $3
    `;
    const updateDestinationResult = await client.query(updateDestinationQuery, [
      Number(destinationAccount.balance) + Number(data.amount) * 0.99,
      data.destination.account,
      data.destination.branch,
    ]);

    // CREATE TRANSACTION RECORD
    const transactionID = crypto.randomUUID();
    const insertTransaction = `
      INSERT INTO public.transactions 
      (id, amount, type, external, credit_part, debit_part)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const transactionData = [
      transactionID,
      Number(data.amount),
      'deposit',
      true,
      destinationAccount.client_id,
      null,
    ];
    await client.query(insertTransaction, transactionData);

    return {
      status: 'success',
      data: {
        transactionID,
        amount: Number(data.amount) * 0.99,
        fee: Number(data.amount) * 0.01,
      },
    };
  } catch (error) {
    await client.query('ROLLBACK');
    return { error: true, error };
  } finally {
    await client.end();
  }
};

export default newDeposit;
