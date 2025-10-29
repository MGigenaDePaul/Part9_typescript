interface Values {
    target: number;
    periodLength: number[];
};

// arg 0 starts from 'run'
const parseTheArguments = (args: string[]): Values => {
    if (args.length < 4) throw new Error ('Not enough arguments');
    
    const arrayOfNumbers = [];
    // iterate from position 3, that is after the target
    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) throw new Error (`"${args[i]}" is not a number, provide a number`);
        arrayOfNumbers.push(Number(args[i]));
    }

    console.log('array of numbers:', arrayOfNumbers);

    if (isNaN(Number(args[2]))) {
        throw new Error (`"${args[2]}" is not a number, provide a number`);
    };

    return {
        target: Number(args[2]),
        periodLength: arrayOfNumbers
    };
};

export const calculateExercises = (array: number[], target: number) => {
    let countHours = 0;
    let average = 0;
    let trainingDays = 0;
    let success;
    let ratingDescription;
    let rating;

    console.log('ARRAY LENGTH:', array.length);

    for (let i = 0; i < array.length; i++) { 
        countHours = countHours + array[i];
        if (array[i] > 0) {
            trainingDays = trainingDays + 1;
        }
    }

    average = countHours / array.length;
    console.log('average', average);
    
    // see if we reach the target
    if (average < target) {
        success = false;
        ratingDescription = 'bad';
        rating = 1;
    };
    if (average === target) {
        success = true;
        ratingDescription = 'You reached the target';
        rating = 2;
    };
    if (average > target) {
        success = true;
        ratingDescription = 'You did amazing';
        rating = 3;
    };

    const result = {
        periodLength: array.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };

    console.log(result);
    return result;
};

if (require.main === module) {
    try {
        console.log('TARGET', process.argv[2]);
        const {periodLength, target} = parseTheArguments(process.argv);
        calculateExercises(periodLength, target);
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}

