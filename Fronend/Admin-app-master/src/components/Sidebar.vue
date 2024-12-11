<template>
  <div
    class="main-bar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark myside"
    style="width: 20%"
  >
    <a class="navbar-brand ps-3" href="#">
      <img
        src="@/assets/imgs/tooth.png"
        alt="Bootstrap"
        width="25"
        height="25"
      /><a class="smile brand align-middle ms-2 me-5" href="/">uSmile</a>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <router-link to="/home" tag="a" exact>
        <li class="nav-item">
          <a href="#" class="nav-link" aria-current="page"
            ><i class="bi bi-speedometer me-2"></i>Home</a
          >
        </li>
      </router-link>
      <router-link to="/service" tag="a" exact>
        <li class="nav-item">
          <a href="#" class="nav-link" aria-current="page"
            ><i class="bi bi-bag-check me-2"></i>Services</a
          >
        </li>
      </router-link>
      <router-link to="/patients" tag="a" exact>
        <li class="nav-item">
          <a href="#" class="nav-link" aria-current="page"
            ><i class="bi bi-person-circle me-2"></i>Patients</a
          >
        </li>
      </router-link>
      <router-link to="/rendez-vous" tag="a" exact>
        <li class="nav-item">
          <a href="#" class="nav-link" aria-current="page"
            ><i class="bi bi-calendar-date me-2"></i>Reservations</a
          >
        </li>
      </router-link>
      <router-link to="/consultation" tag="a" exact>
        <li class="nav-item">
          <a href="#" class="nav-link" aria-current="page"
            ><i class="bi bi-calendar-date me-2"></i>Consultation</a
          >
        </li>
      </router-link>
    </ul>
    <hr />
    <router-link to="/" tag="a" exact>
      <a href="#" id="sign-out" class="nav-link py-2 px-3" aria-current="page"
        ><i class="bi bi-box-arrow-in-right me-2" />Déconnexion</a
      >
    </router-link>
  </div>
</template>

<script>
export default {
  name: "sidebar",
};
</script>

<style lang="scss" scoped>
.myside {
  background-color: rgba(0, 0, 0, 0.966) !important;
}

* {
  text-decoration: none;
  color: white !important;
}

ul {
  color: white;
  text-decoration: none !important;
  .nav-link {
    border-radius: 5px;
  }
}
.nav-link:not(.router-link-active):hover {
  background-color: #62d2a2;
}

a {
  text-decoration: none !important;
}
#sign-out:hover {
  background-color: red !important;
  border-radius: 5px;
}

.router-link-active {
  background-color: #1fab89;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  :hover {
    text-decoration: none !important;
    background-color: #1fab89 !important;
    border-radius: 5px;
  }
}
.main-bar {
  min-height: 100vh;
}

.smile {
  font-weight: bold;
  font-size: 20px;
}
</style>
