function validarEmail(email) {
  // Expressão regular para validar endereço de e-mail
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Testar se o e-mail corresponde à expressão regular
  return regexEmail.test(email);
}

module.exports = {
    validarEmail
}