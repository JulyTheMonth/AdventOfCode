

export default function run(input: string){

    let result = 0;

    const lines = input.split("\n");


    lines.forEach(line => {
        if (line === "") return;
        const joltages  = line.split("").map(num => Number(num));
        let indexes = [];
        let lastIndex = -1;
        for (let i = 11; i >= 0; i--) {
            lastIndex = findHighestJoltageIndex(joltages, lastIndex+1, joltages.length-i);
            indexes.push(lastIndex);

        }
       const concated = indexes.reduce((acc, index) =>{
           return `${acc}${joltages[index]}`;
       }, "")
        result += Number(concated);
    })
    return "Final Result: " + result;
}

function findHighestJoltageIndex(joltages: number[], minIndex: number, maxIndex): number {
    const slice  = joltages.slice(minIndex, maxIndex)
    const maxJoltage = Math.max(...slice);
    return slice.findIndex(x => x === maxJoltage)+ minIndex;
}
