const util = require('util');
const fs = require('fs');

class StackOutputsWriter {
  constructor(path) {
    this.path = path
  }

  format(data) {
    const ext = this.path.split('.').pop() || ''
    switch (ext.toUpperCase()) {
      case 'JSON':
        return JSON.stringify(data, null, 2)
      case 'YAML':
      case 'YML':
        return require('yamljs').stringify(data)
      default:
        throw new Error('No formatter found for `' + ext + '` extension')
    }
  }

  save(data) {
    const content = this.format(data)
    try {
      fs.writeFileSync(this.path, content)
    } catch (e) {
      throw new Error('Cannot write to file: ' + this.path)
    }
    return Promise.resolve()
  }
}

module.exports = StackOutputsWriter;
