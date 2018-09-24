# serverless-resources-ids-file
Output to a (JSON|YML) file the CloudFormation LogicalResourceIds and PhysicalResourceIds of its resources

# Installation
Install the package:
```bash
npm install serverless-resources-ids-file
```

Add it to your plugin list in `serverless.yml`:

```yaml
plugins:
  - serverless-resources-ids-file
```

Add the name of the `file` (only `.json` and `.yml` are accepted) where to save the CloudFormation resources ids.

```yaml
custom:
  output:
    file: stack.json
    prefix: PREF_
```

The `prefix` property will add a string as a prefix of every single key.

Example:

```yaml
custom:
  output:
    file: stack.json
```
Output in `stack.json`
```json
{
  "ApiGatewayRestApi": "14d7qve030"
}
```

```yaml
custom:
  output:
    file: stack.json
    prefix: PREF_
```
Output in `stack.json`
```json
{
  "PREF_ApiGatewayRestApi": "14d7qve030"
}
```

# Usage
Whenever you call `info` or `deploy` with the `--verbose` option, the stack outputs will be saved:

```bash
serverless info --verbose
serverless deploy --verbose
```
