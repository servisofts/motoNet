const Styles = {
    "colors": {
        "primary": "#00a5ce",
        "primary2": "#000",
        "secondary": "#fff",
        "boder": "#eeeeee",
        "fondo": "#05C2EA",
        "button": "#05EAB6",
        "button2": "#EE5534",
        "textColor": "#9B9B9B",
        "textColorSuave": "#8BE8F6",
        "buttonSecondary": "#F1F2F2"
    },
    "mapa": [
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffeb3b"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#e9faff"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#e9faff"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#e9faff"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#e9faff"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "labels",
            "stylers": [
                {
                    "color": "#e9faff"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a7ecfc"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#a7ecfc"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a7ecfc"
                }
            ]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#a7ecfc"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#a7ecfc"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a7ecfc"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#a7ecfc"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a7ecfc"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#a7ecfc"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "weight": 1
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#d2f5ff"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#e8e8e8"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#a6a6a6"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#aef1fc"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#aef1fc"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#aef1fc"
                },
                {
                    "color": "#e8e8e8"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#e8e8e8"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#e8e8e8"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#a6a6a6"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]
};
export default Styles;