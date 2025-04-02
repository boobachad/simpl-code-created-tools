//nodemon is used for restarting the project base in terminal upon keypress. this simple code runs like nodemon but for single and normal and simple files it just 
//restartes the file everytime u press a key in the terminal showing updated console logs or code outputs

//importatn
//to run type
//node nodemon_type-for-simple_file.js writehereyourfilename.js

let count = 0;
const path=require('path');

const fileName=process.argv[2];
if(fileName){
    console.log(`Openigng file ${fileName}`)
} else{
    console.error("provide a file name and try again.")
    console.log("exiting the process...")
    process.exit(1)
}

function main() {
    count++;
    console.log(`Session count #${count}`);

    try {
        const filePath=path.resolve(fileName);
        delete require.cache[require.resolve(filePath)];
        require(filePath);
    } catch (error) {
        console.error("idk something is wrong")
        console.log("exiting the process")
        process.exit(1)
    }
}

function keyPressWait() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.once('data', (key) => {
        if (key[0] === 3) { //here 3 is the ascii code which is keyboard ctrl+c
            console.log('/n Exiting...');
            process.exit(); 
        }
        main();
        keyPressWait();
    });
}

main();
keyPressWait();
