<script>
import axios from "axios";

export default {
  name: "ListRdv",
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
      temp: [],

      rendez_vous: [],
      pageOfItems: [],
      services: [],

      //edit props
      editcin: "",
      editid: "",
      editnom: "",
      editprenom: "",
      editgenre: "",
      editdate_nai: "",
      editnumtel: "",
      editdate_rdv: "",
      edittemp_dep: "",
      editser: "",
    };
  },
  created() {
    this.getRdvs();
    this.getSers();
    this.getHoraireTravail();
  },
  methods: {
    async getSers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/service");
        this.services = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    async getRdvs() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/rendez_vous"
        );
        console.log(response);
        this.rendez_vous = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteRdv(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/rendez_vous/${id}`);
        this.getRdvs();
      } catch (error) {
        console.log(error);
      }
    },

    async getById(id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/rendez_vous/${id}/`
        );
        console.log(response);
        this.editcin = response.data.cin;
        this.editid = response.data.id;
        this.editnom = response.data.nom;
        this.editprenom = response.data.prenom;
        this.editgenre = response.data.genre;
        this.editdate_nai = response.data.date_naissance;
        this.editnumtel = response.data.num_tel;
        this.editdate_rdv = response.data.date_rdv;
        this.edittemp_dep = response.data.temp_dep;
        this.editser = response.data.id_ser;
        this.getHoraireTravail();
      } catch (error) {
        console.log(error);
      }
    },
    async updateRdv() {
      try {
        await axios.put(
          `http://127.0.0.1:8000/api/rendez_vous/${this.editid}`,
          {
            cin: this.editcin,
            nom: this.editnom,
            prenom: this.editprenom,
            genre: this.editgenre,
            date_naissance: this.editdate_nai,
            num_tel: this.editnumtel,
            date_rdv: this.editdate_rdv,
            temp_dep: this.edittemp_dep,
            id_ser: this.editser,
          }
        );
        this.editnom = "";
        this.editprenom = "";
        this.editgenre = "";
        this.editdate_nai = "";
        this.editnumtel = "";
        this.editdate_rdv = "";
        this.edittemp_dep = "";
        this.getRdvs();
      } catch (error) {
        console.log(error);
      }
    },
    async confirm(id) {
      try {
        await axios.get(`http://127.0.0.1:8000/api/rendez_vous/confirm/${id}`);
        this.getRdvs();
      } catch (error) {
        console.log(error);
      }
    },
    async getHoraireTravail() {
      if (this.editdate_rdv != "") {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/heures`, {
            params: {
              date: this.editdate_rdv,
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

<template>
  <div class="container-all">
    <div class="table-container p-5 shadow-lg">
      <div class="header-card d-flex justify-content-between pb-3">
        <div class="ms-3 mt-4"><h4>Liste des reservations</h4></div>
        <div class="mt-4 me-5"></div>
      </div>
      <div class="table-temp">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Genre</th>
              <th scope="col">Telephone</th>
              <th scope="col">Date naissance</th>
              <th scope="col">Date consultation</th>
              <th scope="col">Temp Depart</th>
              <th scope="col">ID Service</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pageOfItems" :key="item.id">
              <td scope="row">{{ item.id }}</td>
              <td>{{ item.nom }}</td>
              <td>{{ item.prenom }}</td>
              <td>{{ item.genre }}</td>
              <td>{{ item.num_tel }}</td>
              <td>{{ item.date_naissance }}</td>
              <td>{{ item.date_rdv }}</td>
              <td>{{ item.temp_dep }}</td>
              <td>{{ item.id_ser }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-warning ms-1 me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  @click="getById(item.id)"
                >
                  <i class="bi bi-pencil-square me-1"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="deleteRdv(item.id)"
                >
                  <i class="bi bi-person-x-fill me-1"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-success ms-1 me-2"
                  @click="confirm(item.id)"
                >
                  <i class="bi bi-check-square me-1"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center card-footer pb-0 pt-3">
          <jw-pagination
            :items="rendez_vous"
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
                  Modifier Reservation
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
                    <label class="form-label">CIN</label>
                    <input type="text" class="form-control" v-model="editcin" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Nom</label>
                    <input type="text" class="form-control" v-model="editnom" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Prenom</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="editprenom"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"
                      >Genre</label
                    >
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="editgenre"
                      selected="editgenre"
                    >
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Date de naissence</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="editdate_nai"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Date de reservation</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="editdate_rdv"
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
                    <label class="form-label">ID Service</label>
                    <select class="form-control" v-model="editser">
                      <option
                        v-for="item in services"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.nom }}
                      </option>
                    </select>
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
                  @click="updateRdv"
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

<style lang="scss" scoped>
.contain-all {
  max-height: 100%;
  width: 100%;
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
