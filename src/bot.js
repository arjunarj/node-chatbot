// Load Naive Bayes Text Classifier
var Classifier = require( 'wink-naive-bayes-text-classifier' );
const fs = require("fs")

// Instantiate
var nbc = Classifier();

// Load wink nlp and its model
const winkNLP = require( 'wink-nlp' );

// Load language model
const model = require( 'wink-eng-lite-web-model' );
const nlp = winkNLP( model );
const its = nlp.its;

const prepTask = function ( text ) {
  const tokens = [];
  nlp.readDoc(text)
      .tokens()
      // Use only words ignoring punctuations etc and from them remove stop words
      .filter( (t) => ( t.out(its.type) === 'word' && !t.out(its.stopWordFlag) ) )
      // Handle negation and extract stem of the word
      .each( (t) => tokens.push( (t.out(its.negationFlag)) ? '!' + t.out(its.stem) : t.out(its.stem) ) );

  return tokens;
};
nbc.definePrepTasks( [ prepTask ] );

// Configure behavior
nbc.defineConfig( { considerOnlyPresence: true, smoothingFactor: 0.5 } );

// Train!
let data = fs.readFileSync("./src/intents/intents.json")
dataset = JSON.parse(data)
dataset.forEach((data) => {
  nbc.learn(data.summary,data.inference)
});
nbc.consolidate();
console.log("Trained")

// Start predicting...
function ask(summary){
  return nbc.predict(summary)
}
// -> prepay

module.exports = {ask:ask}
