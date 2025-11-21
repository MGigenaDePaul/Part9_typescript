# How to run the App

First install dependencies with npm install

### CalculateBmi
To run the bmiCalculator.ts you should put in the command line 
```npm run calculateBmi 180 72``` 
(you should see this result) 
72
NORMAL RANGE

Also you can run it like this
```npm run dev calculateBmi 180 72```
if you go to http://localhost:3003/bmi?height=180&weight=72 you should see the following result

{
  "weight": "72",
  "height": "180",
  "bmi": "NORMAL RANGE"
}

### ExerciseCalculator
To run the exerciseCalculator.ts you should put in the command line
```npm run calculateExercises 2 1 2 3```    
In this case, the arg[0] starts in run, arg[2] is the target and the followings are the numbers of the array


Also if you you run the exerciseCalculator like this
```npm run calculateExercises 2 1 2 3``` 
it should appear
{
  periodLength: 3,
  trainingDays: 3,
  success: true,
  rating: 2,
  ratingDescription: 'You reached the target',
  target: 2,
  average: 2
}

if you make a POST to http://localhost:3003/exercises 
with the following info
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}

you should see the following result
{
    "periodLength": 7,
    "trainingDays": 4,
    "success": false,
    "rating": 1,
    "ratingDescription": "bad",
    "target": 2.5,
    "average": 1.2142857142857142
}

