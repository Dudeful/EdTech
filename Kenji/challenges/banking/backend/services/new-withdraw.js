import crypto from 'crypto';
import pg from 'pg';
const { Client } = pg;

const newWithdraw = async (data) => {
  const client = new Client();
  await client.connect();

  try {
    const selectOriginQuery = `
      SELECT *
      FROM public.accounts
      WHERE account_number = $1 AND branch = $2
    `;
    const originResult = await client.query(selectOriginQuery, [
      data.origin.account,
      data.origin.branch,
    ]);
    const originAccount = originResult.rows[0];

    if (!originAccount) {
      throw new Error("we couldn't find the account");
    }

    if (originAccount.balance < Number(data.amount) + 4) {
      throw new Error('insufficient balance');
    }

    const updateOriginQuery = `
      UPDATE public.accounts 
      SET balance = $1 
      WHERE account_number = $2 AND branch = $3
    `;
    const updateOriginResult = await client.query(updateOriginQuery, [
      Number(originAccount.balance) - Number(data.amount) - 4,
      data.origin.account,
      data.origin.branch,
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
      Number(data.amount) + 4,
      'withdraw',
      false,
      null,
      originAccount.client_id,
    ];
    await client.query(insertTransaction, transactionData);

    return {
      status: 'success',
      data: {
        transactionID,
        amount: Number(data.amount),
        fee: 4,
      },
    };
  } catch (error) {
    await client.query('ROLLBACK');
    return { error: true, error };
  } finally {
    await client.end();
  }
};

export default newWithdraw;
