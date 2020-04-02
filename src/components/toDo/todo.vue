<template>
  <v-container>
    <v-row>
      <v-card class="mx-auto" outlined elevation="8">
        <v-card-title>Add Details</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-text-field label="Name" v-model="editedItem.name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field label="Email"  v-model="editedItem.email"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field label="Address" v-model="editedItem.add"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field label="Mob" v-model="editedItem.mob"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded color="primary" dark>Reset</v-btn>
          <v-spacer></v-spacer>
          <v-btn rounded color="error" dark @click="addDetails">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row id="cardSpace">
      <v-card class="mx-auto" outlined elevation="8">
        <!-- <v-card-title>Add Details</v-card-title> -->
        <v-card-text>
          <!-- <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tasks" :key="item.text">
                  <td>{{ item.text }}</td>
                  <td>{{ item.text }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>-->

          <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Details</v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <!-- <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon> -->
              <v-icon small @click="deleteItem(item)">delete</v-icon>
            </template>
            <template v-slot:no-data>
              <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded color="primary" dark>Reset</v-btn>
          <v-spacer></v-spacer>
          <v-btn rounded color="error" dark >Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

    <v-row>
      <!-- <v-container style="max-auto">
        <h2 class="display-1 success--text pl-4">
          Tasks:&nbsp;
          <v-fade-transition leave-absolute>
            <span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
          </v-fade-transition>
        </h2>

        <v-divider class="mt-4"></v-divider>

        <v-row class="my-1" align="center">
          <strong class="mx-4 info--text text--darken-2">Remaining: {{ remainingTasks }}</strong>

          <v-divider vertical></v-divider>

          <strong class="mx-4 success--text text--darken-2">Completed: {{ completedTasks }}</strong>

          <v-spacer></v-spacer>

          <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
        </v-row>

        <v-divider class="mb-4"></v-divider>

        <v-card v-if="tasks.length > 0">
          <v-slide-y-transition class="py-0" group tag="v-list">
            <template v-for="(task, i) in tasks">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

              <v-list-item :key="`${i}-${task.text}`">
                <v-list-item-action>
                  <v-checkbox v-model="task.done" :color="task.done && 'grey' || 'primary'">
                    <template v-slot:label>
                      <div
                        :class="task.done && 'grey--text' || 'primary--text'"
                        class="ml-4"
                        v-text="task.text"
                      ></div>
                    </template>
                  </v-checkbox>
                </v-list-item-action>

                <v-spacer></v-spacer>

                <v-scroll-x-transition>
                  <v-icon v-if="task.done" color="success">check</v-icon>
                </v-scroll-x-transition>
              </v-list-item>
            </template>
          </v-slide-y-transition>
        </v-card>
      </v-container>-->
    </v-row>
  </v-container>
</template>

<script>
export default {
  // data: () => ({
  //   fab: false,
  //   tasks: [
  //     {
  //       done: false,
  //       text: "Foobar"
  //     },
  //     {
  //       done: false,
  //       text: "Fizzbuzz"
  //     }
  //   ],
  //   task: null
  // }),

  // computed: {
  //   completedTasks() {
  //     return this.tasks.filter(task => task.done).length;
  //   },
  //   progress() {
  //     return (this.completedTasks / this.tasks.length) * 100;
  //   },
  //   remainingTasks() {
  //     return this.tasks.length - this.completedTasks;
  //   }
  // },

  // methods: {
  //   create() {
  //     this.tasks.push({
  //       done: false,
  //       text: this.task
  //     });

  //     this.task = null;
  //   },
  //   /*scrollin button */
  //   onScroll(e) {
  //     if (typeof window === "undefined") return;
  //     const top = window.pageYOffset || e.target.scrollTop || 0;
  //     this.fab = top > 20;
  //   },
  //   toTop() {
  //     this.$vuetify.goTo(0);
  //   }
  //   /*end scrollin button */
  // }

  data: () => ({

    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Email", value: "email" },
      { text: "Address", value: "add" },
      { text: "Mobile No", value: "mob" },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      add: "",
      mob: ""
    },
    defaultItem: {
      name: "",
      email: "",
      add: "",
      mob: ""
    }
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      // this.desserts = [
      //   {
      //     name: "Frozen Yogurt",
      //     email: "sandy@email.com",
      //     add: "hyderabad",
      //     mob: 9895458522
      //   }
      // ];
    },
    addDetails(){
      this.desserts.push({
        name:this.editedItem.name,
        email:this.editedItem.email,
        add:this.editedItem.add,
        mob:this.editedItem.mob
      });
      this.editedItem={}
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style scoped>
#cardSpace {
  margin-top: 30px;
}
</style>