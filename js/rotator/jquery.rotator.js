;( function( $, window, document, undefined ) {

  "use strict";

  var pluginName = "rotator",
    defaults = {
      degree: 1,
      incrementor: 1,
      speed: 5000,
      reverse: false,
      random:false
    };

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this.timerID;
    // Record references to child initialisations of plugin
    this.childPlugins = [];
    this._defaults = defaults;
    this._name = pluginName;

    this._init();
  }

  $.extend( Plugin.prototype, {
    _init: function() {
      if(this.settings.random){
        this._random();
      }else{
        this._start(this);
      }
    },
    _start: function(plugin) {
      this.timerID = setInterval(function(){
        plugin._rotate()
      }, plugin.settings.speed);
    },
    _rotate: function(){
      if (this.settings.reverse && this.settings.degree > 0){
        this.settings.degree = -this.settings.degree;
      }
      if (this.settings.reverse && this.settings.incrementor > 0){
        this.settings.incrementor = -this.settings.incrementor;
      }

      $(this.element).css({
        transition: 'transform ' + this.settings.speed + 'ms linear',
        transform: 'rotate(' + this.settings.degree + 'deg)'
      });
      this.settings.degree = this.settings.degree + this.settings.incrementor;
    },
    _getRandomInt: function(min, max){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    _random: function(){
      this.settings.speed = this._getRandomInt(250,5000);
      this.settings.reverse = this._getRandomInt(0,1);
      this._start(this);

      // Allows access to random functions before new plugin is created.
      var parent = this;

      // Create a new plugin on each child and store reference in parent array.
      $(this.element).children().each(function () {
        var randomSpeed = parent._getRandomInt(250,5000);
        var randomReverse = parent._getRandomInt(0,1);
        var newPlugin = new Plugin(this, {speed:randomSpeed, reverse:randomReverse});
        parent.childPlugins.push(newPlugin);
      });

    },
    _resetRotate: function(){
      $(this.element).css({
        transition: 'transform 200ms ease-out',
        transform: 'rotate(0deg)'
      });
    },
    _destroy: function(){
      clearInterval(this.timerID);
      // Remove plugin from element.
      $(this.element).removeData('plugin_' + pluginName);
    },
    reset: function(){
      if(this.childPlugins !== undefined || this.childPlugins.length != 0){
        // If child plugins exist, cycle through them and reset them.
        this.childPlugins.forEach(function (plugin) {
          plugin._resetRotate();
          plugin._destroy();
        });
      }
      this._resetRotate();
      this._destroy();
    },
  });

  $.fn[pluginName] = function ( options ) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      var returns;
      this.each(function () {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (instance instanceof Plugin && typeof instance[options] === 'function') {
          returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
        }
      });
      return returns !== undefined ? returns : this;
    }
  };

}(jQuery, window, document));