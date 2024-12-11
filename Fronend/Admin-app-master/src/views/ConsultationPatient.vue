<template>
  <consultation-list />
</template>

<script>
import ConsultationList from "@/components/Consultation/ConsultationPatient.vue";

export default {
  name: "consultation",
  data: () => {
    return {};
  },
  components: { ConsultationList },
};
</script>

<style lang="scss" scoped>
.contain-all {
  max-height: 100vh;
  overflow-y: scroll;
}
</style>
