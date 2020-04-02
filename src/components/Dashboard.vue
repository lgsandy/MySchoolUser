<template>
<div id="app">
    <v-app id="inspire">
  <!-- <h1 align="center">this is Dashboard</h1> -->
   <v-card :elevation="15" id="mainCard">
        <v-toolbar color="blue darken-2" dark height="40">
          <v-toolbar-title id="uperCardTitle">Dashboard</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

  <!-- <v-card
  id="innerCard"
      class="mx-auto text-center"
     
      dark
      
    >
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="value"
            color="rgba(255, 255, 255, .7)"
            
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">
              ${{ item.value }}
            </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>
  
      <v-card-text>
        <div class="display-1 font-weight-thin">Sales Last 24h</div>
      </v-card-text>
  
      <v-divider></v-divider>
  
      <v-card-actions class="justify-center">
        <v-btn block text>Go to Report</v-btn>
      </v-card-actions>
    </v-card>-->
   </v-card>
    </v-app>
</div>
</template>
<script>
export default {
  data: () => ({
    value: [
      423,
      446,
      675,
      510,
      590,
      610,
      760,
    ],
  }),
};
</script>
<style scoped>
#mainCard {
  padding-top: 8px;
};
#innerCard{
padding-top: 10px;
}
</style>