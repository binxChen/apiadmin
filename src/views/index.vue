<template>
  <div>
    <Header></Header>
    <div class="main">
      <Sidebar ref="sidebar" />
    </div>
  </div>
</template>

<script>
  import Sidebar from '../components/slider'
  import Header from '../components/top'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      Header,
    },
    
  }
</script>


<style >
</style>
