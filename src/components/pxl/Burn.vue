<template>
  <div>
    <b-card title="Burn"
            img-top
            tag="article">
      <p class="card-text">
        PXL 토큰을 소각합니다.
      </p>
      <b-input-group>
        <b-form-input id="amount"
                      v-model.trim="amount"
                      type="text"
                      :state="amountState"
                      placeholder="Amount"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!amountState"
                 v-on:click="burn()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <div v-if="transactionHash">
        TransactionHash : <a target="_blank"
                             v-bind:href="getEtherscanURL('/tx/' + transactionHash)">{{transactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'PXLBurn',
    computed: {
      amountState() {
        return parseInt(this.amount) > 0 ? true : false
      },
    },
    data() {
      return {
        amount: null,
        transactionHash: null,
      }
    },
    methods: {
      burn() {
        this.$EventBus.$emit('showProgressModal');
        this.$contract.pxl.burn(this.amount)
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.transactionHash = receipt.transactionHash;
            this.$EventBus.$emit('hideProgressModal');
            this.$EventBus.$emit('setTotalSupply');
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
