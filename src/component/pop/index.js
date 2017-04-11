angular
  .module('jmui.popup',[])
  .service('popup', function(){

    function Popup(){
      this.placement = [];
      this.visible = false;
      this.trigger = 'mouseover';
      this.overlayclassName = '';
      this.overlayStyle = '';
      this.$el = null;
    }
    

    Popup.prototype.init = function(){

    }

    Popup.getPopupContainer = function(){}


    return new Popup();
  })