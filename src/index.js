const hashHelper = require('./helpers/hash.helper');

const method = process.argv[2] ? process.argv[2].toLowerCase() : '';
const password = process.argv[3] || 'myV3ryS3c5r3P4ssw0rd';

//Using async:
const usingAsync = async (pass) => {
  try {
    const hashed = await hashHelper.hashPassword(pass);
    const valid = await hashHelper.isPasswordCorrect(pass,hashed);
    printHash(hashed);
    printHashValidation(valid);
    printTime();
  } catch(error) {
    printError(error);
  }
}

// Using then:
const usingThen = (pass) => {
  hashHelper.hashPassword(pass)
    .then((hashed) => {
      printHash(hashed);
      return hashHelper.isPasswordCorrect(pass, hashed);
    })
    .then((valid) => {
      printHashValidation(valid);
      printTime();
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
    hashHelper.isPasswordCorrect(pass, hashed, (err, valid) => {
      if(err) {
        return printError(err);
      }
      printHashValidation(valid);
      printTime();
    });
  });
}

//Auxiliar methods

const printHash = (result) => {
  console.log(`El método usado es: ${method}`);
  console.log(`El password introducido es: ${password}`);
  console.log(`El hash generado es: ${result}`);
}

const printError = (error) => {
  console.log(`Hubo un error al procesar la solicitud:`);
  console.log(error.message);
}

const printHashValidation = (valid) => {
  console.log(`¿El password introducido es válido? ${valid}`);
}

const printTime = () => {
  const end_time = new Date(Date.now()).getTime();
  console.log(`El tiempo empleado fue: ${(end_time - start_time) / 1000} segundos`);
}

const start_time = new Date(Date.now()).getTime();

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
