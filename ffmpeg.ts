/*
    ffmpeg -y -r 240 -f x11grab -draw_mouse 0 -s 1920x1080 -i :99 -c:v libvpx -b:v 384k
    -qmin 7 -qmax 25 -maxrate 384k -bufsize 1000k screen.vb8.webm
*/

import child_process = require('child_process');

/**Class that does the ffmpeg transformations */
export class FFmpeg {
    private options: string[]
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
    /**Returns the arguments */
    private returnCLIArgs(): string[] {
        return this.options;
    }
    /**Begins the FFmpeg process */
    run(): void {
        // Run the command here
        this.runProcess = child_process.spawn('ffmpeg', this.returnCLIArgs());
        this.runProcess.stderr.pipe(process.stderr);

        this.runProcess.on('exit', function (code: number, signal: string) {
            console.log("Process has closed with code -> " + code + " and signal -> " + signal);
        });
    }
    /**Quits the FFmpeg process */
    quit(): void {
        // Send the `q` key
        this.runProcess.stdin.setDefaultEncoding('utf-8');
        this.runProcess.stdin.write('q');
        // console.log("Writing q to stdin");
        // this.runProcess.kill('SIGINT')
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
        "output.webm"
    ]);
    ffmpeg.run();
    setTimeout(function () {
        console.log("++++++++++++++++++++++++++\nAbout to quit\n\n\n");
        ffmpeg.quit();
        console.log("+++++++++++++++++\nSuccessfully quit\n");
    }, 5000);
}

main();

