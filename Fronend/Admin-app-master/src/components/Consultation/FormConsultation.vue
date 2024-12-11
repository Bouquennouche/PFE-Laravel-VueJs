<template>
  <div class="myform shadow rounded">
    <div class="header py-3">
      <h6 class="text-center">Nouvelle consultation</h6>
    </div>
    <div class="container forma pt-2 pb-4">
      <form>
        <h5 class="mt-2">Services</h5>
        <div class="form-check" v-for="service in services" :key="service.id">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            :value="service.id"
            v-model="serv"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            {{ service.NOM_SERVICE }}
          </label>
        </div>

        <div class="mb-2">
          <label for="exampleInputPassword1" class="form-label">Nb dents</label>
          <input type="number" class="form-control" v-model="nb_dents">
        </div>
        <div class="mb-2">
          <label class="form-label">Prix</label>
          <input type="text" class="form-control" v-model="price">
        </div>
        <button type="button" class="btn btn-success mt-3 px-4" @click="getService(serv)">Success</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "formConsultation",
  data: ()=>{
    return {
      services:[],
      serv: '',
      price: '',
      nb_dents:'',
    };
  },
  watch:{
      serv:function(v){
            this.price = this.services[(+v)-2].PRIX * this.nb_dents;
      },
      nb_dents:function(v){
            this.price *= v;
      },
  },
  created() {
    this.getServices();
  },
  methods: {
    async getServices() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/service");
        this.services = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #1f94ca;
  border-radius: 10px 10px 0 0;
  color: #fff;
}
.forma {
  max-height: 55vh !important;

  border-radius: 0 0 10px 10px;
}
</style>
