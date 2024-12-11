<template>
  <div class="contain-all">
    <div class="table-container p-5 shadow-lg">
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
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">CIN</th>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Numero de telephone</th>
              <th scope="col">Genre</th>
              <th scope="col">Date naissence</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in pageOfItems" :key="patient.id">
              <td scope="row">{{ patient.id }}</td>
              <td>{{ patient.cin }}</td>
              <td>{{ patient.nom }}</td>
              <td>{{ patient.prenom }}</td>
              <td>{{ patient.num_tel }}</td>
              <td>{{ patient.genre }}</td>
              <td>{{ patient.date_naissance }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-warning ms-1 me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  @click="getById(patient.id)"
                >
                  <i class="bi bi-pencil-square me-1"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="deletePatient(patient.id)"
                >
                  <i class="bi bi-person-x-fill me-1"></i>
                </button>
                <router-link
                  :to="{
                    name: 'consultationpatient',
                    params: { id: patient.id },
                  }"
                >
                  <button
                    type="button"
                    class="btn btn-outline-primary ms-1 me-2"
                  >
                    <i class="bi bi-pencil-square me-1"></i>Consultation
                  </button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center card-footer pb-0 pt-3">
          <jw-pagination
            :items="patients"
            @changePage="onChangePage"
          ></jw-pagination>
        </div>
      </div>
    </div>

    <!-- add modal VUE -->

    <section class="add-modal">
      <div class="container">
        <!-- Modal -->
        <div
          class="modal fade"
          id="addModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title fs-5" id="exampleModalLabel">
                  Ajouter patient
                </h2>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body container">
                <!-- form container -->

                <div class="container">
                  <form>
                    <div class="mb-2">
                      <label for="exampleInputPassword1" class="form-label"
                        >CIN</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="addcin"
                      />
                    </div>
                    <div class="mb-2">
                      <label for="exampleInputPassword1" class="form-label"
                        >Nom</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="addNom"
                      />
                    </div>
                    <div class="mb-2">
                      <label for="exampleInputPassword1" class="form-label"
                        >Prenom</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="addPrenom"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Numero de Telephone</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="addnum_tel"
                      />
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Genre</label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        v-model="addGenre"
                      >
                        <option selected value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                      </select>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Date de naissence</label>
                      <input
                        type="date"
                        class="form-control"
                        id="exampleInputPassword1"
                        v-model="addDateNaissence"
                      />
                    </div>
                  </form>
                </div>
                <!-- end of form container -->
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
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  @click="addPatient()"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
                  Modifier patient
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
                  <div class="mb-2">
                    <label for="exampleInputPassword1" class="form-label"
                      >CIN</label
                    >
                    <input type="text" class="form-control" v-model="editcin" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Nom</label>
                    <input type="text" class="form-control" v-model="editNom" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Prenom</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="editPrenom"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Numero de Telephone</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="editnum_tel"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"
                      >Genre</label
                    >
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="editGenre"
                      selected="editGenre"
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
                      v-model="editDate"
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
                  @click="updatePatient"
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
  name: "listePatients",
  data: () => {
    return {
      pageOfItems: [],
      patients: [],
      // add props
      addNom: "",
      addPrenom: "",
      addcin: "",
      addnum_tel: "",
      addGenre: "",
      addDateNaissence: null,
      // edit props
      editId: "",
      editNom: "",
      editPrenom: "",
      editcin: "",
      editnum_tel: "",
      editGenre: "",
      editDate: "",
    };
  },
  created() {
    this.getPatients();
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    async getPatients() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/patient");
        this.patients = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addPatient() {
      try {
        await axios.post("http://127.0.0.1:8000/api/patient", {
          cin: this.addcin,
          nom: this.addNom,
          prenom: this.addPrenom,
          num_tel: this.addnum_tel,
          genre: this.addGenre,
          date_naissance: this.addDateNaissence,
        });
        this.addcin = "";
        this.addNom = "";
        this.addPrenom = "";
        this.addnum_tel = "";
        this.addGenre = "";
        this.addDateNaissenc = "";
        this.getPatients();
      } catch (error) {
        console.log(error);
      }
    },
    async deletePatient(id) {
      try {
        await axios.delete("http://127.0.0.1:8000/api/patient/" + id);
        this.getPatients();
      } catch (error) {
        console.log(error);
      }
    },
    async getById(id) {
      try {
        this.editId = id;
        const response = await axios.get(
          `http://127.0.0.1:8000/api/patient/${id}`
        );
        this.editcin = response.data.patient.cin;
        this.editNom = response.data.patient.nom;
        this.editPrenom = response.data.patient.prenom;
        this.editnum_tel = response.data.patient.num_tel;
        this.editGenre = response.data.patient.genre;
        this.editDate = response.data.patient.date_naissance;
      } catch (error) {
        console.log(error);
      }
    },
    async updatePatient() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/patient/${this.editId}`, {
          cin: this.editcin,
          nom: this.editNom,
          prenom: this.editPrenom,
          num_tel: this.editnum_tel,
          genre: this.editGenre,
          date_naissance: this.editDate,
        });
        this.editId = "";
        this.editcin = "";
        this.editNom = "";
        this.editPrenom = "";
        this.editnum_tel = "";
        this.editGenre = "";
        this.editDate = "";
        this.getPatients();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.contain-all {
  max-height: 100vh;
  overflow-y: scroll;
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
