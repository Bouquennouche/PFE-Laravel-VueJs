<template>
  <div class="row w-75 bg-light shadow m-auto mt-5 rounded">
    <div class="col-6">
      <div class="content">
        <div class="p-5">
          <div class="row calendar container m-auto">
            <h2>Calendrier</h2>
            <h5 class="text-center">Selectionnez une date</h5>

            <vc-calendar
              class="my-calendar"
              :attributes="attributes"
              title-position="left"
              expanded
              color="green"
              :min-date="new Date()"
              :disabled-dates="disabledDates"
              @dayclick="onDayClick"
            />
          </div>
          <div class="row mt-3 m-auto container">
            <h5 class="text-center mt-3">Selectionnez l'horaire</h5>
            <div
              class="horaires bg-light border text-light row row-cols-1 row-cols-md-4 g-2 m-auto py-3 px-2 rounded-3"
            >
              <div
                class="col text-dark text-center"
                v-for="(hour, index) in horaireTravail"
                :key="index"
              >
                <div class=""></div>
                <button
                  type="button"
                  class="btn btn-success hour px-3 py-2 rounded"
                  :disabled="hourClicked.includes(index) || temp.includes(hour)"
                  @click="disableHour(index, hour)"
                >
                  {{ hour }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 p-5 reserv-infos text-light">
      <h2>Infos de reservation</h2>
      <form v-if="show">
        <div class="row">
          <div class="col-sm mb-3 ms-1">
            <label class="form-label">Votre CIN</label>
            <input
              type="text"
              v-model="cin"
              class="form-control"
              required
              aria-describedby="emailHelp"
              placeholder="Entre votre CIN"
            />
          </div>
        </div>
        <button type="button" @click="verifier()" class="btn btn-success px-3">
          Verifier
        </button>
        <div class="mt-4">
          <h3 class="mb-3">Pour prendre un rendez-vous, vous devez :</h3>
          <ul class="consigne">
            <li>
              Choisir la date et l'heure qui vous conviennent dans la section
              "Calendrier".
            </li>
            <li>Entrer votre CIN et cliquer sur "Verifier".</li>
            <li>
              Si le CIN n'existe pas, vous devez remplir un formulaire contenant
              vos informations personnelles.
            </li>
            <li>
              Sinon, il suffit de choisir un service, et confirmer votre
              réservation.
            </li>
          </ul>
        </div>
      </form>
      <br />
      <div class="row" v-if="!show">
        <div class="col-md-6" v-if="!exist">
          <label for="inputEmail4" class="form-label">Nom</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="nom"
            @blur="validateNom"
          />
        </div>
        <div class="col-md-6" v-if="!exist">
          <label for="inputPassword4" class="form-label">Prenom</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="prenom"
            @blur="validatePrenom"
          />
        </div>
        <div class="col-sm mb-3" v-if="!exist">
          <label class="form-label">Numero de Telephone</label>
          <input
            type="text"
            v-model="num_tel"
            class="form-control"
            required
            id="numtel"
            aria-describedby="emailHelp"
            @blur="validateTel"
          />
        </div>
        <div class="col-6" v-if="!exist">
          <label class="form-label">Genre</label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="genre"
          >
            <option selected value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>
        <div class="col-6" v-if="!exist">
          <label for="inputAddress" class="form-label">Date naissance</label>
          <input type="date" class="form-control" v-model="date" />
        </div>
        <div class="col-12">
          <label for="inputAddress" class="form-label">Service</label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="serviceid"
            placeholder="Selectionner une service"
          >
            <option v-for="item in services" :value="item.id" :key="item.id">
              {{ item.nom }}
            </option>
          </select>
        </div>
        <div class="col-12 mt-4">
          <button class="btn btn-success" @click="addrsv()">Reserver</button>
        </div>
      </div>
    </div>

    <!-- modals -->
    <div class="modals">
      <div class="suceess-modal">
        <sweet-modal icon="success" ref="modal1" width="30vw">
          <h2>Succés</h2>
          Les informations sont envoyées avec succés
        </sweet-modal>
      </div>
      <div class="error-modal">
        <div class="suceess-modal">
          <sweet-modal icon="error" ref="modal2" width="30vw">
            <h2>Erreur</h2>
            Veuillez remplir tous les informations <br />
            Ou Entrer des informations valides
          </sweet-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VCalendar from "v-calendar";
import moment from "moment";
import axios from "axios";
Vue.use(VCalendar, {
  componentPrefix: "vc",
});

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
      hourClicked: [],
      days: [],
      temp: [],
      exist: false,
      patient: [],
      services: [],
      cin: "",
      nom: "",
      prenom: "",
      date: "",
      serviceid: "",
      genre: "",
      horaire: "",
      num_tel: "",
      show: true,
      disabledDates: [
        {
          start: new Date(2023, 0, 1),
          end: new Date(2023, 0, 1),
        },
        {
          start: new Date(2023, 4, 1),
          end: new Date(2023, 4, 1),
        },
        {
          start: new Date(2023, 4, 24),
          end: new Date(2023, 4, 24),
        },
        {
          start: new Date(2023, 6, 30),
          end: new Date(2023, 6, 30),
        },
        {
          start: new Date(2023, 7, 14),
          end: new Date(2023, 7, 14),
        },
        {
          start: new Date(2023, 7, 20),
          end: new Date(2023, 7, 20),
        },
        {
          start: new Date(2023, 7, 21),
          end: new Date(2023, 7, 21),
        },
        {
          start: new Date(2023, 9, 13),
          end: new Date(2023, 9, 13),
        },
        {
          start: new Date(2023, 10, 1),
          end: new Date(2023, 10, 1),
        },
        {
          start: new Date(2023, 10, 6),
          end: new Date(2023, 10, 6),
        },
        { weekdays: [1, 7] },
      ],
    };
  },
  computed: {
    selectedDate() {
      if (this.days.length > 0) {
        const date = this.days[this.days.length - 1].date;
        this.nom = "";
        this.prenom = "";
        return moment(date).format("YYYY-MM-DD");
      } else {
        return null;
      }
    },
    attributes() {
      return this.days.map((day) => ({
        highlight: true,
        dates: day.date,
      }));
    },
  },
  created() {
    this.getHoraireTravail();
    this.getSers();
  },
  methods: {
    success_message() {
      this.$refs.modal1.open();
    },
    failed_message() {
      this.$refs.modal2.open();
    },
    async getSers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/service");
        this.services = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    onDayClick(day) {
      if (!day.isDisabled) {
        this.days = [
          {
            id: day.id,
            date: day.date,
          },
        ];
        this.getHoraireTravail();
      }
    },
    formatDate(dateString) {
      return moment(dateString).format("D MMMM YYYY");
    },
    disableHour(index, hour) {
      this.hourClicked = [index]; // select just one hour
      this.horaire = hour;
    },
    async verifier() {
      if (this.cin != "") {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/exists", {
            params: {
              cin: this.cin,
            },
          });
          if (response.data.message != "null") {
            this.cin = response.data.patient.cin;
            this.nom = response.data.patient.nom;
            this.prenom = response.data.patient.prenom;
            this.date = response.data.patient.date_naissance;
            this.num_tel = response.data.patient.num_tel;
            this.genre = response.data.patient.genre;
            this.exist = true;
          } else {
            this.exist = false;
          }
          console.log(this.exist);
        } catch (error) {
          console.log(error);
        }
      }
      this.show = false;
    },
    async getHoraireTravail() {
      if (this.selectedDate != undefined) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/heures`, {
            params: {
              date: this.selectedDate,
            },
          });
          this.temp = response.data.heures;
          console.log(this.temp);
        } catch (error) {
          console.log(error);
        }
      } else {
        this.temp = [];
      }
    },
    validateNom() {
      const regex = /^[a-zA-Z]+$/;
      const userInput = document.querySelector("#lastName");
      let isTrue = null;
      console.log(userInput);
      if (regex.test(this.nom)) {
        userInput.classList.remove("is-invalid");
        isTrue = true;
        if (isTrue) {
          userInput.classList.add("is-valid");
        }
      } else {
        userInput.classList.add("is-invalid");
        isTrue = false;
      }
    },
    validatePrenom() {
      const regex = /^[a-zA-Z]+$/;
      const userInput = document.querySelector("#firstName");
      let isTrue = null;
      console.log(userInput);
      if (regex.test(this.nom)) {
        userInput.classList.remove("is-invalid");
        isTrue = true;
        if (isTrue) {
          userInput.classList.add("is-valid");
        }
      } else {
        userInput.classList.add("is-invalid");
        isTrue = false;
      }
    },
    validateTel() {
      const regex = /^[a-zA-Z]+$/;
      const userInput = document.querySelector("#numtel");
      let isTrue = null;
      console.log(userInput);
      if (regex.test(this.nom)) {
        userInput.classList.remove("is-invalid");
        isTrue = true;
        if (isTrue) {
          userInput.classList.add("is-valid");
        }
      } else {
        userInput.classList.add("is-invalid");
        isTrue = false;
      }
    },
    async addrsv() {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/rendez_vous`,
          {
            nom: this.nom,
            cin: this.cin,
            prenom: this.prenom,
            genre: this.genre,
            date_naissance: this.date,
            num_tel: this.num_tel,
            date_rdv: this.selectedDate,
            temp_dep: this.horaire,
            id_ser: this.serviceid,
          }
        );
        this.cin = "";
        this.nom = "";
        this.prenom = "";
        this.genre = "";
        this.date = "";
        this.num_tel = "";
        this.horaire = "";
        this.serviceid = "";
        this.selectedDate = "";
        this.getHoraireTravail();
        this.hourClicked = [];
        this.show = true;
        this.success_message();
      } catch (error) {
        this.failed_message();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hour {
  font-size: 12px;
  font-weight: bold;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.w-75 {
  width: 75% !important;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.m-auto {
  margin: auto !important;
}

.mt-5 {
  margin-top: 3rem !important;
}

.rounded {
  border-radius: 0.25rem !important;
}

.col-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.p-5 {
  padding: 3rem !important;
}

.calendar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.my-calendar {
  background-color: #f8f9fa;
}

.reserv-infos {
  background: #00bf8f; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0e8056,
    #00bf8f
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #074b3b,
    #00bf8f
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.consigne {
  li {
    margin-bottom: 10px;
  }
}
</style>
