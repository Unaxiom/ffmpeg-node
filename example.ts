import FFmpeg = require('./ffmpeg');

function main() {
    // ffmpeg -y -i screen.vb8.webm -vf "setpts=80*PTS" output.webm
    let ffmpeg = new FFmpeg.FFmpeg();
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
    ffmpeg.setOnCloseCallback(function (code: number, signal: string) {
        console.log("Process has been quit from setOnCloseCallback with code -> " + code + " and signal -> " + signal);
    });
    setTimeout(function () {
        try {
            ffmpeg.quit();
        } catch (e) {
            throw (e);
        }
    }, 5000);
}

main();