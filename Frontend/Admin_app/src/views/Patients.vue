<template>
    <div class="container">
        <patients-list-vue/>
    </div>
</template>

<script>
import PatientsListVue from '../components/Patients/PatientsList.vue'



export default {
    name:'patients',
    components:{PatientsListVue}
}
</script>


