import colleges_data from "../datasets/colleges.js";
let fest_data=[]
for (let i = 0; i < colleges_data.length; i++) {
    for (let j = 0; j < colleges_data[i].fests.length; j++) {
        
        fest_data.push(colleges_data[i].fests[j])
      }
  }
  console.log(fest_data)