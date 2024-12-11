<template>
  <div class="container">
    <cards-count-vue></cards-count-vue>
    <div class="container row px-5">
      <div class="container col-6">
        <h4 class="header text-center py-3">Consultations d'aujourd'hui</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Date consultations</th>
              <th scope="col">temps debut</th>
              <th scope="col">Id service</th>
              <th scope="col">Id patient</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in consultations" :key="item.id">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.date_consult }}</td>
              <td>{{ item.temp_dep }}</td>
              <td>{{ item.id_ser }}</td>
              <td>{{ item.id_pat }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container col-6">
        <h4 class="header text-center py-3">Patients recément ajoutés</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">cin</th>
              <th scope="col">nom</th>
              <th scope="col">prenom</th>
              <th scope="col">genre</th>
              <th scope="col">date naissance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in patients" :key="item.id">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.cin }}</td>
              <td>{{ item.nom }}</td>
              <td>{{ item.prenom }}</td>
              <td>{{ item.genre }}</td>
              <td>{{ item.date_naissance }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardsCountVue from "../components/Dashboard/CardsCount.vue";

export default {
  data() {
    return {
      consultations: [],
      patients: [],
    };
  },
  created() {
    this.getConsult();
    this.getPatient();
  },
  methods: {
    async getConsult() {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/consultAujourdhui"
      );
      this.consultations = JSON.parse(JSON.stringify(res.data.consultations));
    },
    async getPatient() {
      const res = await axios.get("http://127.0.0.1:8000/api/latest");
      this.patients = JSON.parse(JSON.stringify(res.data.patients));
    },
  },
  components: { CardsCountVue },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #1f94ca;
  border-radius: 10px 10px 0 0;
  color: #fff;
  font-size: 17px;
}
</style>
