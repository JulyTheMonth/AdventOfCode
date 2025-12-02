import { diff } from "jsr:@std/internal@^1.0.12/diff";

export default function run(input: string){

    let result = 0;

    const ranges = input.split(",");


    ranges.forEach(range => {
        const [startStr, endStr] = range.split("-");
        const start = parseInt(startStr);
        const end = parseInt(endStr);
        for (let i = start; i <= end; i++) {
            // Cycle through all possible divisions
            const strNum = i.toString();
            for (let j = 2; j <= strNum.length; j++) {
                if (strNum.length % j == 0 && checkPattern(i, j)) {
                    console.log("Valict number found: " + i + " with parts: " + j);
                    result += i;
                    break;
                }
            }
        }
    })
    return "Final Result: " + result;
}

function checkPattern(num: number, parts: number) :boolean{
    const strNumber = num.toString();
    const partLength = Math.ceil(strNumber.length / parts);
    const firstPart = strNumber.slice(0, partLength);
    for (let i = 1; i < parts; i++) {
        const part = strNumber.slice(i * partLength, (i + 1) * partLength);
        if (part !== firstPart) return false;
    }
    return true;
}