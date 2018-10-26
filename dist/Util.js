"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = (function () {
    function Util() {
    }
    Util.formatError = function (event) {
        if (!event.error) {
            return event.message;
        }
        // PluginError
        if (typeof event.error.showStack === 'boolean') {
            return event.error.toString();
        }
        // Normal error
        if (event.error.stack) {
            return event.error.stack;
        }
        // Unknown (string, number, etc.)
        return new Error(String(event.error)).stack;
    };
    return Util;
}());
exports.default = Util;
