//מגישות קורל צלח וקארין ואנונו
const fs = require('fs');

/**
 * Merges N files according to the rule:
 * In iteration i, copies up to i lines from each file.
 * 
 * string[] inputFiles - Array of input file paths
 * string outputFile - Path for the resulting output file (result.txt)
 */
function mergeFiles(inputFiles, outputFile) {
    //Read all files directly and split their content into lines
    const filesData = inputFiles.map(filePath => {
        const content = fs.readFileSync(filePath, 'utf-8');
        return content.split(/\r?\n/);
    });

    // Track current line pointer for each file
    const pointers = new Array(filesData.length).fill(0);
    const resultLines = [];

    let currentBatchSize = 1; // Represents 'i' (starts at 1)
    let hasMoreData = true;

    // Main loop: runs as long as at least one file has remaining lines
    while (hasMoreData) {
        hasMoreData = false; // Reset flag for each iteration

        // Iterate through all N files in order
        for (let fileIndex = 0; fileIndex < filesData.length; fileIndex++) {
            let linesCopied = 0;

            // Copy up to currentBatchSize (i) lines from the current file
            while (
                linesCopied < currentBatchSize &&
                pointers[fileIndex] < filesData[fileIndex].length
            ) {
                resultLines.push(filesData[fileIndex][pointers[fileIndex]]);
                pointers[fileIndex]++;
                linesCopied++;
                hasMoreData = true; // Mark that lines were processed in this round
            }
        }

        // Increment batch size for the next round (i + 1)
        currentBatchSize++;
    }

    // Write all merged lines into the result file
    fs.writeFileSync(outputFile, resultLines.join('\n'), 'utf-8');
    console.log(`Successfully generated output file: ${outputFile}`);
}


const inputFiles = ['f1.txt', 'f2.txt', 'f3.txt', 'f4.txt'];
const outputFile = 'result.txt';

mergeFiles(inputFiles, outputFile);