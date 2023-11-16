<script>
import axios from 'axios'

export default {
  methods: {
    handleUploadImage() {
      const dragDropBox = document.querySelector(".drag-drop-box");
      const dragDropText = dragDropBox.querySelector("h2")
      const btonBrowserImg = dragDropBox.querySelector("#bton-browser-img");
      const inputImg = dragDropBox.querySelector("#input-img");

      btonBrowserImg.addEventListener('click', (e) => {inputImg.click()});
      
      inputImg.addEventListener('change', (e) => {
        let image = (this.file == undefined)? e.target.files : this.file;
        dragDropBox.classList.add("active");
        showImage(image)
        dragDropBox.classList.remove("active")
      });

      dragDropBox.addEventListener("dragover", (e) => {
        e.preventDefault();
        dragDropBox.classList.add("active");
        dragDropText.textContent = "Drop file to upload"
      });

      dragDropBox.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dragDropBox.classList.remove("active");
        dragDropText.textContent = "Drop file to upload"
      });
        
      dragDropBox.addEventListener("drop", (e) => {
        e.preventDefault();
        showImage(e.dataTransfer.files);
        dragDropBox.classList.remove("active");
        dragDropText.textContent = "Drag & Drop  to Upload File";
      });

      function showImage(image) {
        const imgReader = new FileReader();

        imgReader.addEventListener('load', (e) => {
          const imgUrl = imgReader.result;

          const previewImage = `
            <div class="container-preview">
              <img class="pre-img" src="${imgUrl}" alt="${image[0].name}"/>
              <div>
                <span>${image[0].name}</span>
              </div>
            </div>
          `;
          document.querySelector('#preview').innerHTML = previewImage;
        });
        
        imgReader.readAsDataURL(image[0]);
        uploadImageToApi(image[0]);
      }

      async function uploadImageToApi(image) {
        const dataImg = new FormData();
        dataImg.append("file", image);

        const uploadProcess = document.querySelector(".upload-process");
        uploadProcess.classList.add("visible")

        try {
          await axios.post("https://opensalus-api.azurewebsites.net/api/media", dataImg)
          document.querySelector("#status").innerHTML = `<span class="success">Success!</span>`;
        } catch (error) {
          try {
            await axios.post("http://localhost:3000/api/media", dataImg).then(response => {
              if(response.status == 200) {
                const imgUrl =response.data.data.url
                console.log(imgUrl)

                document.querySelector("#status").innerHTML = `<span class="success">Success!</span>`;
                var iconCenter = document.getElementById("icon-center");
                iconCenter.src = imgUrl

                console.log(iconCenter.src)
              }
              else {
                document.querySelector("#status").innerHTML = `<span class="failer">Could not upload</span>`;
              }
            });
          } catch (error) {
            document.querySelector("#status").innerHTML = `<span class="failer">Could not upload</span>`;
          }
        }
      }
    },
  }
}
</script>

<template>
  <div class="container-upload-img">
    <div class="drag-drop-box">
      <img id="img-cloud" src="src/icons/icon-cloud-white.png"/>
      <h2>Drag & Drop  to Upload File</h2>
      <h2>OR</h2>
      <button id="bton-browser-img" @click="() => handleUploadImage()">Browser Image</button>
      <input type="file" id="input-img" hidden accept="image/jpg, image/jpeg, image/png"> 
    </div>
    <div class="upload-process">
      <div id="preview"></div>
      <div id="status"></div>
    </div>
  </div>
</template>

<style>
.container-upload-img {
  min-height: 94vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
}

.drag-drop-box {
  width: 700px;
  height: 500px;
  border-radius: 10px;
  border: 3px dashed white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}

.drag-drop-box h2 {
  color: white;
}

.drag-drop-box.active {
  background-color: #78B2B4;
}

.container-preview {
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.upload-process {
  display: flex;
  align-items: center;
}

.visible {
  border-radius: 10px;
  background-color: #09BEC2;
  padding: 1rem;
}

#status {
  font-size: 16px;
  font-weight: 900;
  margin-left: 1rem;
}

.success {
  color: green;
}

.failer {
  color: red;
}

#bton-browser-img {
  width: 220px;
  height: 60px;
  border: 0;
  border-radius: 10px;
  color: black;
  font-size: 18px;
  font-weight: 500;
  background-color: #09BEC2;
}

#img-cloud {
  width: 140px;
  height: 100px;
  margin-bottom: 2rem;
}

.pre-img {
  width: 30px;
  height: 30px;
  margin-right: 1rem;
}

#bton-browser-img:hover {
  color: #09BEC2;
  background-color: black;
}
</style>