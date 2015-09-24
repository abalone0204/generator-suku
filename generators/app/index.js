'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
module.exports = yeoman.generators.Base.extend({
  configuring: {
      setProjectDir: function () {
        if (!this.fs.exists(this.props.projectName)) {
          mkdirp(this.props.projectName);
          this.destinationRoot(this.props.projectName);
        }
      }
  },
  prompting: function () {
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
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },
  writing: {
    setReadme: function () {
      this.log('in writing')
    }
    scaffoldDirs: function () {
      mkdirp('js');
      mkdirp('stylesheets');
    },
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.log(this.destinationPath('package.json'))
      this.fs.copy(
        this.templatePath('_webpack_config.js'),
        this.destinationPath('webpack.config.js')
      );
    },
    projectfiles: function () {
      this.fs.copy(
        this.templatePath('_main.js'),
        this.destinationPath('js/main.js')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    // this.installDependencies();
  }
});
