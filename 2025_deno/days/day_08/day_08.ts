export default function run(input: string) {
  let result = 0;
  let lastResult = -1;

  let vectors: number[][] = input.split("\n").map((s) =>
    s.split(",").map((n) => Number(n))
  );

  console.log(vectors);

  const maxConnections = 10;
  const sortedPairs: Array<VectorPair> = new Array();
  let largestPair: VectorPair = {
    v1: [0, 0, 0],
    v2: [0, 0, 0],
    length: Number.MAX_SAFE_INTEGER,
  };

  for (let i = 0; i < vectors.length; i++) {
    for (let j = i + 1; j < vectors.length; j++) {
      const distance = vDist(vectors[i], vectors[j]);
      const vectorPair = {
        v1: vectors[i],
        v2: vectors[j],
        length: distance,
      };
      sortedPairs.push(vectorPair);
    }
  }
  sortedPairs.sort((a, b) => a.length - b.length);

  const amountOfPairs = 1000;

  const trees: Set<VectorTree> = new Set<VectorTree>();

  for (let i = 0; i < amountOfPairs; i++) {
    const vectorPair = sortedPairs[i];
    const foundEntries = [...trees].filter((entre) =>
      entre.vectors.has(vectorPair.v1) ||
      entre.vectors.has(vectorPair.v2)
    );

    if (foundEntries.length === 0){
        const vecTree: VectorTree = {
            vectors: new Set([vectorPair.v1, vectorPair.v2]),
            vectorPairs: new Set([vectorPair]),
        }
        trees.add(vecTree);
    } else if (foundEntries.length === 1){
        const vecTree = foundEntries[0];
        if(vecTree.vectors.has(vectorPair.v1) && vecTree.vectors.has(vectorPair.v2)) continue;
        vecTree.vectors = vecTree.vectors.union(new Set([vectorPair.v1, vectorPair.v2]));
        vecTree.vectorPairs = vecTree.vectorPairs.union(new Set([vectorPair]));
    }else if(foundEntries.length === 2){
        const vecTree = foundEntries[0];
        const vecTreeToReplace = foundEntries[1];
        vecTree.vectors = vecTree.vectors.union(vecTreeToReplace.vectors);
        vecTree.vectorPairs = vecTree.vectorPairs.union(vecTreeToReplace.vectorPairs).union(new Set([vectorPair]));
        trees.delete(vecTreeToReplace);
    }
  }


  const sorted = [...trees].sort((t1,t2)=> t2.vectors.size - t1.vectors.size).slice(0,3);

  result = sorted.reduce((r,t)=>r*t.vectors.size,1)

  console.log(sortedPairs);
  console.log(sorted);

  return "Final Result: " + result;
}

type VectorPair = {
  v1: number[];
  v2: number[];
  length: number;
};

type VectorTree = {
  vectors: Set<number[]>;
  vectorPairs: Set<VectorPair>;
};

function vDist(v1: number[], v2: number[]) {
  if (v1.length !== v2.length) throw new Error("Invalid number");
  let result = 0;
  for (let i = 0; i < v1.length; i++) {
    result += Math.pow(v2[i] - v1[i], 2);
  }
  return Math.sqrt(result);
}
