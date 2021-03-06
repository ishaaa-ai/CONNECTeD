<template>
  <div class="projects">
    <h4>PROJECTS <font-awesome-icon :icon="['fa', 'lightbulb']" /></h4>

    <section class="container">
      <div class="zero-projects" v-if="hasNoProjects()">
        <img src="../assets/04.png" />

        <div class="font-weight-bold">
          No Projects Found

          <p class="text-muted">
            Looks like you haven't started a project yet! Project information
            will <br />
            appear here as soon as you post it!
          </p>
        </div>
      </div>

      <div class="action">
        <div v-if="isLoggedIn()">
          <b-link class="button btn-sm btn" href="/connect/post-projects"
            >NEW PROJECT</b-link
          >
        </div>
      </div>

      <div class="project-cards" v-for="i in rowCount()" v-bind:key="i">
        <ul>
          <li class="description" v-for="j in cols" v-bind:key="j">
            <ProjectCards
              v-if="projectExists(i, j)"
              v-on:delete="deleteProject"
              v-bind:project_name="getProject(i, j).project_name"
              v-bind:project_description="getProject(i, j).desc"
              v-bind:project_id="getProject(i, j).id"
              v-bind:picture_link="getProject(i, j).picture"
              v-bind:website="getProject(i, j).website"
              v-bind:users="getProject(i, j).Users"
              v-bind:tags="getProject(i, j).Tags"
              v-bind:is_logged_in="isLoggedIn()"
            />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectCards from "@/components/ProjectCard.vue";
import axios from "axios";
export default {
  name: "projects",
  data() {
    return {
      utorid: "",
      project_list: null,
      cols: 3
    };
  },
  components: {
    ProjectCards
  },
  mounted() {
    var id = this.$route.params.id;
    axios
      .get("/connect/profile_info?id=" + id)
      .then(response => (this.utorid = response.data.utorid));
    axios
      .get("/connect/project?id=" + id)
      .then(response => (this.project_list = response.data));
  },
  methods: {
    isLoggedIn() {
      return this.$store.state.user.utorid == this.utorid;
    },
    rowCount() {
      if (this.project_list == null) {
        return 0;
      }
      const quotient = Math.floor(this.project_list.length / this.cols);
      const remainder = this.project_list.length % this.cols;
      return quotient + (remainder === 0 ? 0 : 1);
    },
    projectIndex(row, col) {
      return (row - 1) * this.cols + (col - 1);
    },
    getProject(row, col) {
      return this.project_list[this.projectIndex(row, col)];
    },
    projectExists(row, col) {
      return this.getProject(row, col) != null;
    },
    hasNoProjects() {
      if (this.project_list == 0) {
        return true;
      }
    },

    deleteProject(id) {
      axios
        .post("/connect/delete-project", {
          id: id
        })
        .then(
          () =>
            (this.project_list = this.project_list.filter(function(project) {
              return project.id != id;
            }))
        );
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
h4 {
  transform: translate(-40%, 10%);
  font-weight: bold;
}

img {
  height: 30%;
  width: 30%;
  display: block;
  margin: 0 auto;
}
.container {
  padding: 0 40px 0 40px;
}

li {
  list-style-type: none;
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 5px;
  margin: 0px;
  padding: 0px;
}

.text-muted {
  opacity: 0.4;
  font-weight: 500;
}

.project-cards {
  padding: 1rem 0 1rem 0;
}

.zero-projects {
  padding: 0 0 20px 0;
}
.action {
  padding: 20px 0 40px 0;
}
.button {
  border-radius: 20px;
  border: 1px solid #212121;
  background-color: #212121;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  text-decoration: none;
}
.button:hover {
  transform: scale(1.1);
  transition: 0.5s;
}

.button:focus {
  outline: none;
}

</style>
