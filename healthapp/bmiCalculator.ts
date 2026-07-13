interface BmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (heightCm: number, mass: number): string => {
  const heightm: number = heightCm / 100;
  const BMI: number = mass / (heightm ** 2);
  const BMIFixed2: number = Number(BMI.toFixed(2));

  let categoryMessage: string;

  if (BMIFixed2 >= 40.0) {
    categoryMessage = "Obese (Class III)";
  } else if (BMIFixed2 >= 35.0) {
    categoryMessage = "Obese (Class II)";
  } else if (BMIFixed2 >= 30.0) {
    categoryMessage = "Obese (Class I)";
  } else if (BMIFixed2 >= 25.0) {
    categoryMessage = "Overweight (Pre-obese)";
  } else if (BMIFixed2 >= 18.5) {
    categoryMessage = "Normal range";
  } else if (BMIFixed2 >= 17.0) {
    categoryMessage = "Underweight (Mild thinness)";
  } else if (BMIFixed2 >= 16.0) {
    categoryMessage = "Underweight (Moderate thinness)";
  } else {
    categoryMessage = "Underweight (Severe thinness)";
  };

  return categoryMessage;
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;