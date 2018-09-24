'use strict';

const StackOutputsWriter = require('./writer.js');

class StackOutputs {
  constructor(serverless, options) {
    this.options = options || {};
    this.serverless = serverless;
    this.provider = this.serverless.getProvider(this.serverless.service.provider.name);
    this.stage = this.options.stage || this.serverless.service.provider.stage;
    this.region = this.options.region || this.serverless.service.provider.region;
    try {
      this.outputFile = this.serverless.service.custom.output.file
    } catch (e) {
      throw new Error('Missing custom file output')
    }
    this.outputPrefix = this.serverless.service.custom.output.prefix || ''
    this.hooks = { 'info:outputs:output':  this.stackOutputs.bind(this) }
    if(this.options.verbose) {
      this.hooks['after:deploy:deploy'] = this.stackOutputs.bind(this)
      this.hooks['after:info:info'] = this.stackOutputs.bind(this)
    }
  }

  stackOutputs() {
    var output = {}
    this.provider.request(
      'CloudFormation',
      'describeStackResources',
      {
        StackName: this.provider.naming.getStackName(this.stage)
      }
    ).then((result) => {
      if (result) {
        result.StackResources.forEach(function(element) {
          output[this.outputPrefix + element.LogicalResourceId] = element.PhysicalResourceId
        }.bind(this))
      }
      new StackOutputsWriter(this.outputFile).save(output)
    });
  }
}

module.exports = StackOutputs;
