= Intro

Fx.Highlight is a pretty much standard elements highlighting visual effect.

No magic it just blinks the element with yellow or any provided colors.

== Default Color

By default the highlighting color is yellow but you can specify your own
default color by assigning the <tt>Fx.Highlight.Options.color</tt> variable.

### Fx.Highlight#start

== Semantic
  start([String highlight_color[, String end_color]]) -> Fx self

== Description
  Starts the element highlighting process, might take the highlight and final
  colors

== Example
  var fx = new Fx.Highlight('element');
  
  fx.start();
  fx.start('blue');
  fx.start('blue', 'pink');