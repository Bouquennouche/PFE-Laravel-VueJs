<template>
  <nav class="navbar navbar-expand-lg sticky-top py-3">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img
          src="@/assets/imgs/tooth.png"
          alt="Bootstrap"
          width="25"
          height="25"
        /><a class="brand align-middle ms-2 me-5" href="/">uSmile</a>
      </a>

      <button
        class="navbar-toggler"
        style="color: white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <router-link to="/" tag="a" exact>
            <li class="nav-item">
              <a class="nav-link me-4" href="#">Accueil</a>
            </li>
          </router-link>
          <router-link to="/services" tag="a" exact>
            <li class="nav-item">
              <a class="nav-link me-4" href="#">Services</a>
            </li>
          </router-link>

          <router-link to="/reservation" tag="a" exact>
            <li class="nav-item">
              <a class="nav-link me-4" href="#">Reserver</a>
            </li>
          </router-link>
        </ul>
        <button class="btn btn-primary rounded-pill" type="submit">
          <i class="bi bi-telephone-fill me-2"></i>Contacter Nous
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
