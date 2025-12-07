import $display = Deno.jupyter.$display;

export default function run(input: string) {
  let result = 0;

  let lines = input.split("\n").map(s=>s.split(""));

  for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const prevLine = lines[i-1];
      for (let j = 0; j < line.length; j++) {
          if(line[j] == '^'){
              if (prevLine[j] =='|' || prevLine[j] == 'S'){
                  result++;
                  line[j+1] = '|'; line[j-1] ='|';
              }
          } else{
              if (prevLine[j] == '|' || prevLine[j] =='S')  line[j] = '|';
          }
      }
  }


  // lines.forEach(l=> {
  //     if (l.includes('^')){
  //         l.forEach(c=>{
  //             if (c=='|') result++;
  //         })
  //     }
  // });



  return "Final Result: " + result;
}
