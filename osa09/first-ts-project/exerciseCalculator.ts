interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  data: Array<number>;
  target: number;
}

export const parseArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) {
    throw new Error('Please provide traget value and daily exercise data');
  }

  if (isNaN(Number(args[2]))) {
    throw new Error('Provided values were not numbers!');
  }

  const target = Number(args[2]);
  const data: Array<number> = args.slice(3).map(value => Number(value));

  if (data.includes(NaN)) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    data,
    target
  };
};

export const calculateExercise = (values: ExerciseValues): Result => {

  const periodLength: number = values.data.length;
  const trainingDays: number = values.data.filter(value => value > 0).length;
  const totalExerciseHouse: number = values.data.reduce((previous, current) => previous + current);
  const average: number = totalExerciseHouse / periodLength;
  const success: boolean = average >= values.target;
  const rating: number = Math.min(Math.round((average / values.target) * 2) + 1, 3);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: generateRatingDescription(rating),
    target: values.target,
    average
  };

};

const generateRatingDescription = (rating: number): string => {
  switch (rating) {
  case 3: return 'excellent work!';
  case 2: return 'not too bad but could be better';
  default: return 'try harder next time!';
  }
};