import crypto from 'crypto';
import pg from 'pg';
import checkDigit from '../utils/check-digit.js';
const { Client } = pg;

const newUser = async (data) => {
  const client = new Client();
  await client.connect();

  try {
    const querySelect = `SELECT * FROM public.clients WHERE cpf=$1`;
    const resultsSelect = await client.query(querySelect, [data.cpf]);

    const user = resultsSelect.rows[0];

    if (user) {
      throw new Error('this user cpf is already registered!');
    }

    // created_at/deleted/balance automatically being set on creation e.g.:
    // ALTER TABLE public.clients ADD COLUMN created_at TIMESTAMP DEFAULT NOW()

    // CREATE USER
    const userID = crypto.randomUUID();
    const insertUser = `
      INSERT INTO public.clients (id, name, cpf, email, birthdate) 
      VALUES ($1, $2, $3, $4, $5)
    `;
    const userData = [userID, data.name, data.cpf, data.email, data.birthdate];
    await client.query(insertUser, userData);

    // CREATE ACCOUNT
    const accountID = crypto.randomUUID();
    const branch = '0001';
    const rand = String(crypto.randomInt(11111111, 99999999));
    const accountNum = `${rand}-${checkDigit.account(rand)}`;
    const insertAccount = `
      INSERT INTO public.accounts (id, client_id, branch, account_number) 
      VALUES ($1, $2, $3, $4)
    `;
    const accountData = [accountID, userID, branch, accountNum];
    await client.query(insertAccount, accountData);

    return {
      status: 'success',
      data: {
        name: data.name,
        email: data.email,
        birthdate: data.birthdate,
      },
    };
  } catch (error) {
    await client.query('ROLLBACK');
    return { error: true, error };
  } finally {
    await client.end();
  }
};

export default newUser;
