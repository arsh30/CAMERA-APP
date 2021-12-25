let constraints = { video: true }; //we want both true but we only true only video

let videoPlayer = document.querySelector("video");
let vidRecordBtn = document.querySelector("#record-video");

let captureBtn = document.querySelector("#click-picture");

let chunks = [];
let mediaRecorder;

captureBtn.addEventListener("click", function () {
  capture();
});

// video recording code doenot use the canvas it is just used the browser API, navigator.mediaDEvices.getUserMedia it have the recording the mediaStream by which we save

let recordState = false;
vidRecordBtn.addEventListener("click", function () {
  if (!recordState) {
    mediaRecorder.start(); //it is a MediaRecorder function
    recordState = true;
    vidRecordBtn.innerText = "Recording...";
  } else {
    mediaRecorder.stop(); //onstop is mediaRecorder
    recordState = false;
    vidRecordBtn.innerText = "Record";
  }
});

// in video recording -> we use
navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
  videoPlayer.srcObject = mediaStream;
  //create media recorder with the help of media stream
  mediaRecorder = new MediaRecorder(mediaStream); //MediaRecorder

  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
  };

  console.log(mediaRecorder);
  mediaRecorder.onstop = function () {
    let blob = new Blob(chunks, { type: "video/mp4" });
    chunks = [];
    let blobUrl = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = blobUrl;
    a.download = "video.mp4";
    a.click();
  };
});

//function for camera -> in this we record the screen and it will just record the screen
function capture() {
  let canvas = document.createElement("canvas");
  canvas.width = videoPlayer.videoWidth;
  canvas.height = videoPlayer.videoHeight;
  console.log(videoPlayer.videoWidth, videoPlayer.videoHeight);

  let ctx = canvas.getContext("2d");
  ctx.drawImage(videoPlayer, 0, 0);

  // make color download -> for this we draw a rectangle on the picture using fill rect
  if (filter != "") {
    ctx.fillStyle = filter;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // download -> we are downloading in vedio recording by making the blob url link means pehle hm kahain data
  // store krre the eg data:mimeType,data in Url format, so canvas has inbuilt method to convert into URL ie toURL
  // video cannot record by canvas

  let link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "img.jpg";
  link.click();
}

//C) make filters
let filter = "";
let allFilters = document.querySelectorAll(".filter"); //fetching all filter to apply the filters

for (let i of allFilters) {
  i.addEventListener("click", function (e) {
    filter = e.currentTarget.style.backgroundColor;
    addFilterToScreen(filter);
  });
}

function addFilterToScreen(filter) {
  //1st remove all filter
  let prevScreenFilter = document.querySelector(".screen-filter");
  if (prevScreenFilter) {
    prevScreenFilter.remove();
  }

  // let prevScreenFilter = document.querySelector(".screen-filter");
  let filterScreen = document.createElement("div"); //applying filter

  //DO THE STYLE FROM CSS FOR THIS WE GIVE CLASS but isko hm css kese denge iska koi parent bhi nhi h so parent denge or uss parent ko height width fix denge
  filterScreen.classList.add("screen-filter");

  // is filterscreen ko height and width denge and agar hmne isko position nhi di toh yeh camera ke niche hoga
  // so we have to give fixed position fixed from top
  filterScreen.style.height = videoPlayer.offsetHeight + "px";
  filterScreen.style.width = videoPlayer.offsetWidth + "px"; //this is video player width in px
  // filterScreen.style.position = "fixed";
  // filterScreen.style.top = 0;

  // background ground color jo upr se aayega
  filterScreen.style.backgroundColor = filter; //jo bhi upr se aayega uspr filter lgaya or body jo hai usme append krdenege
  document.querySelector(".filter-screen-parent").append(filterScreen);
}
