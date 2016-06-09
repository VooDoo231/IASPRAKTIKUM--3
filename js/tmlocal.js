//------------------------------------------------------------------------------
// Template-Manager
// - Laden und Bereitstellen von Template-Quellen oder anderen Textquellen
//------------------------------------------------------------------------------
// file: tmlocal.js
// revision: 4 26.05.2016
// revision: 3 30.12.2015
// revision: 2 14.12.2015
// revision: 1 17.09.2013
// revision: 0 26.01.2012
// depends-on:
//    node-webkit
//    jquery
//    inheritance
//    lib
//------------------------------------------------------------------------------
var APPLIB={};
var FS = require ('fs');

APPLIB.TemplateManager_cl = Class.create({
   initialize: function () {
      this.templates_o = {};
      this.compiled_o  = {};
      this.teCompiler_o = new TELIB.TemplateCompiler_cl();
      // Templates anfordern und speichern
      this.readTemplates_p();
   },
   get_px: function (name_spl) {
      if (name_spl in this.templates_o) {
         return this.templates_o[name_spl];
      } else {
         return null;
      }
   },
   execute_px: function (name_spl, data_opl) {
      var compiled_o = null;
      if (name_spl in this.compiled_o) {
         compiled_o = this.compiled_o[name_spl];
      } else {
         // Übersetzen und ausführen
         if (name_spl in this.templates_o) {
            this.teCompiler_o.reset_px();
            compiled_o = this.teCompiler_o.compile_px(this.templates_o[name_spl]);
            this.compiled_o[name_spl] = compiled_o;
         }
      }
      if (compiled_o != null) {
         return compiled_o(data_opl);
      } else {
         return null;
      }
   },
   readTemplates_p: function () {
      // Template-Dateien aus dem Verzeichnis "/templates" lesen und in einem dict abspeichern
      var dir_s = './templates/';
      var files_a = FS.readdirSync(dir_s);
      var loop_i;
      var path_s;
      for (loop_i = 0; loop_i < files_a.length; loop_i++) {
         path_s = dir_s + files_a[loop_i];
         this.templates_o[files_a[loop_i]] = FS.readFileSync(path_s, {encoding:'utf8'});
      }
   }
});
// EOF
