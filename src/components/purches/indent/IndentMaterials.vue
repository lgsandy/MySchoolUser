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
              <v-text-field label="Email" v-model="editedItem.email"></v-text-field>
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
          <v-btn rounded color="error" dark>Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
    addDetails() {
      this.desserts.push({
        name: this.editedItem.name,
        email: this.editedItem.email,
        add: this.editedItem.add,
        mob: this.editedItem.mob
      });
      this.editedItem = {};
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