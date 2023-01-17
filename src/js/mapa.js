(function() {
    
    const lat = 19.432757;
    const lng = -99.1340728;
    const mapa = L.map('mapa').setView([lat, lng ], 14);
    
    //Utilizar provider y geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //Colocando un Pin
    marker = new L.marker([lat,lng],{
        draggable: true, //Draggable se utiliza para mover el mapa cuando se mueve el Pin
        autoPan: true
    })
    .addTo(mapa)

    //Para detectar el movimiento del Pin
    marker.on('moveend', function(event){
        marker = event.target
        const position = marker.getLatLng(); //Obtenemos la LAtitud y longitud donde se suelta el Pin
        mapa.panTo(new L.LatLng(position.lat, position.lng)) //Centramos el mapa una vez que se suelta el Pin

        // Obtener informacion de las calles al mmomento de soltar el Pin
        geocodeService.reverse().latlng(position, 14).run((error, result)=>{
            //console.log(result)
            marker.bindPopup(result.address.LongLabel)
            //Para Lenar los inputs ocultos con la informcion necesaria
            document.querySelector('.street').textContent = result?.address?.Address ?? '';
            document.querySelector('#servicestreet').textContent = result?.address?.Address ?? '';
            document.querySelector('#serviceLat').textContent = result?.latlng?.lat ?? '';
            document.querySelector('#serviceLng').textContent = result?.latlng?.lng ?? '';
        })
    })

})()