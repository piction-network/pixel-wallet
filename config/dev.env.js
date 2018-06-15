'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CONTRACT_ADDRESS: {
    PXL: '"0x2388b1D14a1B5F26eD694e8edF420E5447F8db7a"',
    WHITELIST: '""',
    SALE: '""'
  }
})
