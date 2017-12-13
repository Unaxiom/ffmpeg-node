# ffmpeg-node

Simple TypeScript wrapper for FFmpeg CLI commands including the ability to stop the recording

## Installation

`npm install --save @unaxiom/ffmpeg`

Needs to have `ffmpeg` installed and available in PATH

## API

- Create the object

```js
var ffmpeg = new FFmpeg();
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

- Run the process

```js
ffmpeg.run(); // Also accepts a callback function (with code {number/exit code} and signal {string}) which will be run once the process ends
```

- Quit the process (graceful quit)

```js
ffmpeg.quit(); // Also accepts a callback function (with code {number/exit code} and signal {string}) which will be run once the process ends
```

- Kill the process

```js
ffmpeg.kill();
```
