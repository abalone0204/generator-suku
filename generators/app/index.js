'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tremendous ' + chalk.red('Suku') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Your project\'s name?',
      default: 'myApp'
    }, {
      type: 'input',
      name: 'portNumber',
      message: 'You can decide which port your project server would run on',
      default: 8080
    }];

    this.prompt(prompts, function(props) {
      console.log(this.props);
      this.props = props;
      done();
    }.bind(this));
  },
  writing: {
    setProjectDir: function() {
      if (!this.fs.exists(this.props.projectName)) {
        mkdirp(this.props.projectName);
        this.destinationRoot(this.props.projectName);
      }
    },
    setReadme: function() {
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
    },
    scaffoldDirs: function() {
      mkdirp('src/components');
      mkdirp('static/stylesheets');
    },
    app: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          projectName: this.props.projectName,
          entry: this.props.entry,
          portNumber: this.props.portNumber
        }
      );
      this.fs.copy(
        this.templatePath('_webpack_config.dev.js'),
        this.destinationPath('webpack.config.dev.js')
      );
      this.fs.copy(
        this.templatePath('_webpack_config.prod.js'),
        this.destinationPath('webpack.config.prod.js')
      );
    },
    projectfiles: function() {
      this.fs.copy(
        this.templatePath('_main.js'),
        this.destinationPath('src/main.js')
      );
      this.fs.copy(
        this.templatePath('_Hello.js'),
        this.destinationPath('src/components/Hello.js')
      );
      this.fs.copy(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'), {
          title: this.props.projectName
        }
      );
      this.fs.copy(
        this.templatePath('_style.scss'),
        this.destinationPath('static/stylesheets/style.scss')
      );
      this.fs.copyTpl(
        this.templatePath('_server.js'),
        this.destinationPath('server.js'), {
          portNumber: this.props.portNumber
        }
      );
    }
  },
  install: function() {
    this.installDependencies({
        bower: false,
        npm: true
    });
  }
});