/*
    ffmpeg -y -r 240 -f x11grab -draw_mouse 0 -s 1920x1080 -i :99 -c:v libvpx -b:v 384k
    -qmin 7 -qmax 25 -maxrate 384k -bufsize 1000k screen.vb8.webm
*/

import child_process = require('child_process');

/**Class that does the ffmpeg transformations */
export class FFmpeg {
    private options: string[]
    private runProcess: child_process.ChildProcess
    private outputFilename: string
    constructor() {
        this.options = [];
        this.outputFilename = "";
    }
    /**Adds a CLI option to the list */
    addOptions(optionsList: string[]): void {
        optionsList.forEach(option => {
            this.options.push(option);
        });
    }
    /**Adds a single CLI option to the list */
    addOption(option: string): void {
        this.options.push(option);
    }
    /**Sets the output file name */
    setOutputFile(filename: string): void {
        this.outputFilename = filename;
    }
    /**Returns the arguments */
    private returnCLIArgs(): string[] {
        if (this.outputFilename != "") {
            let temp = this.options;
            temp.push(this.outputFilename);
            return temp;
        }
        return this.options;
    }
    /**Begins the FFmpeg process */
    run(callbackFunc?: Function): void {
        // Run the command here
        this.runProcess = child_process.spawn('ffmpeg', this.returnCLIArgs());
        this.runProcess.stdin.setDefaultEncoding('utf-8');
        this.runProcess.stderr.pipe(process.stderr);
        if (callbackFunc !== undefined && callbackFunc !== null) {
            this.runProcess.on('exit', function (code, signal) {
                callbackFunc(code, signal);
            });
        }
    }
    /**Quits the FFmpeg process */
    quit(callbackFunc?: Function): void {
        if (callbackFunc !== undefined && callbackFunc !== null) {
            this.runProcess.on('exit', function (code, signal) {
                callbackFunc(code, signal);
            });
        }

        // Send the `q` key
        if (!this.runProcess.killed) {
            this.runProcess.stdin.write('q');
        }
    }
    /**Kills the process forcefully (might not save the output) */
    kill(): void {
        if (!this.runProcess.killed) {
            this.runProcess.kill();
        }
    }
}

function main() {
    // ffmpeg -y -i screen.vb8.webm -vf "setpts=80*PTS" output.webm
    let ffmpeg = new FFmpeg();
    ffmpeg.addOptions([
        "-y",
        "-i", "screen.vb8.webm",
        "-vf", "setpts=80*PTS",
        // "output.webm"
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
            ffmpeg.quit(function (code: number, signal: string) {
                console.log("Process has been quit from callback with code -> " + code + " and signal -> " + signal);
            });
        } catch (e) {
            throw (e);
        }
    }, 5000);
}

main();

