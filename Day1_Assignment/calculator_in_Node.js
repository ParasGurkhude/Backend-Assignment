//  import the modules
const { argv } = require('node:process');
const { randomBytes } = require('node:crypto');

const argvs = argv.slice(2)

//  get a commands using process.argv
const operation = argvs[0]   // Condition --> add, sub, milt, divd, sin, cos, tan,
const operator1 = Number(argvs[1])  // convert into Number
const operator2 = Number(argvs[2])  // convert into Number

function randomNumber (length) {
    const number = randomBytes(length, (err, buff) => {
        if(err) {
            console.log(err);
        }else{
            console.log(buff.toString('binary'));
        }
    })
}

switch (operation) {
    case 'add':
        console.log(`Result: ${operator1 + operator2}`);
        break;
    case 'sub':
        console.log(`Result: ${operator1 - operator2}`);
        break;
    case 'mult':
        console.log(`Result: ${operator1 * operator2}`);
        break;
    case 'divide':
        if (operator2 !== 0) {
            console.log(`Result: ${operator1 / operator2}`);
        } else {
            console.log("Error: Division by zero");
        }
        break;
    case 'sin':
        console.log(`Result: ${Math.sin(operator1)}`);
        break;
    case 'cos':
        console.log(`Result: ${Math.cos(operator1)}`);
        break;
    case 'tan':
        console.log(`Result: ${Math.tan(operator1)}`);
        break;
    case 'random':
        const length = operator1
        randomNumber(length)
        break;
    default:
        console.log("Invalid operation");
}