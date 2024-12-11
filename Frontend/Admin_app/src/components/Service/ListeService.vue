<script>
import axios from "axios";

export default {
  name: "ListSer",
  data() {
    return {
      services: [],
      pageOfItems: [],
      //add props
      addid: "",
      addnom: "",
      addprix: "",
      //edit props
      editid: "",
      editnom: "",
      editprix: "",
    };
  },
  created() {
    this.getSers();
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    async getSers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/service");
        console.log(response);
        this.services = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSer(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/service/${id}`);
        this.getSers();
      } catch (error) {
        console.log(error);
      }
    },
    async getById(id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/service/${id}/`
        );
        console.log(response);
        this.editid = response.data.service.id;
        this.editnom = response.data.service.nom;
        this.editprix = response.data.service.prix;
      } catch (error) {
        console.log(error);
      }
    },
    async updateSer() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/service/${this.editid}`, {
          nom: this.editnom,
          prix: this.editprix,
        });
        this.editid = "";
        this.editnom = "";
        this.editprix = "";
        this.getSers();
      } catch (error) {
        console.log(error.message);
      }
    },
    async addSer() {
      try {
        console.log(this.addnom);
        console.log(this.addprix);
        await axios.post("http://127.0.0.1:8000/api/service/", {
          nom: this.addnom,
          prix: this.addprix,
        });
        this.addnom = "";
        this.addprix = "";
        this.getSers();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="container-all">
    <div class="table-container p-5 shadow-lg">
      <div class="header-card d-flex justify-content-between pb-3">
        <div class="ms-3 mt-4"><h4>Liste des service</h4></div>

        <div class="mt-4 me-5"></div>
        <div class="mt-4 me-5">
          <button
            type="button"
            class="add-patient btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#addModal"
          >
            <i class="bi bi-person-plus-fill me-1"></i> Ajouter un service
          </button>
        </div>
      </div>
      <div class="table-temp">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">nom</th>
              <th scope="col">prix</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pageOfItems" :key="item.id">
              <td scope="row">{{ item.id }}</td>
              <td>{{ item.nom }}</td>
              <td>{{ item.prix }}</td>
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
                  @click="deleteSer(item.id)"
                >
                  <i class="bi bi-person-x-fill me-1"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center card-footer pb-0 pt-3">
          <jw-pagination
            :items="services"
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
                  Ajouter Service
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
                        >nom</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="addnom"
                        required
                      />
                    </div>
                    <div class="mb-2">
                      <label for="exampleInputPassword1" class="form-label"
                        >prix</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        v-model="addprix"
                        required
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
                  @click="addSer()"
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
                  Modifier Service
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
                    <label class="form-label">nom</label>
                    <input type="text" class="form-control" v-model="editnom" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">prix</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="editprix"
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
                  @click="updateSer"
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
