


// Format numbber to two digits
function formatDay(day: number): string {
    return day.toString().padStart(2, '0');
}


// This function runs the solution for the given day of Advent of Code.

export default async function runDay(day: number) {
    const formattedDay = formatDay(day);
    const inputPath = `./days/day_${formattedDay}/input.in`;
    const solutionPath = `../days/day_${formattedDay}/day_${formattedDay}.ts`;

    // Check if input file exists
    const stats = await Deno.stat(inputPath).catch(() => null);
    if (!stats || !stats.isFile) {
        console.log("Input file not found. Exiting.");
        Deno.exit(1);
    }

    // Read input file
    const input = Deno.readTextFileSync(inputPath);

    // Dynamically import the solution module
    const solutionModule = await import(solutionPath);

    // Run the solution with the input
    return solutionModule.default(input);


}