import $display = Deno.jupyter.$display;

export default function run(input: string) {
  let result = 0;
  let lastResult = -1;

  const operators = {
    "*": (a, b) => a * b,
    "+": (a, b) => a + b,
  };

  let lines = input.split("\n");

  const lastLine = lines[lines.length - 1];

  const maxLineLength = Math.max(...lines.map(s=>s.length))
  const nonSpaceIndexes: number[] = [];
  for (let i = 0; i < lastLine.length; i++) {
    if (lastLine.charAt(i) !== " ") nonSpaceIndexes.push(i);
  }

  nonSpaceIndexes.push(maxLineLength+1);

  let columnsArray;
  lines.forEach((line) => {
    if (!columnsArray) {
      columnsArray = Array.from({ length: nonSpaceIndexes.length-1 }, (e) => Array(0));
    }
    for (let i = 0; i < nonSpaceIndexes.length-1; i++) {
        columnsArray[i].push(line.slice(nonSpaceIndexes[i], nonSpaceIndexes[i+1]-1));
    }
  });

  columnsArray.forEach((colum: string[]) => {
    const operation = operators[colum.pop().trim()];
    const maxLenght = Math.max(...colum.map((s) => s.length));
    const numbers = Array.from({ length: maxLenght }, (e) => "");
      colum.forEach((cell) => {
      // for (let i = cell.length - 1; i >= 0; i--) {
      for (let i = 0; i < cell.length; i++) {
        const char = cell.charAt(i);
        if (char !== " ") numbers[i] += char;
      }
    });
    console.log("Colum: ", colum);
    console.log("numbers: ", numbers);
    const first = Number(numbers.pop())
    result += numbers.map((a) => Number(a)).reduce(operation, first);
  });
  return "Final Result: " + result;
}
