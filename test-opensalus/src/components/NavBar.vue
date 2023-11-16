<!-- <script>
export default ({
  method: {
    
  }
})
</script> -->

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/"><span style="color: #09BEC2;">Test</span> Opensalus</router-link>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/changeIcon">Change Icon</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/qrCode">QR Code</router-link>
        </li>
        <li class="nav-item">
          <router-link id="icon-home" class="nav-link active" aria-current="page" to="/"><img id="icon-center" src="src/icons/icon-home-aquamarine.svg"/></router-link>
        </li>
      </ul>
    </div>
  </div>
  </nav>
  <router-view/>
</template>

<style>
#icon-center {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
</style>