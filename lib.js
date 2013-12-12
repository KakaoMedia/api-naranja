// Hyper Micro template 
String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
}

// Agregar (mostrar) el tab eventos si el local tiene, e incluir los eventos de la API de experiencias
function folkano_get_eventos(place_id) {
  $.getJSON('http://experiencias.folkano.com/api/event/?place=' + place_id + 
    '&username=XXX&api_key=XXX' + '&callback=?', function(data) {

    if(data.meta.total_count > 0) {

      var salida = '';
      var estructura = "<div class='evento_element'> \
                          <a href='{absolute_url}' class='image_a' target='_blank'> \
                            <img src='{image}' /> \
                          </a> \
                          <a href='{absolute_url}' class='evento_titulo' target='_blank'>{name}</a><br /> \
                          <span>Fecha: {date}</span> \
                        </div>";

      $.each(data.objects, function(index, value){
        salida += estructura.supplant(value);
      })

      $('#api_eventos_place').append(salida);
      $('#evento_tab_titulo').removeClass('hide');
    }

  });
}
