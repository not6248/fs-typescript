interface exercisesResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Values {
  target: number;
  dailyExerciseHours: number[];
}

const parseArgumentsExercises = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (isNaN(Number(args[2]))) throw new Error('Provided values were not numbers!');

  const dailyExerciseHours: number[] = [];

  for (let idx = 3; idx < args.length; idx++) {
    const element = args[idx];

    if (isNaN(Number(element)))
      throw new Error('Provided values were not numbers! 2');

    dailyExerciseHours.push(Number(element));
  }


  return {
    target: Number(args[2]),
    dailyExerciseHours: dailyExerciseHours
  };
};

const calculateExercises = (dailyExerciseHours: number[], target: number): exercisesResult => {

  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter(h => h > 0).length;
  const sumHours: number = dailyExerciseHours.reduce((ac, cur) => ac + cur);
  const average: number = sumHours / periodLength;
  const success: boolean = average > target;
  let ratingDescription: string;
  let rating: number;

  if (success) {
    rating = 3;
    ratingDescription = "too good";
  } else if (average >= (target * 0.75)) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else if (average >= (target * 0.5)) {
    rating = 1;
    ratingDescription = "could be better";
  } else {
    rating = 0;
    ratingDescription = "too bad";
  }


  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

try {
  const { target, dailyExerciseHours } = parseArgumentsExercises(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}