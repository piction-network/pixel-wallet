<template>
  <div>
    <b-card title="AddOwner"
            img-top
            tag="article">
      <p class="card-text">
        신규 오너를 등록합니다.
      </p>
      <b-input-group>
        <b-form-input id="address"
                      v-model.trim="address"
                      type="text"
                      :state="addressState"
                      placeholder="Address"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!addressState"
                 v-on:click="addOwner()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <div v-if="transactionHash">
        TransactionHash : <a target="_blank" v-bind:href="getEtherscanURL('/tx/' + transactionHash)">{{transactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'PXLAddOwner',
    computed: {
      addressState() {
        return this.address && this.address.length > 0 ? true : false
      }
    },
    data() {
      return {
        address: null,
        transactionHash: null
      }
    },
    methods: {
      addOwner() {
        this.$EventBus.$emit('showProgressModal');
        this.$contract.pxl.addOwner(this.address)
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.transactionHash = receipt.transactionHash;
            this.$EventBus.$emit('hideProgressModal');
          })
          .on('error', (err) => {
            this.$EventBus.$emit('hideProgressModal');
            alert(err);
          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
