var chart;
var ds = new Miso.Dataset({
  url : 'data/resultats_departements_T1.csv',
  delimiter : ';',
  resetOnFetch : true
});
function resultFirstRound(countyId){
	ds.fetch({
	  success: function() {
	    var depResult = this.where({
	      columns: ['Candidat','percent'],
	      rows: function(row) {
	        return row.Departement == countyId;
	      }
	    });
	    var arr = [];
	    _.each(depResult.toJSON(), function(val,key){
	      var temp = [];
	      temp.push(val.Candidat);
	      temp.push(val.percent);
	      arr.push(temp);
	    });
	    tracePie(arr);
	  }
	});
}
var ds2 = new Miso.Dataset({
  url : 'data/resultats_departements_T2.csv',
  delimiter : ';',
  resetOnFetch : true
});
function resultSecondRound(countyId){
	ds2.fetch({
	  success: function() {
	    var depResult = this.where({
	      columns: ['Candidat','percent'],
	      rows: function(row) {
	        return row.Departement == countyId;
	      }
	    });
	    var arr = [];
	    _.each(depResult.toJSON(), function(val,key){
	      var temp = [];
	      temp.push(val.Candidat);
	      temp.push(val.percent);
	      arr.push(temp);
	    });
	    tracePie(arr);
	  }
	});
}

function tracePie(dataSet){
  chart = new Highcharts.Chart({
      chart: {
          renderTo: 'container',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      title: {
          text: 'Presidential election results'
      },
      tooltip: {
          formatter: function() {
              return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(1) +' %';
          }
      },
      colors : [
        '#E20040',
        '#06589D'
      ],
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      series: [{
          type: 'pie',
          name: 'Browser share',
          data: dataSet
      }]
  });
}

function fromAS(value) {
  
}