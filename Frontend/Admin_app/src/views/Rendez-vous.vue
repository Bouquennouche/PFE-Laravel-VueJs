<template>
  <div >
    <liste-rdv />
  </div>
</template>

<script>
import ListeRdv from "@/components/Rendez-vous/ListeRdv.vue";

export default {
  name: "",
  components: { ListeRdv },
};
</script>

<style lang="scss" scoped>
.container {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
}
</style>
