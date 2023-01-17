/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ (() => {

eval("(function() {\n    \n    const lat = 19.432757;\n    const lng = -99.1340728;\n    const mapa = L.map('mapa').setView([lat, lng ], 14);\n    \n    //Utilizar provider y geocoder\n    const geocodeService = L.esri.Geocoding.geocodeService();\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa);\n\n    //Colocando un Pin\n    marker = new L.marker([lat,lng],{\n        draggable: true, //Draggable se utiliza para mover el mapa cuando se mueve el Pin\n        autoPan: true\n    })\n    .addTo(mapa)\n\n    //Para detectar el movimiento del Pin\n    marker.on('moveend', function(event){\n        marker = event.target\n        const position = marker.getLatLng(); //Obtenemos la LAtitud y longitud donde se suelta el Pin\n        mapa.panTo(new L.LatLng(position.lat, position.lng)) //Centramos el mapa una vez que se suelta el Pin\n\n        // Obtener informacion de las calles al mmomento de soltar el Pin\n        geocodeService.reverse().latlng(position, 14).run((error, result)=>{\n            //console.log(result)\n            marker.bindPopup(result.address.LongLabel)\n            //Para Lenar los inputs ocultos con la informcion necesaria\n            document.querySelector('.street').textContent = result?.address?.Address ?? '';\n            document.querySelector('#servicestreet').textContent = result?.address?.Address ?? '';\n            document.querySelector('#serviceLat').textContent = result?.latlng?.lat ?? '';\n            document.querySelector('#serviceLng').textContent = result?.latlng?.lng ?? '';\n        })\n    })\n\n})()\n\n//# sourceURL=webpack://betterservice/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"]();
/******/ 	
/******/ })()
;