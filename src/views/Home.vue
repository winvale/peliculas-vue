<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="nuevaPelicula.nombre"
            label="Ingrese nombre de nueva pelicula"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="nuevaPelicula.anio"
            type="date"
            label="Fecha de estreno"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-container>
            <v-btn
              block
              class="success"
              @click="agregarPelicula()"
              :disabled="
                !nuevaPelicula.nombre ||
                !nuevaPelicula.anio ||
                !nuevaPelicula.resumen
              "
              >Agregar</v-btn
            >
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-textarea
          height="100px"
          label="Resumen de la pelicula"
          v-model="nuevaPelicula.resumen"
        ></v-textarea>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="valorFiltro"
            :items="filtros"
            label="Filtrar por"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model="buscarNombre"
            label="Buscar pelicula por nombre"
          ></v-text-field
        ></v-col>
      </v-row>
      <v-row v-for="(pelicula, index) in mostrarPeliculas" :key="index">
        <v-col>
          <v-card>
            <v-card-title> {{ pelicula.nombre }}</v-card-title>
            <v-card-text> {{ pelicula.review }} </v-card-text>
            <v-card-text>
              {{ pelicula.rating }}
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-btn @click="verPelicula(pelicula.id)">Ver</v-btn>
                </v-col>
                <v-col>
                  <v-btn @click="editarPelicula(pelicula.id)">Editar</v-btn>
                </v-col>
                <v-col>
                  <v-btn @click="eliminarPelicula(pelicula.id)">Eliminar</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",

  components: {},
  data() {
    return {
      nuevaPelicula: {
        id: null,
        nombre: "",
        anio: null,
        rating: 0,
        resumen: "",
      },
      peliculas: [],
      filtros: ["Sin Filtro", "Mas recientes", "Calificacion"],
      valorFiltro: "Sin Filtro",
      buscarNombre: "",
      URL: "https://apiadmpelicula.herokuapp.com/peliculas/",
    };
  },
  computed: {
    mostrarPeliculas() {
      let peliculas = [...this.peliculas];
      if (this.valorFiltro === "Sin Filtro") {
        peliculas = this.peliculas;
      }
      if (this.valorFiltro === "Mas recientes") {
        peliculas = peliculas.sort((a, b) => b.anio - a.anio);
      }
      if (this.valorFiltro === "Calificacion") {
        peliculas.sort((a, b) => b.rating - a.rating);
      }
      if (this.buscarNombre.length >= 1) {
        peliculas = peliculas.filter((peli) =>
          peli.nombre.toLowerCase().includes(this.buscarNombre.toLowerCase())
        );
      }
      return peliculas;
    },
  },
  methods: {
    async listarPeliculas() {
      const peliculas = await fetch(this.URL + "all", {
        headers: {
          "Content-Type": "application/json",
          //"Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const values = await peliculas.json();
      this.peliculas = values.pelicula;
    },
    async agregarPelicula() {
      this.peliculas.push(this.nuevaPelicula);
      await fetch(this.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.nuevaPelicula),
      });
      this.limpiarFormulario();
      this.listarPeliculas();
    },
    async eliminarPelicula(id) {
      await fetch(`${this.URL}delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.listarPeliculas();
    },
    verPelicula(id) {
      this.$router.push({
        name: "Edit",
        params: {
          id,
        },
      });
    },
    qualifypelicula() {},
    limpiarFormulario() {
      this.nuevaPelicula.id = null;
      this.nuevaPelicula.nombre = "";
      this.nuevaPelicula.anio = null;
      this.nuevaPelicula.ratin = 0;
      this.nuevaPelicula.resumen = "";
    },
  },
  created() {
    this.listarPeliculas();
  },
};
</script>
