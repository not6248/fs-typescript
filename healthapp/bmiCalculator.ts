const calculateBmi = (heightCm: number, mass: number): string => {
  const heightm: number = heightCm / 100;
  const BMI: number = mass / (heightm ** 2);
  const BMIFixed2: number = Number(BMI.toFixed(2));

  let categoryMessage: string = "";

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

  return categoryMessage
};

console.log(calculateBmi(180, 74));