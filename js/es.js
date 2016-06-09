//------------------------------------------------------------------------------
// Event-Service: asynchroner Nachrichtenaustausch
//------------------------------------------------------------------------------
// depends-on:
//    jquery
//    inheritance
//    lib
//------------------------------------------------------------------------------

function each(object_opl, iterator, context) {
   for (var key in object_opl) {
      iterator.call(context, object_opl[key], key);
   }
}

function findAll(object_opl, iterator, context) {
   var results = [];
   each(object_opl, function(value, index) {
      if (iterator.call(context, value, index))
         results.push(value);
   });
   return results;
}

function compact(object_opl) {
   return findAll(object_opl, function(value) {
      return value != null;
   });
}

//------------------------------------------------------------------------------
APPLIB.EventService_cl = Class.create({
//------------------------------------------------------------------------------
   initialize: function () {
      this.queue_o      = [];
      this.Subscriber_o = {};
      window.onhashchange = this.send_p.bind(this);
   },
   send_p: function (event_opl) {
      // der hash-Wert interessiert hier nicht
      // var msg_s = window.location.hash.substr(1);
      // gibt es Elemente in der queue?
      if (this.queue_o.length > 0) {
         var qentry_o = this.queue_o[0];
         qentry_o[0].notify_px.apply(qentry_o[0], [qentry_o[0], qentry_o[1], qentry_o[2]]);
         this.queue_o.shift();
      }
      if (this.queue_o.length > 0) {
         var d_o = new Date();
         window.location.hash = d_o.getTime();
      }
      event_opl.preventDefault();
      return false;
   },
   subscribe_px: function (Subscriber_opl, Message_spl) {
      if (Message_spl in this.Subscriber_o) {
         // Message bekannt, Liste der Subscriber untersuchen
         if (this.Subscriber_o[Message_spl].indexOf(Subscriber_opl) == -1) {
            this.Subscriber_o[Message_spl].push(Subscriber_opl);
         }
      } else {
         // Message noch nicht vorhanden, neu eintragen
         this.Subscriber_o[Message_spl] = [Subscriber_opl];
      }
   },
   unSubscribe_px: function (Subscriber_opl, Message_spl) {
      if (Message_spl in this.Subscriber_o) {
         // Message bekannt, Liste der Subscriber untersuchen
         var Entry_a = this.Subscriber_o[Message_spl];
         var index_i = Entry_a.indexOf(Subscriber_opl);
         if (index_i >= 0) {
            // Eintrag entfernen
            Entry_a[index_i] = null;
            Entry_a = compact(Entry_a); // compact liefert Kopie!
            if (Entry_a.length == 0) {
               // keine Subscriber mehr, kann entfernt werden
               delete this.Subscriber_o[Message_spl];
            }
         }
      } else {
         // Message nicht vorhanden, falsche Anforderung
      }
   },
   publish_px: function (Message_spl, Data_opl) {
      var data_s = "<null>";
      if ((Data_opl != undefined) && (Data_opl != null)) {
         data_s = Data_opl.toString();
      }
      console.info('es - publish ' + Message_spl + ' ' + data_s);
      var that = this;
      each(this.Subscriber_o, function (value_apl, key_spl) {
            // geliefert wird jeweils ein Wert, hier ein Array, und der Key
            if (key_spl == Message_spl) {
               // an alle Subscriber weitergeben
               each(value_apl, function (entry_opl, index_ipl) {
                  // geliefert wird hier das Element und der Index
                  that.queue_o.push([entry_opl, Message_spl, Data_opl]);
                  var d_o = new Date();
                  window.location.hash = d_o.getTime();
                  }, this
               );
            }
         }, this
      )
   }
});

// EOF
