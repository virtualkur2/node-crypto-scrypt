const hashHelper = require('./helpers/hash.helper');

const password = process.argv[2] ? process.argv[2] : 'myV3ryS3c5r3P4ssw0rd';
const method = process.argv[3] ? process.argv[3].toLowerCase() : 'async';

//Using async:
const usingAsync = async (pass) => {
  try {
    const hashed = await hashHelper.hashPassword(pass);
    printHash(hashed);
  } catch(error) {
    printError(error);
  }
}

// Using then:
const usingThen = (pass, method) => {
  hashHelper.hashPassword(pass)
    .then((hashed) => {
      printHash(hashed);
    })
    .catch((error) => {
      printError(error);
    });
}

//Using callback:

const usingCallback = (pass) => {
  hashHelper.hashPassword(pass, (err, hashed) => {
    if(err) {
      return printError(error);
    }
    printHash(hashed);
  });
}

const printHash = (result) => {
  console.log(`El método usado es: ${method}`);
  console.log(`El password introducido es: ${password}`);
  console.log(`El hash generado es: ${result}`);
}

const printError = (error) => {
  console.log(`Hubo un error al procesar la solicitud:`);
  console.log(error.message);
}

switch (method) {
  case 'async':
    usingAsync(password);
    break;
  case 'then':
  usingThen(password);
    break;
  case 'callback':
    usingCallback(password);
    break;
  default:
    usingAsync(password);
    break;
}
