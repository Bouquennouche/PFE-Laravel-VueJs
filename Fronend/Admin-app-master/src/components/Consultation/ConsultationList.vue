<template>
  <div class="contain-all">
    <div class="table-container p-5 shadow-lg">
      <div class="header-card d-flex justify-content-between pb-3">
        <div class="ms-3 mt-4"><h4>Liste des consultations</h4></div>
      </div>
      <div class="table-temp">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Date Consult</th>
              <th scope="col">Temp Depart</th>
              <th scope="col">Id patient</th>
              <th scope="col">Id service</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="consultation in pageOfItems" :key="consultation.id">
              <td scope="row">{{ consultation.id }}</td>
              <td>{{ consultation.date_consult }}</td>
              <td>{{ consultation.temp_dep }}</td>
              <td>{{ consultation.id_pat }}</td>
              <td>{{ consultation.id_ser }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-warning ms-1 me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  @click="getById(consultation.id)"
                >
                  <i class="bi bi-pencil-square me-1"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="deleteConsult(consultation.id)"
                >
                  <i class="bi bi-person-x-fill me-1"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center card-footer pb-0 pt-3">
          <jw-pagination
            :items="consultations"
            @changePage="onChangePage"
          ></jw-pagination>
        </div>
      </div>
    </div>

    <!-- edit modal VUE -->

    <section>
      <div class="container">
        <!-- Modal -->
        <div
          class="modal fade"
          id="editModal"
          tabindex="-2"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title fs-5" id="exampleModalLabel1">
                  Modifier consultation
                </h2>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body container">
                <form>
                  <div class="mb-3">
                    <label class="form-label">Date Consultation</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="editdate_consult"
                      @input="getHoraireTravail()"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Temp Depart</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="edittemp_dep"
                      placeholder="Selectionner un horaire"
                    >
                      <option
                        v-for="item in horaireTravail"
                        v-bind:style="getItemStyle(item)"
                        v-bind:disabled="checkIfInArray(item)"
                        :value="item"
                        :key="horaireTravail.indexOf(item)"
                      >
                        {{ item }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"
                      >Id Patient</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      readonly
                      v-model="editid_pat"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Id Service</label>
                    <input
                      type="number"
                      class="form-control"
                      readonly
                      v-model="editid_ser"
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  @click="updateConsult"
                  data-bs-dismiss="modal"
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      horaireTravail: [
        "09:00:00",
        "09:30:00",
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
      ],
      consultations: [],
      pageOfItems: [],
      temp: [],

      editid: "",
      editid_ser: "",
      editid_pat: "",
      edittemp_dep: "",
      editdate_consult: "",
    };
  },
  created() {
    this.getConsults();
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    async getConsults() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/consultation"
        );
        this.consultations = response.data.consultations;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteConsult(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/consultation/${id}`);
        this.getConsults();
      } catch (error) {
        console.log(error);
      }
    },

    async getById(id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/consultation/${id}/`
        );
        console.log(response);
        this.editid = response.data.consultation.id;
        this.editdate_consult = response.data.consultation.date_consult;
        this.edittemp_dep = response.data.consultation.temp_dep;
        this.editid_ser = response.data.consultation.id_ser;
        this.editid_pat = response.data.consultation.id_pat;
        this.getHoraireTravail();
      } catch (error) {
        console.log(error);
      }
    },
    async updateConsult() {
      try {
        await axios.put(
          `http://127.0.0.1:8000/api/consultation/${this.editid}`,
          {
            date_consult: this.editdate_consult,
            temp_dep: this.edittemp_dep,
            id_ser: this.editid_ser,
            id_pat: this.editid_pat,
          }
        );
        this.editid = "";
        this.editdate_Consult = "";
        this.edittemp_dep = "";
        this.editid_ser = "";
        this.editid_pat = "";
        this.getConsults();
      } catch (error) {
        console.log(error);
      }
    },
    async getHoraireTravail() {
      if (this.editdate_consult != "") {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/heures`, {
            params: {
              date: this.editdate_consult,
            },
          });
          this.temp = response.data.heures;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.temp = [];
      }
    },
    checkIfInArray(item) {
      return this.temp.includes(item);
    },
    getItemStyle(item) {
      return this.checkIfInArray(item)
        ? { color: "white", background: "#de4452" }
        : {};
    },
  },
};
</script>

<style lang="scss" scoped>
.contain-all {
  max-height: 100vh;
  overflow-y: scroll;
}
.table-container {
  height: 100vh;
  width: 80vw;
}
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
