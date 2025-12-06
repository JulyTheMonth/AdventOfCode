import $display = Deno.jupyter.$display;

export default function run(input: string) {
  let result = 0;
  let lastResult = -1;

  let lines = input.split("\n");

  const emptyLineIndex = lines.indexOf("");

  let ranges = lines.slice(0, emptyLineIndex);

  ranges = ranges.map((range) => range.split("-").map(s=>Number(s))).sort((a, b) =>
    Number(a[0]) - Number(b[0])
  );

  let mergedRanges: string[][] = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
      const currentRange = ranges[i];
      const lastRange = mergedRanges[mergedRanges.length-1];

      if (currentRange[0] <= lastRange[1]){
          lastRange[1] = Math.max(lastRange[1], currentRange[1]);
      } else {
        mergedRanges.push(currentRange);
      }

  }

  mergedRanges.forEach(range =>{
      result += Number(range[1]) + 1 - Number(range[0]);
  })

  return "Final Result: " + result;
}
