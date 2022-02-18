<template>
  <v-container class="text-center">
    <v-card>
      <v-card-title>Detalles Película</v-card-title>
      <v-card-subtitle
        ><h1>{{ pelicula.nombre }}</h1></v-card-subtitle
      >
      <v-card-text>
        <v-menu
          ref="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="pelicula.anio"
              label="Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="pelicula.anio"
            no-title
            @input="menu1 = false"
            disabled
          ></v-date-picker>
        </v-menu>
      </v-card-text>
      <v-card-text>
        <v-text-field label="Resumen" v-model="pelicula.resumen" readonly />
      </v-card-text>
      <v-card-text>
        <h2>Calificación</h2>
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
      this.pelicula.anio = datos.anio.substr(0, 10);
    },
  },
  created() {
    this.verPelicula();
  },
};
</script>
