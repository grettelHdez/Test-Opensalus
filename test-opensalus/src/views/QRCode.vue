<script>
import axios from 'axios';

export default {
  methods: {
    async generateQRCode() {
      try {
        await axios.get("https://opensalus-api.azurewebsites.net/api/qrcode").then(response => {
          if(response.status == 200) {
            console.log(response.data)
          }
        });

      } catch (error) {
        
      }
    }
  }
}

</script>

<template>
  <div class="container-qrCode">
    <h2>QR CODE</h2>
    <img id="img-qrCode"/>
    <button class="bton-generate" @click="() => generateQRCode()">Generate QRCode</button>
  </div>
</template>

<style>
.container-qrCode {
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.container-qrCode h2 {
  color: white;
}

.bton-generate {
    border: 0;
    border-radius: 10px;
    width: 220px;
    height: 60px;
    font-size: 18px;
    font-weight: 500;
    background-color: #09BEC2;
}

#img-qrCode {
  border: 0;
  width: 344px;
  height: 344px;
}

.bton-generate:hover {
  color: #09BEC2;
  background-color: black;
} 
</style>