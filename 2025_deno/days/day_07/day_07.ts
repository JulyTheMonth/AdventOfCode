import $display = Deno.jupyter.$display;

export default function run(input: string) {
  let result = 0;

  let lines:number[][] = input.split("\n").map(s=> {
      return s.split("").map(c=>{
          if (c=='^') return -1;
          if (c=='S') return 1;
          if (c=='.') return 0;
      })
  });

  for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const prevLine = lines[i-1];
      for (let j = 0; j < line.length; j++) {
          if(line[j] == -1){
              if (prevLine[j] >0){
                  line[j+1]+=prevLine[j]; line[j-1]+=prevLine[j];
              }
          } else{
              if (prevLine[j] > 0) line[j] += prevLine[j];
          }
      }
  }

  lines.forEach(l => console.log(l.map(s=>s.toString().padStart(3," ")).join(".")))
    lines.pop().forEach(c=>result+=c);
  // lines.forEach(l=> {
  //     if (l.includes('^')){
  //         l.forEach(c=>{
  //             if (c=='|') result++;
  //         })
  //     }
  // });



  return "Final Result: " + result;
}
