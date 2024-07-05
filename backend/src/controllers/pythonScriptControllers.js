const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: "uploads/" });

const convertToText = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const filePath = req.file.path;
        const outputFileName = 'processed_' + req.file.filename + '.txt';
        // const outputFilePath = path.join(__dirname, 'processedTextFiles', outputFileName);

        const notebookPath = path.resolve(__dirname, '../../../Python_scripts/convertToText.ipynb');
        const notebookDir = path.dirname(notebookPath);

        // const outputDir = path.join(__dirname , 'processedTextFiles');
        const outputDir = '/media/anagha/Data/Mini_Project_Current/mini_project/backend/src/processedTextFiles';
        const outputFilePath = path.join(outputDir, outputFileName);

        // Ensure the output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log(`Created output directory: ${outputDir}`);
        }

        // console.log(`File uploaded to: ${filePath}`);
        // console.log(`Output directory: ${outputDir}`);
        // console.log(`Output file path: ${outputFilePath}`);
        fs.access(outputDir,fs.constants.W_OK,(err) => {
            if (err) {
                console.error(`Output directory ${outputDir} is not writable:`, err.message);
                return res.status(500).send('Output directory is not writable');
            }

            console.log(`Output directory ${outputDir} is writable.`);
            
            if (!fs.existsSync(notebookPath)) {
                console.error("Notebook file not found:", notebookPath);
                return res.status(500).send('Notebook file not found');
            }
    
            const nbconvert = spawn('jupyter', ['nbconvert', '--to', 'script', notebookPath, '--output', 'convertToText'], {
                cwd: notebookDir
            });
    
            nbconvert.on('error', (err) => {
                console.error('Failed to start subprocess:', err);
                return res.status(500).send('Failed to start Jupyter nbconvert');
            });
    
            nbconvert.stderr.on('data', (data) => {
                console.error(`nbconvert stderr: ${data}`);
            });
    
            nbconvert.on('close', (code) => {
                if (code !== 0) {
                    return res.status(500).send('Error converting notebook to script');
                }
    
                const pythonExecutable = '/usr/bin/python3';
                const process = spawn(pythonExecutable, [path.resolve(notebookDir, 'convertToText.py'), filePath, outputFilePath]);
    
                process.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });
    
                process.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                });
    
                process.on('close', (code) => {
                    if (code !== 0) {
                        console.error(`Process exited with code ${code}`);
                        return res.status(500).send("Error processing audio file");
                    }
                    
                    summarizeFileFromAudio(outputFilePath, res);
                    // res.download(outputFilePath, outputFileName, (err) => {
                    //     if (err) {
                    //         console.error("Error sending file:", err.message);
                    //         res.status(500).send("Error sending file");
                    //     }
                    //     console.log("File processed and downloaded successfully.");
                    //     return res.status(200)
                    //     // fs.unlinkSync(filePath);
                    //     // fs.unlinkSync(outputFilePath);
                    // });
                });
            });
        })
        
    } catch (err) {
        console.log("error:", err.message);
        res.status(500).send("Server error");
    }
};



const summarizeText = async ( req, res) => {
    try {
        const fname = req.file.path;
        const notebookPath = path.resolve(__dirname, '../../../Python_scripts/summarizeText.ipynb');
        const notebookDir = path.dirname(notebookPath);

        // Convert the Jupyter Notebook to a Python script
        const nbconvert = spawn('jupyter', ['nbconvert', '--to', 'script', notebookPath], {
            cwd: notebookDir
        });

        nbconvert.on('error', (err) => {
            console.error('Failed to start subprocess:', err);
            return res.status(500).send('Failed to start Jupyter nbconvert');
        });

        nbconvert.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).send('Error converting notebook to script');
            }

            // Execute the converted Python script
            const pythonScriptPath = path.resolve(notebookDir, 'summarizeText.py');
            const process = spawn('python3', [pythonScriptPath, fname]);

            let scriptOutput = '';
            let scriptError = '';
            let summarizedFilePath = '';

            process.stdout.on('data', (data) => {
                summarizedFilePath += data.toString();
            });

            process.stderr.on('data', (data) => {
                scriptError += data.toString();
            });

            process.on('close', (code) => {
                if (code === 0) {
                    // Remove any newline characters from the output path
                    summarizedFilePath = summarizedFilePath.trim();
    
                    // Check if the file exists
                    if (fs.existsSync(summarizedFilePath)) {
                        // Set headers for file download
                        const outputFileName = path.basename(summarizedFilePath);
                        res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
                        res.setHeader('Content-Type', 'text/plain'); // Adjust content type as needed
    
                        // Stream the file back to the client for download
                        const fileStream = fs.createReadStream(summarizedFilePath);
                        fileStream.pipe(res);
    
                        // Optionally, you can delete the input and output files after sending the response
                        // fs.unlinkSync(inputFilePath);
                        // fs.unlinkSync(summarizedFilePath);
                    } else {
                        console.error(`Output file not found: ${summarizedFilePath}`);
                        res.status(500).send('Internal Server Error');
                    }
                } else {
                    console.error(`Python script error: ${scriptError}`);
                    return res.status(500).send('Internal Server Error');
                }
            });
        });

        console.log("successful execution");
    } catch (error) {
        console.error(`Error executing Python script: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
};

const summarizeFileFromAudio = async ( outputFile, res) => {
    try {
        const fname = outputFile;
        const notebookPath = path.resolve(__dirname, '../../../Python_scripts/summarizeText.ipynb');
        const notebookDir = path.dirname(notebookPath);

        // Convert the Jupyter Notebook to a Python script
        const nbconvert = spawn('jupyter', ['nbconvert', '--to', 'script', notebookPath], {
            cwd: notebookDir
        });

        nbconvert.on('error', (err) => {
            console.error('Failed to start subprocess:', err);
            return res.status(500).send('Failed to start Jupyter nbconvert');
        });

        nbconvert.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).send('Error converting notebook to script');
            }

            // Execute the converted Python script
            const pythonScriptPath = path.resolve(notebookDir, 'summarizeText.py');
            const process = spawn('python3', [pythonScriptPath, fname]);

            let scriptOutput = '';
            let scriptError = '';
            let summarizedFilePath = '';

            process.stdout.on('data', (data) => {
                summarizedFilePath += data.toString();
            });

            process.stderr.on('data', (data) => {
                scriptError += data.toString();
            });

            process.on('close', (code) => {
                if (code === 0) {
                    // Remove any newline characters from the output path
                    summarizedFilePath = summarizedFilePath.trim();
    
                    // Check if the file exists
                    if (fs.existsSync(summarizedFilePath)) {
                        // Set headers for file download
                        const outputFileName = path.basename(summarizedFilePath);
                        res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
                        res.setHeader('Content-Type', 'text/plain'); // Adjust content type as needed
    
                        // Stream the file back to the client for download
                        const fileStream = fs.createReadStream(summarizedFilePath);
                        fileStream.pipe(res);
    
                        // Optionally, you can delete the input and output files after sending the response
                        // fs.unlinkSync(inputFilePath);
                        // fs.unlinkSync(summarizedFilePath);
                    } else {
                        console.error(`Output file not found in summary: ${summarizedFilePath}`);
                        res.status(500).send('Internal Server Error in summary');
                    }
                } else {
                    console.error(`Python script error: ${scriptError}`);
                    return res.status(500).send('Internal Server Error');
                }
            });
        });

        console.log("successful execution");
    } catch (error) {
        console.error(`Error executing Python script: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
};
module.exports.convertToText = convertToText;
module.exports.summarizeText = summarizeText;
module.exports.summarizeFileFromAudio = summarizeFileFromAudio;

