<template>
    <div class="display-items">
      <PassFailChart v-if="loaded" v-bind:passCount="passCount" v-bind:failCount="failCount"/>
       <md-list v-if="loaded" v-for="build in info" v-bind:key="build.id">
          <md-list-item>
            <div class="md-list-item-text">
              <span>{{build.number}} - {{build.created_by.login}}</span>
              <span>{{build.state}}</span>
              <p>{{build.commit.message}}</p>
            </div>
            <!-- <span class="md-list-item-text">{{build.event_type}}</span> -->
          </md-list-item>
        </md-list>
    </div>
</template>

<script>
import axios from 'axios';
import PassFailChart  from './PassFailChart';
import * as constants from '../../config';

export default {
  components: {
    PassFailChart
  },
  props:{
    targetRepository: String,
    method: String,
    apiKey: String
  },
  data: function () {
        return {
            info: null,
            failCount: 0,
            passCount: 0,
            loaded: false
        }
    },
   mounted () {
     const api = `${constants.apiURL}/${this.targetRepository}/${this.method}`;
     const passedKey = 'passed';
      axios({ 
        method: 'GET', 
        url: api,
        responseType: 'text',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Travis-API-Version': '3',
        'Authorization': `token ${this.apiKey}`
        }
      }).then(result => {  
                this.info = result.data.builds
                this.failCount = this.info.filter(x=> x.state !== passedKey).length
                this.passCount = this.info.filter(x=> x.state === passedKey).length
                this.loaded = true
            }, error => {
                this.info= ['Failed to load API']
            })
   }
};
</script>

<style lang="scss" scoped>
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
  }
  .display-items {
    display: inline;
  }
</style>