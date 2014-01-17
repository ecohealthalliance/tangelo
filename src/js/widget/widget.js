/*jslint browser: true */

(function (tangelo, $) {
    $.widget("tangelo.widget", {
        _setOption: function (key, value) {
            if (this._notAccessors.indexOf(key) === -1) {
                this._super(key, tangelo.accessor(value));
            } else {
                this._super(key, value);
            }
        },

        _setOptions: function (options) {
            var that = this;

            $.each(options, function (key, value) {
                that._setOption(key, value);
            });

            this._update();
        },

        _update: function () {
            // This function intentionally does nothing.  It is here as a
            // placeholder to avoid an error in case a child widget does not
            // supply an _update() method for some reason.
        }
    });

}(window.tangelo, window.jQuery));
