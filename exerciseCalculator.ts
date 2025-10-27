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


/* THIS IS THE FIRST VERSION, I DID A MESS, but it's useful the structure

// I don't count ratingDescription, success, average as args yet

    // initialize
    let countHours = 0 // hours of exercise
    res.trainingDays = 0  // training day count 
    res.periodLength.length = 0 // array length is zero

    // iterate over the array 
    for (let i = 0; i < res.periodLength.length; i++) {
        res.periodLength.length = res.periodLength.length + 1 

        if (res.periodLength[i] > 0) { 
            countHours = countHours + res.periodLength[i]
            res.trainingDays = res.trainingDays + 1
        } 
    }
    // reached target?    
    res.target = target 

    if (res.average < res.target) {
        res.success = false
        res.ratingDescription = "Not too bad but could be better"
        res.rating = 2
    }

    if (res.average === res.target) {
        res.success = true 
        res.ratingDescription = "You reached the target"
        res.rating = 3
    }

    if (res.average > res.target) {
        res.success = true
        res.ratingDescription = "You did amazing"
        res.rating = 4
    }

    // average 
    res.average = countHours / res.periodLength.length

    console.log(res)
    return res
*/