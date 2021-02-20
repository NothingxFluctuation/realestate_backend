mapboxgl.accessToken = 'pk.eyJ1IjoibW9heWFkOGFsdGFtaW1pIiwiYSI6ImNrZTI2YjZtaTA2YWMzMXBkbXFseHUxY3MifQ.zUJ5cH2988Nzv6aYdbmtQg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/moayad8altamimi/ckcijutu90b231inzpk1sht64', // stylesheet location
    center: [46.72185, 24.68773], // starting position [lng, lat]
    zoom: 10 // starting zoom
});


let changing = document.getElementById('trigger_change');
var nightMode = document.querySelector('#night-mode');
let dark = true;

window.onload = function() {

    if (localStorage.getItem('source_box') != null || localStorage.getItem('source_Layer') != null) {
        localStorage.removeItem('source_Layer');
        localStorage.removeItem('source_box');
    }



};



// let url = 'data.geojson'


nightMode.addEventListener('click', e => {
    console.log('handling night');

    document.documentElement.classList.toggle('night-mode');
    if (document.documentElement.classList.contains('night-mode')) {
        localStorage.setItem('gmtNightMode', true);
    }
    localStorage.removeItem('gmtNightMode');

    if (dark == true) {

        map.setStyle('mapbox://styles/mapbox/streets-v11');
        console.log(Satellite);
        
        dark = false;
        if (localStorage.getItem('source_box') != null || localStorage.getItem('source_Layer') != null) {
            let source_box = localStorage.getItem('source_box');
            let source_Layer = localStorage.getItem('source_Layer');
            map.removeLayer(source_Layer);
            map.removeSource(source_box);
            localStorage.removeItem('source_Layer');
            localStorage.removeItem('source_box');
        }


    } else if (dark == false) {

        map.setStyle('mapbox://styles/moayad8altamimi/ckcijutu90b231inzpk1sht64');
        
        dark = true;
        if (localStorage.getItem('source_box') != null || localStorage.getItem('source_Layer') != null) {
            let source_box = localStorage.getItem('source_box');
            let source_Layer = localStorage.getItem('source_Layer');
            map.removeLayer(source_Layer);
            map.removeSource(source_box);
            localStorage.removeItem('source_Layer');
            localStorage.removeItem('source_box');
        }
    }
})

// changing.addEventListener('click', e => {

    

//     if (dark == true) {

//         map.setStyle('mapbox://styles/mapbox/streets-v11');
//         console.log(Satellite);
//         changing.style.backgroundImage = "url('/static/v10.jpg')";
//         changing.style.color = "#99cc34";
//         dark = false;
//         if (localStorage.getItem('source_box') != null || localStorage.getItem('source_Layer') != null) {
//             let source_box = localStorage.getItem('source_box');
//             let source_Layer = localStorage.getItem('source_Layer');
//             map.removeLayer(source_Layer);
//             map.removeSource(source_box);
//             localStorage.removeItem('source_Layer');
//             localStorage.removeItem('source_box');
//         }


//     } else if (dark == false) {

//         map.setStyle('mapbox://styles/moayad8altamimi/ckcijutu90b231inzpk1sht64');
//         changing.style.backgroundImage = "url('/static/satellite..jpg')";
//         changing.style.color = "#99cc34";
//         dark = true;
//         if (localStorage.getItem('source_box') != null || localStorage.getItem('source_Layer') != null) {
//             let source_box = localStorage.getItem('source_box');
//             let source_Layer = localStorage.getItem('source_Layer');
//             map.removeLayer(source_Layer);
//             map.removeSource(source_box);
//             localStorage.removeItem('source_Layer');
//             localStorage.removeItem('source_box');
//         }
//     }

// })






