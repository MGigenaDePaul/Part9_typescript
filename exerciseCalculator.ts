/*Write a function calculateExercises that calculates the average time of daily exercise hours, 
compares it to the target amount of daily hours 
and returns an object that includes the following values: 

the number of days
the number of training days
the original target value
the calculated average time
boolean value describing if the target was reached
a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
a text value explaining the rating, you can come up with the explanations
*/

/*
interface Values {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number; 
    ratingDescription: string;
    target: number;
    average: number;
}

function calculateExercises(array: number[], target: number): Values {
    // initialize
    const amountOfDays = array.length;
    console.log('amount of days:', amountOfDays);
    let countHours = 0;
    let average = 0;
    let trainingDays = 0;
    let success;
    let ratingDescription;
    let rating;

    // iterate over the array
    for (let i = 0; i < amountOfDays; i++) {
        if (array[i] > 0) {
            countHours = countHours + array[i];
            trainingDays = trainingDays + 1;
        }
    }

    average = countHours / amountOfDays;
    console.log('average:', average);

    // see if we reach the target
    if (average < target) {
        success = false;
        ratingDescription = 'Not too bad but could be better';
        rating = 2;
    } 
    if (average === target) {
        success = true;
        ratingDescription = 'You reached the target';
        rating = 3;
    }
    if (average > target) {
        success = true;
        ratingDescription = 'You did amazing';
        rating = 4;
    }
    const result = {
        periodLength: amountOfDays,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }

    console.log(result)
    return result 
}

calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)

*/

interface Values {
    target: number;
    periodLength: number[]
}

// arg 0 starts from 'run'
const parseTheArguments = (args: string[]): Values => {
    if (args.length < 4) throw new Error ('Not enough arguments')
    
    const arrayOfNumbers = []
    // iterate from position 3, that is after the target
    for (let i = 3; i < args.length; i++) {
        arrayOfNumbers.push(Number(args[i]))
    }

    console.log('array of numbers:', arrayOfNumbers)

    if (!isNaN(Number(args[2]))) {
        return {
            target: Number(args[2]),
            periodLength: arrayOfNumbers
        }
    }
}

const calculateExercises = (target: number, array: number[]) => {
    let countHours = 0;
    let average = 0;
    let trainingDays = 0;
    let success;
    let ratingDescription;
    let rating;

    console.log('DALE ARRAY LENGTH', array.length)

    for (let i = 0; i < array.length; i++) { 
        countHours = countHours + array[i];
        if (array[i] > 0) {
            trainingDays = trainingDays + 1;
        }
    }

    average = countHours / array.length;
    console.log('average', average)
    
    // see if we reach the target
    if (average < target) {
        success = false;
        ratingDescription = 'Not too bad but could be better';
        rating = 2;
    } 
    if (average === target) {
        success = true;
        ratingDescription = 'You reached the target';
        rating = 3;
    }
    if (average > target) {
        success = true;
        ratingDescription = 'You did amazing';
        rating = 4;
    }

    const result = {
        periodLength: array.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }

    console.log(result)
}

console.log('TARGET', process.argv[2])

try {
    const {target, periodLength} = parseTheArguments(process.argv)
    console.log('length of array:', periodLength)
    calculateExercises(target, periodLength)
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
