<template>
  <h1>{{ id }}</h1>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      id: null,
      nombre: "Cineee",
      anio: new Date(),
      ratin: 2.5,
    };
  },
  methods: {},
  created() {
    this.id = this.$route.params.id;
  },
};
</script>
