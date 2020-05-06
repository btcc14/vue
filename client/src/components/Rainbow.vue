<template>
  <div>
    <v-card class="overflow-hidden">
    <v-app-bar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>{{getUser.login}}</v-toolbar-title>
      <v-spacer></v-spacer>

     <v-btn icon @click="logout">
       <v-icon>mdi-logout</v-icon>
     </v-btn>
    </v-app-bar>
  </v-card>
    <v-data-table
        :headers="headers"
        :items="getRainbowsFromStore"
        class="elevation-1"
        loading="loading"
        loading-text="Loading... Please wait"
        hide-default-footer
      >
      <template v-slot:item="props">
        <tr :style="{color: props.item.hex}">
          <td align="center">{{ props.item.name }}</td>
          <td align="center">{{ props.item.hex }}</td>
          <td align="center">{{ props.item.rgb }}</td>
          <td align="center">
            <v-chip :color="props.item.hex" dark>{{ props.item.hex }}</v-chip>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'Rainbows',
    data() {
      return {
        headers: [
          {
            text: 'Color Description',
             value: 'description'
           },
           {
             text: 'RGB Values',
             value: 'rgb'
           },
          {
            text: 'Hex Code',
            value: 'hex'
          },
          {
            text: 'Color Visibility',
            value: 'color'
          }
        ],
        loading: false,
      };
    },
    computed: {
      getUser() {
        return this.$store.state.auth.user;
      },
      getRainbowsFromStore() {
        return this.$store.state.rainbow.rainbows;
      },
    },
    mounted() {
      this.loading = true;

      this.$store.dispatch('rainbow/rainbow').then(
        () => {
          this.loading = false;
        },
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      },
    }
  };
</script>
