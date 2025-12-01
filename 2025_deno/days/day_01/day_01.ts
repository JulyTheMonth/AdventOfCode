export default function run(input: string){
    let dial = 50;
    let result = 0;

    const lines = input.split("\r\n");

    lines.forEach(line => {
        const direction = line.charAt(0);
        const amount = parseInt(line.slice(1));

        const sign = direction === "L" ? -1 : 1;

        dial = mod(dial +(sign* amount), 100);
        if (dial == 0) result ++;

    })

    return "Final Result: " + result;
}

function mod(n: number, m: number): number {
    return ((n % m) + m) % m; // Ensures a positive result
}