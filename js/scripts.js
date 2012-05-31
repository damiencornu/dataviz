$(function() {
  $.ajax({
      url       : 'timeline.xml',
      dataType  : 'xml'
    }).done(function(xml){
      xml = xml.getElementsByTagName('timeline')[0];
      var mois = xml.getElementsByTagName('mois');
      var moisLength = mois.length;
      for(var i=0; i<moisLength; i++){
        var a = mois[i].getElementsByTagName('evenement'),
            aLength = a.length;
        var $mois = '<div class="mois cf hide" id="mois-'+mois[i].getAttribute('id')+'"></div>';
        $('#evenements').append($mois);
        for (var j=0; j<aLength; j++){
          b = a[j];
          var parti = b.getElementsByTagName('parti')[0].childNodes[0].nodeValue,
              date = b.getElementsByTagName('date')[0].childNodes[0].nodeValue + '.' +mois[i].getAttribute('mois') ,
              titre = b.getElementsByTagName('titre')[0].childNodes[0].nodeValue,
          $evenement = '<div class="event"><div class="cf">';
          $evenement+= '<div class="aside"><div="pin-parti">';
          var partiTab = parti.split(',');
          for(var k=0; k<partiTab.length; k++){
            $evenement+='<span class="pin-'+partiTab[k]+'"></span>';
          }
          $evenement+= '</div><!--/.pin-parti-->';
          $evenement+= '<div class="date">'+date+'</div></div><!--/.aside-->';
          $evenement+= '<h3>'+titre+'</h3>';
          $evenement+= '</div><!--/.cf--></div><!--/.event-->';
          $('#mois-'+i).append($evenement);
        }
      }
    });
});