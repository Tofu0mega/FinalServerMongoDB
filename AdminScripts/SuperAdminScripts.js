import readline from "readline"
import mongoose from "mongoose";
import * as approver from "./eventapproval.js"

import * as connector from "./clubtoidassociator.js"

mongoose.connect('mongodb://127.0.0.1:27017/KUventsJServer', { useNewUrlParser: true, useUnifiedTopology: true });
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const rl3 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.question('Welcome to Admin tools\n 1)Approve(EventName) to approve event \n2) Associate(Clubname) to connect Association ', (answer) => {
    if (answer==1 ){
        rl2.question('Enter Event to Approve',(answer2)=>{
            approver.approveevent(answer2)
        rl2.close()
        });


    }else if (answer==2){
        rl3.question('Enter Club to Associate',(answer3)=>{
        connector.clubassign(answer3)
        rl3.close()
        });

    }
    
  
  rl.close();
});
