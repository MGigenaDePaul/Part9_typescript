/*The BMI is defined as the body mass divided by the square of the body height, 
and is expressed in units of kg/m2, resulting from mass in kilograms (kg) and height in metres (m).

In this case we have to represent the height in cm. So the formula is 
BMI = (mass(kg) * 10000) / (height(cm))^2
*/

interface BMI {
    height: number;
    mass: number;
}

const parseArguments = (args: string[]): BMI => {
    if (args.length < 4) throw new Error('Not enough arguments')  // got confused with length and position, that's why it threw error
    if (args.length > 4) throw new Error('Too many arguments')
    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        
        return {
            height: Number(args[2]),
            mass: Number(args[3])
        }
    } else {
        console.log(Number(args[3]))
        throw new Error ('The values you provided were not numbers')
    }
}

const calculateBmi = (heightCm: number, massKg: number) => {
    const BMI = (massKg * 10000) / (heightCm * heightCm);
    let message;

    if (BMI <= 18.5) { 
        message = 'UNDER WEIGHT';
    }
    if (BMI > 18.5 && BMI <= 25) {
        message = 'NORMAL RANGE';
    }
    if (BMI > 25 && BMI < 30) {
        message = 'OVER WEIGHT';
    };
    if (BMI >= 30 && BMI < 35) {
        message = 'OBESE';
    };
    if (BMI >= 35) {
        message = 'EXTREMELY OBESE';
    };

    console.log(message)
}

console.log(process.argv[3])

try {
    const {height, mass} = parseArguments(process.argv)
    calculateBmi(height, mass)
} catch (error) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}