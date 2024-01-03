const connection = require('./connection');
const jwt = require('jsonwebtoken');
var md5 = require('md5');
const { v4: uuidv4 } = require('uuid');

const login = async (account_data) => {
  const {email, password} = account_data;

  const passwordHash = md5(password);

  const [account] = await connection.execute('SELECT * FROM users WHERE email = ? and password = ?', [email, passwordHash]);

  const uuid = account[0].uuid;

  const payload = {
    usuarioUuid: uuid,
  };
  // Chave secreta para assinar o token
  const chaveSecreta = process.env.SECRET;

  const token = jwt.sign(payload, chaveSecreta);

  return {token: token, uuid};
}

const createWallet = async (uuid) => {
  const query = 'INSERT INTO wallets (balance, balance_pending, user_uuid) VALUES(?, ?, ?)';

  await connection.execute(query, ['0', '0', uuid]);
};

const register = async (account_data) => {
  const {email, password, username, full_name} = account_data;

  const dateUTC = new Date(Date.now()).toUTCString();
  const uuid = uuidv4();

  const passwordHash = md5(password); //MD5
  
  const query = 'INSERT INTO users(username, full_name, email, password, account_privilege, date, uuid) VALUES(?, ?, ?, ?, ?, ?, ?)';

  const [createLogin] = await connection.execute(query, [username, full_name, email, passwordHash, 'new', dateUTC, uuid]);
  await createWallet(uuid);

  return {insertId: createLogin.insertId};
};

const addProduct = async (product) => {
  const { title } = product;
  
  const dateUTC = new Date(Date.now()).toUTCString();

  const query = 'INSERT INTO products(product_name, product_price, users_id, uuid, date) VALUES(?, ?, ?, ?, ?)';
  
  const token = localStorage.getItem('js_token');

  const [createdTask] = await connection.execute(query, ['', '', '', uuidv4(), dateUTC]);

  return {insertId: createdTask.insertId};
};

module.exports = {
  addProduct,
  register,
  login
};