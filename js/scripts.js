$(function() {
  $.ajax({
      url       : 'timeline.xml',
      dataType  : 'xml'
    }).done(function(xml){
      xml = xml.getElementsByTagName('timeline')[0];
      console.log("xml : ");
      console.log(xml);
      var mois = xml.getElementsByTagName('mois');
      var moisLength = mois.length;
      for(var i=0; i<moisLength; i++){
        var a = mois[i];
        console.log("a : ");
        console.log(a);
      }
    });
});