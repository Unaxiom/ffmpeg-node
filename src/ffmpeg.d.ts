/**Class that does the ffmpeg transformations */
export declare class FFmpeg {
    private options;
    private runProcess;
    private outputFilename;
    constructor();
    /**Adds a CLI option to the list */
    addOptions(optionsList: string[]): void;
    /**Adds a single CLI option to the list */
    addOption(option: string): void;
    /**Sets the output file name */
    setOutputFile(filename: string): void;
    /**Sets the callback function that is called once the process exits on quits. The first argument to the
     * callback is the exit code (number) and the second argument is the signal (string).
    */
    setOnCloseCallback(callbackFunc: Function): void;
    /**Returns the arguments */
    private returnCLIArgs();
    /**Begins the FFmpeg process. Accepts an optional silent boolean value which supresses the output */
    run(silent?: boolean): void;
    /**Quits the FFmpeg process */
    quit(): void;
    /**Kills the process forcefully (might not save the output) */
    kill(): void;
}
