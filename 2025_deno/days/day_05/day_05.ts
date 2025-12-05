export default function run(input: string) {
  let result = 0;
  let lastResult = -1;

  let lines = input.split("\n");

  const emptyLineIndex = lines.indexOf("");

  let ranges = lines.slice(0 , emptyLineIndex);
  let ids = lines.slice(emptyLineIndex + 1);

  const validIds = ids.filter(id => ranges.find(range => {
    const [_, minStr, maxStr] = /(\d+)-(\d+)/.exec(range)!;
    return Number(id) <= Number(maxStr) && Number(id) >= Number(minStr);
  }));

  return "Final Result: " + validIds.length;
}
