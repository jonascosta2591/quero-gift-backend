const userModel = require('../models/models');
const {validarEmail} = require('../utils/validarEmail');

const login = async (request, response) => {
  try{
    const loginAccount = await userModel.login(request.body);
    
    return response.status(200).json(loginAccount);

  }catch(err){
    return response.status(500).json({msg: 'email ou senha incorretos'});
  }
};

const register = async (request, response) => {
  try{
    // let email = request.body.email;
    const {email, password, username, full_name} = request.body;

    if(email === '' || password === '' || username === '' || full_name === '' ){
      return response.status(422).json({msg: 'campos invalidos'});
    }

    if(validarEmail(email)){
      const createAccount = await userModel.register(request.body);
    
      return response.status(201).json(createAccount);
    }else{
      return response.status(201).json({msg: 'email invalido'});
    }
  }catch(err){
    return response.status(500).json(err);
  }
};

module.exports = {
  register,
  login
};