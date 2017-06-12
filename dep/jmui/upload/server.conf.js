/**
 * NodeJs Server-Side Example for Fine Uploader (traditional endpoints).
 * Maintained by Widen Enterprises.
 *
 * This example:
 *  - handles non-CORS environments
 *  - handles delete file requests assuming the method is DELETE
 *  - Ensures the file size does not exceed the max
 *  - Handles chunked upload requests
 *
 * Requirements:
 *  - express (for handling requests)
 *  - rimraf (for "rm -rf" support)
 *  - multiparty (for parsing request payloads)
 *  - mkdirp (for "mkdir -p" support)
 */

// Dependencies
var fs = require("fs"),
    rimraf = require("rimraf"),
    mkdirp = require("mkdirp"),
    multiparty = require('multiparty'),
    sharp = require('sharp'),

    // paths/constants
    fileInputName = process.env.FILE_INPUT_NAME || "qqfile",
    uploadedFilesPath = process.env.UPLOADED_FILES_DIR || "./uploads/",
    chunkDirName = "chunks",
    maxFileSize = process.env.MAX_FILE_SIZE || 0; // in bytes, 0 for unlimited


function onUpload(req, res) {
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var partIndex = fields.qqpartindex;

        console.log(fields)

        // text/plain is required to ensure support for IE9 and older
        res.set("Content-Type", "text/plain");

        if (partIndex == null) {
            onSimpleUpload(fields, files[fileInputName][0], res);
        } else {
            onChunkedUpload(fields, files[fileInputName][0], res);
        }
    });
}

function getCropOption(fields) {
    if (!fields.left && !fields.top && !fields.width && !fields.height) return null

    return {
        left: Math.round(fields.x[0]),
        top: Math.round(fields.y[0]),
        width: Math.round(fields.width[0]),
        height: Math.round(fields.height[0])
    }
}

function onDeleteFile(req, res) {
    var uuid = req.params.uuid,
        dirToDelete = uploadedFilesPath + uuid;

    rimraf(dirToDelete, function (error) {
        if (error) {
            console.error("Problem deleting file! " + error);
            res.status(500);
        }

        res.send();
    });
}

function onSimpleUpload(fields, file, res) {
    var uuid = fields.qquuid,
        responseData = {
            success: false
        };

    file.name = fields.qqfilename;

    if (isValid(file.size)) {

        var cropOption = getCropOption(fields)

        moveUploadedFile(file, uuid, function () {
                responseData.success = true;
                res.send(responseData);
            },
            function () {
                responseData.error = "Problem copying the file!";
                res.send(responseData);
            }, cropOption);
    } else {
        failWithTooBigFile(responseData, res);
    }
}

function onChunkedUpload(fields, file, res) {
    var size = parseInt(fields.qqtotalfilesize),
        uuid = fields.qquuid,
        index = fields.qqpartindex,
        totalParts = parseInt(fields.qqtotalparts),
        responseData = {
            success: false
        };

    file.name = fields.qqfilename;

    if (isValid(size)) {

        var cropOption = getCropOption(fields)

        storeChunk(file, uuid, index, totalParts, function () {
                if (index < totalParts - 1) {
                    responseData.success = true;
                    res.send(responseData);
                } else {
                    combineChunks(file, uuid, function () {
                            responseData.success = true;
                            res.send(responseData);
                        },
                        function () {
                            responseData.error = "Problem conbining the chunks!";
                            res.send(responseData);
                        });
                }
            },
            function (reset) {
                responseData.error = "Problem storing the chunk!";
                res.send(responseData);
            }, cropOption);
    } else {
        failWithTooBigFile(responseData, res);
    }
}

function failWithTooBigFile(responseData, res) {
    responseData.error = "Too big!";
    responseData.preventRetry = true;
    res.send(responseData);
}

function isValid(size) {
    return maxFileSize === 0 || size < maxFileSize;
}

function moveFile(destinationDir, sourceFile, destinationFile, success, failure, cropOption) {
    mkdirp(destinationDir, function (error) {
        var sourceStream, destStream;

        if (error) {
            console.error("Problem creating directory " + destinationDir + ": " + error);
            failure();
        } else {
            sourceStream = fs.createReadStream(sourceFile);
            destStream = fs.createWriteStream(destinationFile);

            if (cropOption) {
                console.log(cropOption)
                var pipeline = sharp().extract({
                    left: cropOption.left,
                    top: cropOption.top,
                    width: cropOption.width,
                    height: cropOption.height
                }).toBuffer(function (err, outputBuffer, info) {
                    // outputBuffer contains 200px high JPEG image data,
                    // auto-rotated using EXIF Orientation tag
                    // info.width and info.height contain the dimensions of the resized image
                });

                sourceStream.pipe(pipeline)
                    .on("error", function (error) {
                        console.error("Problem copying file: " + error.stack);
                        destStream.end();
                        failure();
                    })
                    .on("end", function () {
                        destStream.end();
                        success();
                    })
                    .pipe(destStream);
            } else {
                sourceStream
                    .on("error", function (error) {
                        console.error("Problem copying file: " + error.stack);
                        destStream.end();
                        failure();
                    })
                    .on("end", function () {
                        destStream.end();
                        success();
                    })
                    .pipe(destStream);
            }

        }
    });
}

function moveUploadedFile(file, uuid, success, failure, cropOption) {
    var destinationDir = uploadedFilesPath + uuid + "/",
        fileDestination = destinationDir + file.name;

    moveFile(destinationDir, file.path, fileDestination, success, failure, cropOption);
}

function storeChunk(file, uuid, index, numChunks, success, failure, cropOption) {
    var destinationDir = uploadedFilesPath + uuid + "/" + chunkDirName + "/",
        chunkFilename = getChunkFilename(index, numChunks),
        fileDestination = destinationDir + chunkFilename;

    moveFile(destinationDir, file.path, fileDestination, success, failure, cropOption);
}

function combineChunks(file, uuid, success, failure) {
    var chunksDir = uploadedFilesPath + uuid + "/" + chunkDirName + "/",
        destinationDir = uploadedFilesPath + uuid + "/",
        fileDestination = destinationDir + file.name;


    fs.readdir(chunksDir, function (err, fileNames) {
        var destFileStream;

        if (err) {
            console.error("Problem listing chunks! " + err);
            failure();
        } else {
            fileNames.sort();
            destFileStream = fs.createWriteStream(fileDestination, {
                flags: "a"
            });

            appendToStream(destFileStream, chunksDir, fileNames, 0, function () {
                    rimraf(chunksDir, function (rimrafError) {
                        if (rimrafError) {
                            console.log("Problem deleting chunks dir! " + rimrafError);
                        }
                    });
                    success();
                },
                failure);
        }
    });
}

function appendToStream(destStream, srcDir, srcFilesnames, index, success, failure) {
    if (index < srcFilesnames.length) {
        fs.createReadStream(srcDir + srcFilesnames[index])
            .on("end", function () {
                appendToStream(destStream, srcDir, srcFilesnames, index + 1, success, failure);
            })
            .on("error", function (error) {
                console.error("Problem appending chunk! " + error);
                destStream.end();
                failure();
            })
            .pipe(destStream, {
                end: false
            });
    } else {
        destStream.end();
        success();
    }
}

function getChunkFilename(index, count) {
    var digits = new String(count).length,
        zeros = new Array(digits + 1).join("0");

    return (zeros + index).slice(-digits);
}

module.exports = {
    onUpload: onUpload,
    onDeleteFile: onDeleteFile
}