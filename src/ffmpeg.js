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
    /**Adds a list of CLI options to the process */
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
    /**Sets the callback function that is called once the process exits on quits. The first argument to the
     * callback is the exit code (number) and the second argument is the signal (string).
    */
    FFmpeg.prototype.setOnCloseCallback = function (callbackFunc) {
        this.runProcess.on('exit', function (code, signal) {
            callbackFunc(code, signal);
        });
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
    /**Begins the FFmpeg process. Accepts an optional silent boolean value which supresses the output */
    FFmpeg.prototype.run = function (silent) {
        // Run the command here
        this.runProcess = child_process.spawn('ffmpeg', this.returnCLIArgs());
        this.runProcess.stdin.setDefaultEncoding('utf-8');
        if (!silent) {
            this.runProcess.stdout.pipe(process.stderr);
            this.runProcess.stderr.pipe(process.stderr);
        }
    };
    /**Quits the FFmpeg process */
    FFmpeg.prototype.quit = function () {
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
