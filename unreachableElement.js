/**
 * 
 * @author Sydney M
 * @since September 2015
 * @version 1.0.0
 * 
 * unreachableElement is a jQuery plugin which when called on any page element
 * will cause it to move to different parts of the screen every time a user 
 * would hover their mouse pointer over it
 * 
 * It can be used in the following manner :
 *      $(selector).unreachableElement(true);
 *      
 * To disable it, do the following :
 *      $(selector).unreachableElement(false);
 *      
 * Where $(selector) would represent the element you'd like to
 * attach unreachableElement to.
 */

var UnreachableElement = function(options) {
    if(typeof options.element === 'undefined')
        return null;
    else
        this.$element = options.element;
    
    this.originalStyle = null;
        
    var _this = this;
    this.displace = function() {
        var pageWidth = $(window).width();
        var pageHeight = $(window).height();
        var elementWidth = _this.$element.width();
        var elementHeight = _this.$element.height();
        var topPosition = 0;
        var leftPosition = 0;
        
        _this.$element.css('z-index', 9999);
        _this.$element.css('position', 'fixed');
        
        do {
            topPosition = Math.floor(pageHeight * Math.random());
            leftPosition = Math.floor(pageWidth * Math.random());
            _this.$element.animate({
                top: topPosition,
                left: leftPosition
            }, 200);
        } while(leftPosition + elementWidth > pageWidth || topPosition + elementHeight > pageHeight);
    }
};

UnreachableElement.prototype.initialize = function() {
    var existingElementStyle = this.$element.attr('style');
    this.originalStyle = typeof existingElementStyle == 'undefined' ? '' : existingElementStyle;
    this.$element.on('hover', this.displace);
};

UnreachableElement.prototype.uninitialize = function() {
    console.log(this.originalStyle);
    debug;
    this.$element.attr('style', this.originalStyle);
    this.$element.off('hover', this.displace);
};

UnreachableElement.stack = {};

if(typeof jQuery === 'function') {
    jQuery.fn.unreachableElement = function(enable) {
        if(enable === true) {
            var id = 'X' + (+new Date());
            UnreachableElement.stack[id] = new UnreachableElement({element: $(this)});
            UnreachableElement.stack[id].initialize();
            $(this).attr('data-unreachableElementId', id);
        } else if(enable === false) {
            var id = $(this).attr('data-unreachableElementId');
            UnreachableElement.stack[id].uninitialize();
        }
    }
} else {
    console.error('unreachableElement requires jQuery to work.');
}
