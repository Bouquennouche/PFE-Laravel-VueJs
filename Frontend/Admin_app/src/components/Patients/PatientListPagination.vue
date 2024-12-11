<template>
    <div class="">
      <div class="table-container p-5">
        <div class="header-card d-flex justify-content-between pb-3">
          <div class="ms-3 mt-4"><h4>Liste des patients</h4></div>
          <div class="mt-4 me-5">
            <button
              type="button"
              class="add-patient btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#addModal"
            >
              <i class="bi bi-person-plus-fill me-1"></i> ajouter un patient
            </button>
          </div>
        </div>
        <div class="table-temp">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">CIN</th>
                <th scope="col">Nom</th>
                <th scope="col">Prenom</th>
                <th scope="col">Genre</th>
                <th scope="col">Date naissence</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in pagesData" :key="patient.CIN">
                <td scope="row">{{ patient.CIN }}</td>
                <td>{{ patient.NOM }}</td>
                <td>{{ patient.PRENOM }}</td>
                <td>{{ patient.GENRE }}</td>
                <td>{{ patient.DATE_NAISSANCE }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-warning ms-1 me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    <i class="bi bi-pencil-square me-1"></i> Modifier
                  </button>
                  <button type="button" class="btn btn-outline-danger">
                    <i class="bi bi-person-x-fill me-1"></i> Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" v-on:click="getPreviousPage()">
                <a class="page-link" href="#">Previous</a>
              </li>
              <li
                class="page-item"
                v-for="page in totalPages()"
                :key="page"
                v-on:click="getDataPage(page)"
                :class="isActive(page)"
              >
                <a class="page-link" href="#">{{ page }}</a>
              </li>
              <li class="page-item" v-on:click="getNextPage()">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <section class="add-modal"><addModalVue /></section>
      <section><modify-modal-vue /></section>
    </div>
  </template>
  
  <script>
  import addModalVue from "./addModal.vue";
  import ModifyModalVue from "./ModifyModal.vue";
  import PaginationVue from "./Pagination.vue";
  import axios from "axios";
  
  export default {
    name: "listePatients",
    data: () => {
      return {
        patients: [],
        rowPerPage: 7,
        count: 0,
        pagesData: [],
        actualPage: 1,
      };
    },
    created() {
      this.getPatients();
    },
    methods: {
      async getPatients() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/patient");
          this.patients = response.data;
          this.count = this.patients.length;
        } catch (error) {
          console.log(error);
        }
      },
      totalPages() {
        return Math.ceil(this.count / this.rowPerPage);
      },
      getDataPage(noPage) {
        this.actualPage = noPage;
        this.pagesData = [];
        let initial = noPage * this.rowPerPage - this.rowPerPage;
        let final = noPage * this.rowPerPage;
        for (let i = initial; i < final; i++) {
          this.pagesData.push(this.patients[i]);
        }
        this.getDataPage = this.patients.slice(initial, fin);
      },
      getPreviousPage() {
        if (this.actualPage > 1) {
          this.actualPage--;
        }
        this.getDataPage(this.actualPage);
      },
      getNextPage() {
        if (this.actualPage < this.totalPages()) {
          this.actualPage++;
        }
        this.getDataPage(this.actualPage);
      },
      isActive(noPage) {
        return noPage == this.actualPage ? "active" : "";
      },
    },
    components: { addModalVue, ModifyModalVue, PaginationVue },
  };
  </script>
  
  <style lang="scss" scoped>
  .add-patient {
    font-size: 14px !important;
  }
  .btn {
    font-size: 12px;
  }
  .header-card {
    background-color: #1f94ca;
    border-radius: 10px 10px 0 0;
    color: white;
  }
  </style>
  