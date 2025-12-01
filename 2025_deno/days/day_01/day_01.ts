import { diff } from "jsr:@std/internal@^1.0.12/diff";

export default function run(input: string){
    let dial = 50;
    let result = 0;

    const lines = input.split("\r\n");


    lines.forEach(line => {


        const direction = line.charAt(0);
        const amount = parseInt(line.slice(1));

        const sign = direction === "L" ? -1 : 1;

        const amountToChange = sign * amount;

        const unModDial = dial + amountToChange;

        // Edge case for crossing zero once
        if (dial >0 && unModDial < 0) result++;

        // Counts how many time it crosses zero.
        const timesOverHundred = Math.floor(Math.abs(unModDial) / 100);
        result += timesOverHundred;

        dial = mod(dial +amountToChange, 100);

        // Check if lands exactly on zero without modding
        if (unModDial == 0) result++;


    })
    console.log(mod(950,100))
    return "Final Result: " + result;
}

function mod(n: number, m: number): number {
    return ((n % m) + m) % m; // Ensures a positive result
}