export default function run(input: string) {
  let result = 0;
  let lastResult = -1;

  let tiles: number[][] = input.split("\n").map((s) =>
    s.split(",").map((n) => Number(n))
  );

  const rectangles: Rectanlge[] = [];

  for (let i = 0; i < tiles.length; i++) {
    for (let j = i; j < tiles.length; j++) {
      rectangles.push({
        p1: [tiles[i][0], tiles[i][1]],
        p2: [tiles[j][0], tiles[j][1]],
        area: calculateRectangleArea(
          [tiles[i][0], tiles[i][1]],
          [tiles[j][0], tiles[j][1]],
        ),
      });
    }
  }

  rectangles.sort((a,b)=> b.area - a.area);
  console.log(rectangles[0]);
  console.log(rectangles);

  return "Final Result: " + rectangles[0].area;
}

type Rectanlge = {
  p1: number[];
  p2: number[];
  area: number;
};

function calculateRectangleArea(p1: number[], p2: number[]) {
  const width = Math.abs(p2[0] - p1[0])+1;
  const height = Math.abs(p2[1] - p1[1])+1;
  return width * height;
}
