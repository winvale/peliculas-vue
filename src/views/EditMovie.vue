<template>
  <v-container class="text-center">
    <v-card>
      <v-card-title>Detalles Película</v-card-title>
      <v-card-subtitle
        ><h1>{{ pelicula.nombre }}</h1></v-card-subtitle
      >
      <v-card-text>
        <h2>Fecha de estreno</h2>
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
          ></v-date-picker>
        </v-menu>
      </v-card-text>
      <v-card-text>
        Sinapsis
        <v-text-field v-model="pelicula.resumen" />
      </v-card-text>
      <v-card-text>
        <h4>Calificación</h4>
        <v-rating dense v-model="pelicula.rating"></v-rating>
      </v-card-text>
      <v-card-actions>
        <v-btn block class="success" @click="editarPelicula()"
          >Actualizar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "EditMovie",
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
      this.nuevaPelicula = datos;
    },
    async editarPelicula() {
      await fetch(
        `https://apiadmpelicula.herokuapp.com/peliculas/edit/${this.$route.params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(this.pelicula),
        }
      );
      this.$router.push("/");
    },
  },
  created() {
    this.verPelicula();
    this.pelicula.id = this.$route.params.id;
  },
};
</script>
