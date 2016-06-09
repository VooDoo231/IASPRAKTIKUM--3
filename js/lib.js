//------------------------------------------------------------------------------
// Definition Namensraum APPLIB
// allgemeine Methoden (0-Software)
//------------------------------------------------------------------------------
// file: lib.js
// revision: 2 26.05.2016
// revision: 1 02.09.2013
// revision: 0 16.08.2013
// depends-on:
//    inheritance
//------------------------------------------------------------------------------

var APPLIB = {};

APPLIB.apply = function(o, c, defaults){
   // no "this" reference for friendly out of scope calls
   if (defaults) {
      AQW.apply(o, defaults);
   }
   if (o && c && typeof c == 'object') {
      for (var p in c) {
         o[p] = c[p];
      }
   }
   return o;
};

(function() {
   startId_i = 0;

   APPLIB.apply(APPLIB, {
      namespace: function (path_spl) {
         var parts_a = path_spl.split(".");
         var result_o = null;

         // Basis initialisieren, falls noch nicht vorhanden, sonst belassen
         global[parts_a[0]] = global[parts_a[0]] || {};
         result_o = global[parts_a[0]];
         // die weiteren Teile eintragen, ebenfalls wieder initialisieren, falls noch
         // nicht vorhanden
         for (var loop_i = 1; loop_i < parts_a.length; ++loop_i) {
            result_o[parts_a[loop_i]] = result_o[parts_a[loop_i]] || {}
            result_o = result_o[parts_a[loop_i]]
         }
         return result_o;
      },
      id_px: function () {
         return "aqw-gen" + (++startId_i);
      }
   });

   // String-Methoden ergänzen (siehe prototype.js)

   APPLIB.apply(String.prototype, {
      include: function (pattern) {
         return this.indexOf(pattern) > -1;
      },
      startsWith: function (pattern) {
         return this.lastIndexOf(pattern, 0) === 0;
      },
      endsWith: function (pattern) {
         var d = this.length - pattern.length;
         return d >= 0 && this.indexOf(pattern, d) === d;
      }
   });

   APPLIB.apply(String, {
      interpret: function(value) {
         return value == null ? '' : String(value);
      }
   });


})();
// EOF
