export default function run(input: string) {
  let result = 0;
  let lastResult = -1;

  let tiles: number[][] = input.split("\n").map((s) =>
    s.split(",").map((n) => Number(n))
  );

  let edges: Edge[] = [];

  for (let i = 0; i < tiles.length; i++) {
    edges.push({
      p1: tiles[i],
      p2: tiles[i + 1] || tiles[0],
    });
  }


  const rectangles: Rectanlge[] = [];

  let largestFeasableRectangle: Rectanlge = {
    p1: 0,
    p2: 0,
    area: 0,
  };

  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      const rectangle = {
        p1: [tiles[i][0], tiles[i][1]],
        p2: [tiles[j][0], tiles[j][1]],
        area: calculateRectangleArea(
          [tiles[i][0], tiles[i][1]],
          [tiles[j][0], tiles[j][1]],
        ),
      };

      if (
        rectangle.area > largestFeasableRectangle.area &&
        isRectangleFeasable(rectangle, tiles, edges)
      ) {
        largestFeasableRectangle = rectangle;
        rectangles.push(rectangle);
      }
    }
  }

  rectangles.sort((a, b) => b.area - a.area);
  // console.log(rectangles[0]);
  console.log(rectangles);

  return "Final Result: " + rectangles[0].area;
}

type Rectanlge = {
  p1: number[];
  p2: number[];
  area: number;
};

type Edge = {
  p1: number[];
  p2: number[];
};

function isRectangleFeasable(
  rectangle: Rectanlge,
  tiles: number[][],
  edges?: Edge[],
) {
  for (const tile of tiles) {
    if (isPointInRectangle(tile, rectangle)) {
      return false;
    }
  }
  for (const edge of edges) {
    for (
      let x = Math.min(edge.p1[0], edge.p2[0]);
      x <= Math.max(edge.p1[0], edge.p2[0]);
      x++
    ) {
      for (
        let y = Math.min(edge.p1[1], edge.p2[1]);
        y <= Math.max(edge.p1[1], edge.p2[1]);
        y++
      ) {
        if (isPointInRectangle([ x, y ], rectangle)) {
          return false;
        }
      }
    }
  }

  return true;
}

function isPointInRectangle(point: number[], rectangle: Rectanlge) {
  return (point[0] > Math.min(rectangle.p1[0], rectangle.p2[0]) &&
    point[0] < Math.max(rectangle.p1[0], rectangle.p2[0]) &&
    point[1] > Math.min(rectangle.p1[1], rectangle.p2[1]) &&
    point[1] < Math.max(rectangle.p1[1], rectangle.p2[1]));
}

function calculateRectangleArea(p1: number[], p2: number[]) {
  const width = Math.abs(p2[0] - p1[0]) + 1;
  const height = Math.abs(p2[1] - p1[1]) + 1;
  return width * height;
}
