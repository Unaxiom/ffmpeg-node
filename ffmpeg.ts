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
    /**Sets the callback function that is called once the process exits on quits. The first argument to the 
     * callback is the exit code (number) and the second argument is the signal (string).
    */
    setOnCloseCallback(callbackFunc: Function): void {
        this.runProcess.on('exit', function (code, signal) {
            callbackFunc(code, signal);
        });
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
    /**Begins the FFmpeg process. Accepts an optional silent boolean value which supresses the output */
    run(silent?: boolean): void {
        // Run the command here
        this.runProcess = child_process.spawn('ffmpeg', this.returnCLIArgs());
        this.runProcess.stdin.setDefaultEncoding('utf-8');
        if (!silent) {
            this.runProcess.stdout.pipe(process.stderr);
            this.runProcess.stderr.pipe(process.stderr);
        }
    }
    /**Quits the FFmpeg process */
    quit(): void {
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

