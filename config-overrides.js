const { override, fixBabelImports } = require('customize-cra');

//https://ant.design/docs/react/use-with-create-react-app
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
);
