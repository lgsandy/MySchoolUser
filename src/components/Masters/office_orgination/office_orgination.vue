<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12 text-center>
    
   
        <h2>Office Orginazation Master</h2>
       
      </v-flex>
    </v-layout>

    <v-layout wrap>
      <v-row>
        <v-col cols="12" md="6">
          <v-flex mb-5 xs12>
            <v-card>
              <v-card-title>Basic Example</v-card-title>
              <v-card-text>
                <v-draggable-treeview group="test" v-model="items"></v-draggable-treeview>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-col>

        <v-col cols="12" md="6">
          <v-layout wrap>
            <v-flex mb-5 xs12>
              <v-card>
                <v-card-title>Basic Example</v-card-title>
                <v-card-text>
                  <v-draggable-treeview group="test" v-model="items2"></v-draggable-treeview>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  // name: "HelloWorld",
  data: () => ({
    firstExample:
      '<v-draggable-treeview group="test" v-model="items"></v-draggable-treeview>',

    items: [
      {
        id: 1,
        name: "Central League",
        children: [
          { id: 101, name: "Dragons" },
          { id: 102, name: "Tigers" }
        ]
      },
      {
        id: 2,
        name: "Pacific League",
        children: [
          {
            id: 201,
            name: "Lions",
            children: [
              { id: 203, name: "Lions Minor" },
              {
                id: 204,
                name: "Lions third",
                children: [{ id: 2041, name: "Lions Minor Second" }]
              }
            ]
          }
        ]
      }
    ],
    items2: [
      {
        id: 1,
        name: "Central League",
        children: [
          { id: 101, name: "Dragons" },
          { id: 102, name: "Tigers" }
        ]
      },
      {
        id: 2,
        name: "Pacific League",
        children: [
          {
            id: 201,
            name: "Lions",
            children: [
              { id: 203, name: "Lions Minor" },
              {
                id: 204,
                name: "Lions third",
                children: [{ id: 2041, name: "Lions Minor Second" }]
              }
            ]
          }
        ]
      }
    ]
  })
};
</script>