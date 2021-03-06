/**
 * The Observer unit tests
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
var ObserverTest = TestCase.create({
  name: 'ObserverTest',
  
  testObserve: function() {
    var o = new Observer();
    var f1 = function() {};
    var f2 = function() {};
    var f3 = function() {};
    
    this.assertSame(o, o.observe('foo', f1));
    this.assertSame(o, o.observe('foo', f2));
    this.assertSame(o, o.observe('bar', f3));
    
    this.assert(o.observes('foo', f1));
    this.assert(o.observes('foo', f2));
    this.assert(o.observes('bar', f3));
  },
  
  testObserveHash: function() {
    var o = new Observer();
    var f1 = function() {};
    var f2 = function() {};
    
    this.assertSame(o, o.observe({
      foo: f1, bar: f2
    }));
    
    this.assert(o.observes('foo', f1));
    this.assert(o.observes('bar', f2));
  },
  
  testObserveHashWithSharedArgs: function() {
    var o = new Observer();
    var a1, a2, b1, b2;
    var f1 = function(a, b) { a1 = a; b1 = b; };
    var f2 = function(a, b) { a2 = a; b2 = b; };
    
    o.observe({
      foo: f1, bar: f2
    }, 'a', 'b');
    
    o.fire('foo').fire('bar');
    
    this.assertEqual('a', a1);
    this.assertEqual('a', a2);
    
    this.assertEqual('b', b1);
    this.assertEqual('b', b2)
  },
  
  testObserveArray: function() {
    var o = new Observer();
    var f1 = function() {};
    var f2 = function() {};
    
    o.observe('foo', [f1, f2]);
    
    this.assert(o.observes('foo', f1));
    this.assert(o.observes('foo', f2))
  },
  
  testObserveArrayByName: function() {
    var a1, a2, b1, b2;
    
    var o = new Observer();
    o.foo = function(a, b) { a1 = a; b1 = b; };
    o.bar = function(a, b) { a2 = a; b2 = b; };
    
    o.observe('some', ['foo', ['bar', 'a']], 'b').fire('some');
    
    this.assertEqual('b', a1);
    this.assertEqual(undefined, b1);
    this.assertEqual('a', a2);
    this.assertEqual('b', b2);
  },
  
  testObserves: function() {
    var o = new Observer();
    var f1 = function() {};
    var f2 = function() {};
    var f3 = function() {};
    
    o.observe('foo', f1);
    o.observe('foo', f2);
    o.observe('bar', f3);
    
    this.assert(o.observes('foo'));
    this.assert(o.observes('bar'));
    this.assert(o.observes('foo', f1));
    this.assert(o.observes('foo', f2));
    this.assert(o.observes('bar', f3));
    
    this.assertFalse(o.observes('boo'));
    this.assertFalse(o.observes('foo', f3));
    this.assertFalse(o.observes('bar', f1));
    this.assertFalse(o.observes('bar', f2));
        
    // testing direct by function check
    this.assert(o.observes(f1));
    this.assert(o.observes(f2));
    this.assertFalse(o.observes(new Function()));
  },
  
  testStopObserving: function() {
    var o = new Observer();
    var f1 = function() {};
    var f2 = function() {};
    
    o.observe('foo', f1);
    o.observe('foo', f2);
    
    // test remove by function
    this.assertSame(o, o.stopObserving('foo', f2));
    
    this.assert(o.observes('foo'));
    this.assert(o.observes('foo', f1))
    this.assertFalse(o.observes('foo', f2));
    
    // test remove by name
    this.assertSame(o, o.stopObserving('foo'));
    
    this.assertFalse(o.observes('foo'));
    this.assertFalse(o.observes('foo', f1))
    this.assertFalse(o.observes('foo', f2));
        
    // trying unsubscribe function just by the function call
    o.observe('foo', f1);
    this.assert(o.observes(f1));
    this.assertSame(o, o.stopObserving(f1));
    this.assertFalse(o.observes(f1));
  },
  
  testFire: function() {
    var o = new Observer();
    
    var e1 = e2 = e3 = false;
    var o1 = o2 = o3 = null;
    
    o.observe('foo', function(e) { e1 = e; o1 = this; });
    o.observe('foo', function(e) { e2 = e; o2 = this; });
    o.observe('bar', function(e) { e3 = e; o3 = this; });
    
    this.assertSame(o, o.fire('foo', 'e'));
    
    this.assertEqual('e', e1);
    this.assertEqual('e', e2);
    this.assertFalse(e3);
    
    // checking that the function were executed in the scope of the observer
    this.assertSame(o, o1);
    this.assertSame(o, o2);
    
    e1 = e2 = e3 = false;
    
    this.assertSame(o, o.fire('bar', 'e'));
    
    this.assertEqual('e', e3);
    this.assertFalse(e1);
    this.assertFalse(e2);
    
    this.assertSame(o, o3);
  },
  
  testListeners: function() {
    var o = new Observer();
    
    var f1 = function() {};
    var f2 = function() {};
    var f3 = function() {};
    
    o.observe('foo', f1);
    o.observe('foo', f2);
    o.observe('bar', f3);
    
    this.assertEqual([f1, f2], o.listeners('foo'));
    this.assertEqual([f3], o.listeners('bar'));
  },
    
  testByNameObserving: function() {
    var o = new Observer();
    
    var args = null, o_this = null;
    o.foo = function() {
      o_this = this;
      args   = $A(arguments);
    };
    
    o.on('bar', 'foo', 1, 2, 3);
    o.fire('bar');
    
    this.assertSame(o, o_this);
    this.assertEqual([1,2,3], args);
  },
  
  testAutoShortcutsGeneration: function() {
    var Klass = new Class(Observer, {
      EVENTS: ['foo', 'bar']
    });
    
    var klass = new Klass();
    this.assert(klass.onFoo);
    this.assert(klass.onBar);
  },
  
  testAutoShortcutsGeneratorForClass: function() {
    var Klass = new Class(Observer, {
      extend: {
        EVENTS: $w('foo bar')
      }
    });
    
    var klass = new Klass();
    this.assert(klass.onFoo);
    this.assert(klass.onBar);
    
    // checking inheritance support
    var Klass2 = new Class(Klass, {});
    
    var klass = new Klass2();
    this.assert(klass.onFoo);
    this.assert(klass.onBar);
  }
})