interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length !== 4) {
    throw new Error('Please provide 2 values: height and weight');
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  }
  
  throw new Error('Provided values were not numbers!');
}

const calculateBmi = (height: number, weight: number): string => {
  height = height * 0.01;
  const bmi: number = weight / Math.pow(height, 2);

  if (bmi > 24.9) { return 'Overweight'; }
  if (bmi < 18.5) { return 'Underweight'; }
  return 'Normal (healthy weight)';
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}