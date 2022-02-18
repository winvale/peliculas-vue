<template>
  <v-container class="text-center">
    <v-card>
      <v-card-title>Detalles Pelicula</v-card-title>
      <v-card-subtitle
        ><h1>{{ pelicula.nombre }}</h1></v-card-subtitle
      >
      <v-card-text>
        <v-text-field v-model="pelicula.anio" readonly />
      </v-card-text>
      <v-card-text>
        <v-text-field v-model="pelicula.resumen" readonly />
      </v-card-text>
      <v-card-text>
        <v-rating dense v-model="pelicula.rating" readonly></v-rating>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ViewMovie",
  data() {
    return {
      pelicula: {
        id: null,
        nombre: "",
        anio: null,
        rating: 0,
        resumen: "",
      },
    };
  },
  methods: {
    async verPelicula() {
      const res = await fetch(
        `https://apiadmpelicula.herokuapp.com/peliculas/details/${this.$route.params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );
      const datos = await (await res.json()).pelicula;
      this.pelicula = datos;
    },
  },
  created() {
    this.verPelicula();
  },
};
</script>
