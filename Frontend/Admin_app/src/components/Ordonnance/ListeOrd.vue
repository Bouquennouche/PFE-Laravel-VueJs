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
              <th scope="col">Nombre de jours</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="certificat in certificats" :key="certificat.id">
              <td scope="row">{{ certificat.id }}</td>
              <td>{{ certificat.nb_jrs }}</td>
              <td>{{ certificat.date }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-warning ms-1 me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  @click="getById(certificat.id)"
                >
                  <i class="bi bi-pencil-square me-1"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="deleteCert(certificat.id)"
                >
                  <i class="bi bi-person-x-fill me-1"></i>
                </button>
                <router-link to="/consultation">
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
                  Ajouter Certificat
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
                        >Nombre de jours</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="addNbrJrs"
                      />
                    </div>
                    <div class="mb-2">
                      <label for="exampleInputPassword1" class="form-label"
                        >Date de Repos</label
                      >
                      <input
                        type="date"
                        class="form-control"
                        v-model="adddate"
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
                  @click="addCert()"
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
                  Modifier Certificat
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
                    <label class="form-label">Nombre de Jours</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="editNbrJrs"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Date de Repos</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="editdate"
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
                  @click="updateCert"
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
  name: "listeCertificats",
  data: () => {
    return {
      certificats: [],
      // add props
      addNbrJrs: "",
      adddate: "",

      // edit props
      editId: "",
      editNbrJrs: "",
      editdate: "",
    };
  },
  created() {
    this.getCerts();
  },
  methods: {
    async getCerts() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/certificat_medical",
          {
            params: {
              id: this.$route.params.id,
            },
          }
        );
        this.certificats = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addCert() {
      try {
        await axios.post("http://127.0.0.1:8000/api/certificat_medical", {
          nb_jrs: this.addNbrJrs,
          date: this.adddate,
          id_consult: this.$route.params.id,
        });
        this.addNbrJrs = "";
        this.adddate = "";
        this.getCerts();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCert(id) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/certificat_medical/${id}`
        );
        this.getCert();
      } catch (error) {
        console.log(error);
      }
    },
    async getById(id) {
      try {
        this.editId = id;
        const response = await axios.get(
          `http://127.0.0.1:8000/api/certificat_medical/${id}`
        );
        this.editId = response.data.certificatmedical.id;
        this.addNbrJrs = response.data.certificatmedical.nom;
        this.adddate = response.data.certificatmedical.prenom;
      } catch (error) {
        console.log(error);
      }
    },
    async updateCert() {
      try {
        await axios.put(
          `http://127.0.0.1:8000/api/certificat_medical/${this.editId}`,
          {
            nb_jrs: this.addNbrJrs,
            date: this.adddate,
            id_consult: this.$route.params.id,
          }
        );
        this.editId = "";
        this.addNbrJrs = "";
        this.adddate = "";
        this.getCerts();
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
