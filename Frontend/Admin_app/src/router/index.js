import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import PatientsVue from "@/views/Patients.vue";
import RendezVousVue from "@/views/Rendez-vous.vue";
import TestInputVue from "@/views/TestInput.vue";
import ConsultationVue from "@/views/Consultation.vue";
import LoginVue from "@/views/Login.vue";
import ServiceVue from "@/views/Service.vue";
import OrdonnanceVue from "@/views/Ordonnance.vue";
import CertificatVue from "@/views/CertificatMedical.vue";
import ConsultationPVue from "@/views/ConsultationPatient.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/patients",
    name: "patients",
    component: PatientsVue,
  },
  {
    path: "/rendez-vous",
    name: "rendez-vous",
    component: RendezVousVue,
  },
  {
    path: "/test",
    name: "test",
    component: TestInputVue,
  },
  {
    path: "/consultation",
    name: "consultation",
    component: ConsultationVue,
  },
  {
    path: "/service",
    name: "service",
    component: ServiceVue,
  },
  {
    path: "/ordonnance/:id",
    name: "ordonnance",
    component: OrdonnanceVue,
  },
  {
    path: "/certificat/:id",
    name: "certificat",
    component: CertificatVue,
  },
  {
    path: "/consultation/:id",
    name: "consultationpatient",
    component: ConsultationPVue,
  },
  {
    path: "/",
    name: "login",
    component: LoginVue,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
