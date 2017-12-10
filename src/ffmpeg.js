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
    /**Sets the name of thje output file */
    FFmpeg.prototype.setOutput = function (filename) {
        this.outputFileName = filename;
    };
    /**Begins the FFmpeg process */
    FFmpeg.prototype.run = function () {
        // let shellCommand = `ffmpeg ${this.options.join(" ")} ${this.outputFileName}`;
        // Run the command here
        var args = this.options;
        args.push(this.outputFileName);
        this.runProcess = child_process.spawn('ffmpeg', args);
        this.runProcess.stdin.setDefaultEncoding('utf-8');
        this.runProcess.stdout.pipe(process.stdout);
    };
    /**Quits the FFmpeg process */
    FFmpeg.prototype.quit = function () {
        // Send the `q` key
        if (this.runProcess.stdin.writable) {
            this.runProcess.stdin.write('q\r\n');
        }
        this.runProcess.stdin.end();
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
