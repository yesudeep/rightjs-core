### Math.random

== Semantic
  Math.random()                           -> Float random between 0 and 1
  Math.random(Integer end)                -> Integer random between 0 and the end number
  Math.random(Integer start, Integer end) -> Integer random between the start and end

== Description
  The original method was overloaded to provide more flexible semantic.
  
== Example
  Math.random();    // some Float   between 0 and 1
  Math.random(10);  // some Integer between 0 and 10
  Math.random(1,4); // some Integer between 1 and 4

