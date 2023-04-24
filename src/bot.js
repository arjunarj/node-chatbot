// Let's start with importing `NlpManager` from `node-nlp`. This will be responsible for training, saving, loading and processing.
const { NlpManager } = require("node-nlp");
// Creating new Instance of NlpManager class.
const manager = new NlpManager({ languages: ["en"] });
// Let's import fs module to read our json files.
const fs = require("fs");
// Let's read all our intents files in the folder intents
fs.readdir(__dirname+"/intents/",(err,x)=>{
    if (err) {
        console.log(err)
    }for (const file of x) {
        fs.readFile(`./intents/${file}`,(erro,y)=>{
            data = JSON.parse(y);
            const intent = file.replace(".json", "");
            for (const question of data.questions) {
                manager.addDocument("en", question, intent);
            }
            for (const answer of data.answers) {
                manager.addAnswer("en", intent, answer);
            }
        });
        
    }
});
// console.log(files)
// Looping through the files and Parsing the string to object and passing it to manager instance to train and process it.

// let's create a function that will be responsible for Training and saving the manager instance.
async function train_save(){
    await manager.train();
    manager.save();
}
// Calling the above function
train_save();