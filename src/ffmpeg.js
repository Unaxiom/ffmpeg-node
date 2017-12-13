"use strict";
/*
    ffmpeg -y -r 240 -f x11grab -draw_mouse 0 -s 1920x1080 -i :99 -c:v libvpx -b:v 384k
    -qmin 7 -qmax 25 -maxrate 384k -bufsize 1000k screen.vb8.webm
*/
exports.__esModule = true;
var child_process = require("child_process");
/**Class that does the ffmpeg transformations */
var FFmpeg = /** @class */ (function () {
    function FFmpeg() {
        this.options = [];
        this.outputFilename = "";
    }
    /**Adds a CLI option to the list */
    FFmpeg.prototype.addOptions = function (optionsList) {
        var _this = this;
        optionsList.forEach(function (option) {
            _this.options.push(option);
        });
    };
    /**Adds a single CLI option to the list */
    FFmpeg.prototype.addOption = function (option) {
        this.options.push(option);
    };
    /**Sets the output file name */
    FFmpeg.prototype.setOutputFile = function (filename) {
        this.outputFilename = filename;
    };
    /**Returns the arguments */
    FFmpeg.prototype.returnCLIArgs = function () {
        if (this.outputFilename != "") {
            var temp = this.options;
            temp.push(this.outputFilename);
            return temp;
        }
        return this.options;
    };
    /**Begins the FFmpeg process */
    FFmpeg.prototype.run = function (callbackFunc) {
        // Run the command here
        this.runProcess = child_process.spawn('ffmpeg', this.returnCLIArgs());
        this.runProcess.stdin.setDefaultEncoding('utf-8');
        this.runProcess.stderr.pipe(process.stderr);
        if (callbackFunc !== undefined && callbackFunc !== null) {
            this.runProcess.on('exit', function (code, signal) {
                callbackFunc(code, signal);
            });
        }
    };
    /**Quits the FFmpeg process */
    FFmpeg.prototype.quit = function (callbackFunc) {
        if (callbackFunc !== undefined && callbackFunc !== null) {
            this.runProcess.on('exit', function (code, signal) {
                callbackFunc(code, signal);
            });
        }
        // Send the `q` key
        if (!this.runProcess.killed) {
            this.runProcess.stdin.write('q');
        }
    };
    /**Kills the process forcefully (might not save the output) */
    FFmpeg.prototype.kill = function () {
        if (!this.runProcess.killed) {
            this.runProcess.kill();
        }
    };
    return FFmpeg;
}());
exports.FFmpeg = FFmpeg;
function main() {
    // ffmpeg -y -i screen.vb8.webm -vf "setpts=80*PTS" output.webm
    var ffmpeg = new FFmpeg();
    ffmpeg.addOptions([
        "-y",
        "-i", "screen.vb8.webm",
        "-vf", "setpts=80*PTS",
    ]);
    ffmpeg.setOutputFile("output.webm");
    // ffmpeg.addOptions([
    //     "-y",
    //     "-r", "240",
    //     "-f", "x11grab",
    //     "-draw_mouse", "0",
    //     "-s", "1920x1080",
    //     "-i", ":99",
    //     "-c:v", "libvpx",
    //     "-b:v", "384k",
    //     "-qmin", "7",
    //     "-qmax", "25",
    //     "-maxrate", "384k",
    //     "-bufsize", "1000k",
    //     "-metadata", "title=Selenium Recording",
    //     "-metadata", "artist=Unaxiom Technologies",
    //     "-metadata", "album=Selenium Recordings",
    //     "-metadata", `year=${new Date().getFullYear().toString()}`,
    //     // "screen.vb8.webm"
    // ]);
    // ffmpeg.setOutputFile("screen.vb8.webm");
    ffmpeg.run();
    setTimeout(function () {
        try {
            ffmpeg.quit(function (code, signal) {
                console.log("Process has been quit from callback with code -> " + code + " and signal -> " + signal);
            });
        }
        catch (e) {
            throw (e);
        }
    }, 5000);
}
main();
