/**
 * The Options module unit-tests
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */

var OptionsTest = TestCase.create({
  name: 'OptionsTest',
  
  
  testInstanceLevel: function() {
    var Klass = new Class({
      include: Options,
      
      Options: {
        a: 1,
        b: 2
      },
      
      initialize: function(options) {
        this.setOptions(options);
      }
    });
    
    this.assertEqual(Klass.prototype.Options, new Klass().options);
    this.assertEqual({a: 1, b: 4}, new Klass({b:4}).options);
  },
  
  testClassLevel: function() {
    var Klass = new Class({
      include: Options,
      
      extend: {
        Options: {
          a: 1,
          b: 2
        }
      },
      
      initialize: function(options) {
        this.setOptions(options);
      }
    });
    
    this.assertEqual(Klass.Options, new Klass().options);
    this.assertEqual({a: 1, b: 4}, new Klass({b:4}).options);
  },
  
  testClassLevelWithInheritance: function() {
    var Klass1 = new Class({
      include: Options,
      
      extend: {
        Options: {
          a: 1,
          b: 2
        }
      },
      
      initialize: function(options) {
        this.setOptions(options);
      }
    });
    
    var Klass2 = new Class(Klass1, {});
    var Klass3 = new Class(Klass2, {});
    var Klass  = new Class(Klass3, {});
    
    this.assertEqual(Klass1.Options, new Klass().options);
    this.assertEqual({a: 1, b: 4}, new Klass({b:4}).options);
  },
  
  testWithObserver: function() {
    var Klass = new Class(Observer, {
      include: Options,
      
      initialize: function(options) {
        this.$super();
        this.setOptions(options);
      }
    });
    
    var the_function = function() {};
    var klass = new Klass({
      onFinish: the_function
    });
    
    this.assert(klass.observes('finish', the_function));
  }
});