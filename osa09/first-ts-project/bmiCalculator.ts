export const calculateBmi = (height: number, weight: number): string => {
  height = height * 0.01;
  const bmi: number = weight / Math.pow(height, 2);

  if (bmi > 24.9) { return 'Overweight'; }
  if (bmi < 18.5) { return 'Underweight'; }
  return 'Normal (healthy weight)';
}
