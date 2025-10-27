/*The BMI is defined as the body mass divided by the square of the body height, 
and is expressed in units of kg/m2, resulting from mass in kilograms (kg) and height in metres (m).

In this case we have to represent the height in cm. So the formula is 
BMI = (mass(kg) * 10000) / (height(cm))^2
*/


const calculateBmi = (height: number, mass: number):string => {
    const BMI = (mass * 10000) / (height * height);
    console.log('BMI:', BMI);

    if (BMI <= 18.5) return 'UNDER WEIGHT';
    if (BMI > 18.5 && BMI <= 25) return 'NORMAL RANGE';
    if (BMI > 25 && BMI < 30) return 'OVER WEIGHT';
    if (BMI >= 30 && BMI < 35) return 'OBESE';
    if (BMI >= 35) return 'EXTREMELY OBESE';
}

console.log(calculateBmi(180, 74)) // NORMAL RANGE
