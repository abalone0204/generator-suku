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
      name: 'entry',
      message: 'Your project\'s entry point?',
      default: 'main.js'
    }];

    this.prompt(prompts, function(props) {
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
      mkdirp('js');
      mkdirp('stylesheets');
    },
    app: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {entry: this.props.entry}
      );
      this.fs.copyTpl(
        this.templatePath('_webpack_config.js'),
        this.destinationPath('webpack.config.js'),
        {entry: this.props.entry}
      );
    },
    projectfiles: function() {
      this.fs.copyTpl(
        this.templatePath('_main.js'),
        this.destinationPath('js/' + this.props.entry), {
          entry: this.props.entry
        }
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'), {
          title: this.props.projectName,
          entry: this.props.entry.replace(/\.js/g, '')
        }
      );
      this.fs.copy(
        this.templatePath('_style.scss'),
        this.destinationPath('stylesheets/style.scss')
        );
    }
  },
  install: function() {
    this.installDependencies({
      bower: false,
      npm: true
    });
    // var done = this.async();
    // this.npmInstall("", function(){
    //     console.log("\nEverything Setup !!!\n");
    //     done();
    // });
  }
});