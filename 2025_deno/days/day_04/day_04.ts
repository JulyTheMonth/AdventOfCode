export default function run(input: string) {
  let result = 0;
  let lastResult = -1;

  let fields = input.split("\n").map((line) => [".", ...line.split(""), "."]);

  const emptyLine = new Array(fields[0].length).fill(".");
  fields.unshift(emptyLine);
  fields.push(emptyLine);

  while (result !== lastResult) {
    lastResult = result;
    for (let row = 1; row < fields.length - 1; row++) {
      for (let col = 1; col < fields[row].length - 1; col++) {
        if (fields[row][col] === "@") {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
              if (fields[row + i][col + j] === ".") count++;
            }
          }
          if (count > 4) {
            result++;
            fields[row][col] = "X";
          }
        }
      }
    }
    fields = fields.map(fieldsLine => fieldsLine.map(cell => {
      if (cell === "X") return ".";
      return cell;
    }));
  }
  fields.forEach((field, i) => {
      console.log(field.join(""));})
  return "Final Result: " + result;
}
