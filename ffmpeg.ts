/*
    ffmpeg -y -r 240 -f x11grab -draw_mouse 0 -s 1920x1080 -i :99 -c:v libvpx -b:v 384k
    -qmin 7 -qmax 25 -maxrate 384k -bufsize 1000k screen.vb8.webm
*/

import child_process = require('child_process');

/**Class that does the ffmpeg transformations */
export class FFmpeg {
    private options: string[]
    private outputFileName: string
    private runProcess: child_process.ChildProcess
    constructor() {
        this.options = [];
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
    /**Sets the name of thje output file */
    setOutput(filename: string): void {
        this.outputFileName = filename;
    }
    /**Begins the FFmpeg process */
    run(): void {
        // let shellCommand = `ffmpeg ${this.options.join(" ")} ${this.outputFileName}`;
        // Run the command here
        let args = this.options;
        args.push(this.outputFileName);
        this.runProcess = child_process.spawn('ffmpeg', args);
        this.runProcess.stdin.setDefaultEncoding('utf-8');
        this.runProcess.stdout.pipe(process.stdout);
    }
    /**Quits the FFmpeg process */
    quit(): void {
        // Send the `q` key
        if (this.runProcess.stdin.writable) {
            this.runProcess.stdin.write('q\r\n');
        }
        this.runProcess.stdin.end();
    }
    /**Kills the process forcefully (might not save the output) */
    kill(): void {
        if (!this.runProcess.killed) {
            this.runProcess.kill();
        }
    }
}