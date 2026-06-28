interface exercisesResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyExerciseHours: number[], target: number): exercisesResult => {

  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter(h => h > 0).length;
  const sumHours: number = dailyExerciseHours.reduce((ac, cur) => ac + cur)
  const average: number = sumHours / periodLength;
  const success: boolean = average > target;
  let ratingDescription: string;
  let rating: number;

  if (success) {
    rating = 3
    ratingDescription = "too good";
  } else if (average >= (target * 0.75)) {
    rating = 2
    ratingDescription = "not too bad but could be better";
  } else if (average >= (target * 0.5)) {
    rating = 1
    ratingDescription = "could be better";
  } else {
    rating = 0
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));