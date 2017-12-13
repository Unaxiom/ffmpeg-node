# ffmpeg-node

Simple TypeScript wrapper for FFmpeg CLI commands including the ability to stop the recording

## Installation

`npm install --save @unaxiom/ffmpeg`

Needs to have `ffmpeg` installed and available in PATH

## API

- Import the module

```js
import * as FFmpeg from '@unaxiom/ffmpeg';
```

Or require the module

```js
var FFmpeg = require("./ffmpeg");
```

- Create the object

```js
var ffmpeg = new FFmpeg.FFmpeg();
```

- Add an individual option

```js
ffmpeg.addOption("-y");
```

- Add an array of options

```js
ffmpeg.addOptions([
        "-y",
        "-i", "screen.vb8.webm",
        "-vf", "setpts=80*PTS",
    ]);
```

- Set the output file name

```js
ffmpeg.setOutputFile("output.webm");
```

- Set up a callback function when the process completes/quits

```js
ffmpeg.setOnCloseCallback(function (code: number, signal: string) {
        console.log("Process quit from setOnCloseCallback with code -> " + code + " and signal -> " + signal);
    });
```

- Run the process

```js
ffmpeg.run(); // Accepts an optional boolean that supresses the standard output. Default is false.
```

- Quit the process (graceful quit)

```js
ffmpeg.quit();
```

- Kill the process

```js
ffmpeg.kill();
```
