import { parseArgs } from "@std/cli/parse-args";

import adventOfCode from "./util/adventOfCode.ts"

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const arg = parseArgs(Deno.args, {
    number: ["day", "year"],
      default: {
          day: 1,
          year: 2025
      }
  });

  if (arg.day === undefined) {
    console.error("Please provide a day number using --day");
    Deno.exit(1);
  }
  console.log("Starting Day", arg.day);
  adventOfCode(arg.day).then(r => {
        console.log("Finished Day", arg.day);
        console.log(r);
  });
}
