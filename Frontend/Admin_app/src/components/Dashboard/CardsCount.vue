<template>
  <div class="container p-5">
    <div class="row">
      <div class="col-md-4 col-xl-3">
        <div class="card bg-c-blue order-card shadow-lg">
          <div class="card-block">
            <h6 class="m-b-20">Patients</h6>
            <h2 class="text-right">
              <i class="bi bi-people-fill me-1"></i
              ><span> {{ patients.length }}</span>
            </h2>
          </div>
        </div>
      </div>

      <div class="col-md-4 col-xl-3">
        <div class="card bg-c-green order-card shadow-lg">
          <div class="card-block">
            <h6 class="m-b-20">Ordonances</h6>
            <h2 class="text-right">
              <i class="bi bi-clipboard2-pulse me-1"></i
              ><span>{{ ordonnances.length }}</span>
            </h2>
          </div>
        </div>
      </div>

      <div class="col-md-4 col-xl-3">
        <div class="card bg-c-yellow order-card shadow-lg">
          <div class="card-block">
            <h6 class="m-b-20">Rendez-vous</h6>
            <h2 class="text-right">
              <i class="bi bi-calendar-check me-1"></i
              ><span> {{ rendez_vous.length }}</span>
            </h2>
          </div>
        </div>
      </div>

      <div class="col-md-4 col-xl-3">
        <div class="card bg-c-pink order-card shadow-lg">
          <div class="card-block">
            <h6 class="m-b-20">Médicaments</h6>
            <h2 class="text-right">
              <i class="bi bi-capsule me-1"></i
              ><span>{{ medicaments.length }}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return {
      medicaments: [],
      ordonnances: [],
      patients: [],
      rendez_vous: [],
    };
  },
  created() {
    this.getMeds();
    this.getOrds();
    this.getPatients();
    this.getRdvs();
  },
  methods: {
    async getMeds() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/medicament"
        );

        this.medicaments = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getOrds() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/ordonnance",
          {
            params: {
              id: this.$route.params.id,
            },
          }
        );
        this.ordonnances = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getPatients() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/patient");

        this.patients = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getRdvs() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/rendez_vous"
        );

        this.rendez_vous = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin-top: 20px;
  background: #fafafa;
}
.order-card {
  color: #fff;
}

.bg-c-blue {
  background: linear-gradient(45deg, #4099ff, #73b4ff);
}

.bg-c-green {
  background: linear-gradient(45deg, #2ed8b6, #59e0c5);
}

.bg-c-yellow {
  background: linear-gradient(45deg, #ffb64d, #ffcb80);
}

.bg-c-pink {
  background: linear-gradient(45deg, #ff5370, #ff869a);
}

.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.card .card-block {
  padding: 25px;
}

.order-card i {
  font-size: 26px;
}

.f-left {
  float: left;
}

.f-right {
  float: right;
}
</style>
