/**
 * This unit presents a fake drop in replacement for the XmlHTTPRequest unit
 * but works with an iframe targeting in the background
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
Xhr.IFramed = new Class({
  /**
   * constructor
   *
   * @param Form form which will be submitted via the frame
   * @return void
   */
  initialize: function(form) {
    this.form = form;
    
    var id = 'xhr_frame_'+Math.random().toString().split('.').last();
    $E('div').insertTo(document.body).update('<iframe name="'+id+'" id="'+id+'" width="0" height="0" frameborder="0" src="about:blank"></iframe>');
    
    this.iframe = $(id);
    this.iframe.on('load', this.onLoad.bind(this));
  },
  
  send: function() {
    // stubbing the onsubmit method so it allowed us to submit the form
    var old_onsubmit = this.form.onsubmit,
        old_target   = this.form.target;
    
    this.form.onsubmit = function() {};
    this.form.target   = this.iframe.id;
    
    this.form.submit();
    
    this.form.onsubmit = old_onsubmit;
    this.form.target   = old_target;
  },
  
  onLoad: function() {
    this.status       = 200;
    this.readyState   = 4;
    this.responseText = this.iframe.document ? this.iframe.document.body.innerHTML : null;
    this.onreadystatechange();
  },
  
  // dummy API methods
  open:               function() {},
  abort:              function() {},
  setRequestHeader:   function() {},
  onreadystatechange: function() {}
});