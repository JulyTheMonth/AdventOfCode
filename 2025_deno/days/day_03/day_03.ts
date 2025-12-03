

export default function run(input: string){

    let result = 0;

    const lines = input.split("\n");


    lines.forEach(line => {
        if (line === "") return;
        const joltages  = line.split("").map(num => Number(num));
        const fI = findHighestJoltageIndex(joltages, 0, joltages.length-1);
        const sI = findHighestJoltageIndex(joltages, fI+1, joltages.length);
        result += Number(`${joltages[fI]}${joltages[sI]}`);
    })
    return "Final Result: " + result;
}

function findHighestJoltageIndex(joltages: number[], minIndex: number, maxIndex): number {
    const maxJoltage = Math.max(...joltages.slice(minIndex, maxIndex));
    return joltages.findIndex(x => x === maxJoltage);
}
