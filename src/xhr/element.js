/**
 * this module contains the Element unit XHR related extensions
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
$ext(Element.Methods, {
  /**
   * performs an Xhr request to the given url
   * and updates the element internals with the responseText
   *
   * @param String url address
   * @param Object xhr options
   * @return Element this
   */
  load: function(url, options) {
    new Xhr(url, options).update(this);
    return this;
  }
});