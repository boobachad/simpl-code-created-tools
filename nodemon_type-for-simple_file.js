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