fetch(url).then(response => response.json()).then(data => {


    var hoveredStateId = null;


    map.on('style.load', function() {
        if (localStorage.getItem('source_box') != null || localStorage.getItem('source_Layer') != null) {
            let source_box = localStorage.getItem('source_box');
            let source_Layer = localStorage.getItem('source_Layer');
            map.removeLayer(source_Layer);
            map.removeSource(source_box);
            localStorage.removeItem('source_Layer');
            localStorage.removeItem('source_box');
        }
        map.addSource('national-park', {
            'type': 'geojson',
            'data': data,
            'generateId': true // this ensure that all features have unique ids

        })
        map.addLayer({
            'id': 'park-boundary',
            'type': 'fill',
            'source': 'national-park',
            'paint': {
                'fill-color': '#fff',
                'fill-opacity': [
                    'case', ['boolean', ['feature-state', 'hover'], false],
                    1,
                    0.5
                ]
            }
        });
        map.addLayer({
            'id': 'land-borders',
            'type': 'line',
            'source': 'national-park',
            'layout': {},
            'paint': {
                'line-color': '#fff',
                'line-width': 1
            }
        });
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        map.on('mousemove', 'park-boundary', function(e) {
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.lngLat.wrap();
            var description = e.features[0].id;
            popup
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
            if (e.features.length > 0) {
                if (hoveredStateId) {

                    console.log(e.features[0].id);
                    map.setFeatureState({
                        source: 'national-park',
                        id: hoveredStateId
                    }, {
                        hover: false
                    });
                }

                hoveredStateId = e.features[0].id;
                map.setFeatureState({
                    source: 'national-park',
                    id: hoveredStateId
                }, {
                    hover: true
                });
            }
        });
        map.on('mouseleave', 'park-boundary', function() {
            popup.remove();
            if (hoveredStateId) {
                map.setFeatureState({
                    source: 'national-park',
                    id: hoveredStateId
                }, {
                    hover: false
                });
            }
            hoveredStateId = null;
        });

        // drop.js starts here


        let Scheme_list = document.getElementById('Scheme_list');
        let Dis_list = document.getElementById('Dis_list');
        let Block_list = document.getElementById('Block_list');
        let Parcel_list = document.getElementById('Parcel_list');
        let District = document.getElementById('District');
        let Plan = document.getElementById('Plan');
        let Block = document.getElementById('Block');
        let Parcel = document.getElementById('Parcel');
        let Select_all = document.getElementById('Select_all');
        let Dis_all = [];
        let Plan_all = [];
        let Block_all = [];
        let Parcel_all = [];
        District.value = '';
        Plan.value = '';
        Block.value = '';
        Parcel.value = '';
        window.onload = function() {
            if (localStorage.getItem('source_box') != null || localStorage.getItem('source_Layer') != null) {
                localStorage.removeItem('source_Layer');
                localStorage.removeItem('source_box');
                map.removeLayer(source_Layer);
                map.removeSource(source_box);
            }
        };
        data.features.forEach(function(element) {


            let dist = element.properties.Dis_Code;
            let neigh;
            if (Dis_all.includes(dist) == false) {
                Dis_all.push(dist);

                neigh = element.properties.Neighborho;

                Dis_list.innerHTML += `<option value='${dist}'>${neigh}</option>`;
            }






        })
        console.log("Dis_all");
        console.log(Dis_all);
        District.addEventListener('change', function() {
            Plan_all = [];
            Block_all = [];
            Parcel_all = [];
            map.setFilter('park-boundary');
            map.setFilter('land-borders');
            let pla;
            Plan.value = '';
            Scheme_list.innerHTML = '';
            Block_list.innerHTML = '';
            Parcel_list.innerHTML = '';
            Block.value = '';
            Parcel.value = '';

            data.features.forEach(function(element) {

                let dis = element.properties.Dis_Code;


                if (District.value == dis) {

                    pla = element.properties.Plan;
                    if (Plan_all.includes(pla) == false) {
                        Plan_all.push(pla);
                        Scheme_list.innerHTML += `<option value='${pla}'>${pla}</option>`;
                    }
                }

            })



        })
        Plan.addEventListener('change', function() {

            Block_all = [];
            Parcel_all = [];
            map.setFilter('park-boundary');
            map.setFilter('land-borders');
            let Blo;
            Block_list.innerHTML = '';
            Parcel_list.innerHTML = '';

            Block.value = '';
            Parcel.value = '';
            data.features.forEach(function(element) {

                let pla = element.properties.Plan;
                let dis = element.properties.Dis_Code;


                if (District.value == dis && Plan.value == pla) {

                    Blo = element.properties.Block;
                    if (Block_all.includes(Blo) == false) {
                        Block_all.push(Blo);

                        Block_list.innerHTML += `<option value='${Blo}'>${Blo}</option>`;
                    }

                }

            })



        })
        Block.addEventListener('change', function() {

            Parcel_all = [];

            map.setFilter('park-boundary');
            map.setFilter('land-borders');

            let Par;

            Parcel_list.innerHTML = '';

            Parcel.innerHTML = '';
            data.features.forEach(function(element) {

                let dis = element.properties.Dis_Code;
                let pla = element.properties.Plan;
                let blo = element.properties.Block;


                if (District.value == dis && Plan.value == pla && Block.value == blo) {

                    Par = element.properties.Parcel;
                    if (Parcel_all.includes(Par) == false) {
                        Parcel_all.push(Par);
                        Parcel_list.innerHTML += `<option value='${Par}'>${Par}</option>`;
                    }
                }
            })



        })



        Select_all.addEventListener('click', function() {

            if (Plan.value == '' || Block.value == '' || Parcel.value == '' || District.value == '') {

                alert('الرجاء إدخال جميع الحقول');
            } else {

                debugger
                map.setFilter('park-boundary');
                let D = District.value;
                let P = Plan.value;
                let B = Block.value;
                let Pa = Parcel.value;
                let ID_search = `001-101-${D}-${P}-${B}-${Pa}`;
                let Searched_polygon;
                let index;
                let Dis_box;
                if (localStorage.getItem('source_box') != null || localStorage.getItem('source_Layer') != null) {
                    let source_box = localStorage.getItem('source_box');
                    let source_Layer = localStorage.getItem('source_Layer');
                    map.removeLayer(source_Layer);
                    map.removeSource(source_box);
                    localStorage.removeItem('source_Layer');
                    localStorage.removeItem('source_box');
                }


                data.features.forEach(function(element) {
                    console.log('in');
                    if (ID_search == element.properties.ID) {
                        console.log('inner');

                        Searched_polygon = element.geometry.coordinates;
                        index = data.features.indexOf(element);
                        let source_box = `High${index}`;
                        let source_Layer = `Highlight${index}`;
                        localStorage.setItem('source_box', source_box)
                        localStorage.setItem('source_Layer', source_Layer)
                            // console.log(element.properties.Dis_Code);
                        Dis_box = element.properties.Dis_Code;


                    }


                    if (element.properties.Dis_Code == Dis_box) {

                        map.setFilter('park-boundary', [
                            '==', ['get', 'Dis_Code'], Dis_box
                        ]);
                        map.setFilter('land-borders', [
                            '==', ['get', 'Dis_Code'], Dis_box
                        ]);


                    }


                })



                // map.removeSource(source_box);
                // map.removeLayer(source_Layer);

                map.addSource(`High${index}`, {
                    'type': 'geojson',
                    'data': data.features[index],
                    'generateId': true // this ensure that all features have unique ids

                })


                map.addLayer({
                    'id': `Highlight${index}`,
                    'type': 'fill',
                    'source': `High${index}`,
                    'paint': {
                        'fill-color': '#ccff00',

                    }
                });
                let place = Searched_polygon[0][0][0];
                map.flyTo({
                    center: place,
                    zoom: 17,

                });

            }


        })




    });
});