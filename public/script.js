const userVideo = document.getElementById("user-video");

const startBtn = document.getElementById("start-btn");

const state = {
    media: null,
}

const socket = io();

startBtn.addEventListener("click", async () => {
    const mediaRecoder = new MediaRecorder(state.media, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        // mimeType: "video/webm",
        frameRate: 25,
    });

    mediaRecoder.ondataavailable = (event) => {
        console.log("binary stream", event.data);
        socket.emit("binarystream", event.data);
    }
})

window.addEventListener("load", async (e) => {
    const media = navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });

    state.media = media;

    userVideo.srcObject = await media;
})