<template>
   <img :src="imageSource" />
</template>

<script>
   export default {
      name: 'Card',

      data() {

      },
      props: {
         team: String,
         playerRole: String
      },
      computed: {
         haveEverything() {
            return (this.team && this.team.length > 0) && (this.role && this.role.length > 0);
         },
         imageSource() {
            if (this.haveEverything) {
               return `./assets/cards/${this.team}/${this.role}.PNG`;
            }
            else {
               return '';
            }
         }
      }
   }
</script>

<style scoped>
</style>