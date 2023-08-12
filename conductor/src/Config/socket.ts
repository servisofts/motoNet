export default {
    debug: true, //para que se vea los returns del server
    name: 'tapeke',
    ssl: true,
    host: 'tapeke.servisofts.com',
    // ssl: false,
    // host: '10.83.253.250',   
    // ssl: false,
    // host: '192.168.3.2',
    port: {
        native: 10031,
        web: 20031,
        http: 30031
    },
    cert: 'MIID0DCCArigAwIBAgIEYgRJTTANBgkqhkiG9w0BAQsFADCBqTELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxDzANBgNVBAsMBnRhcGVrZTEeMBwGA1UEAwwVdGFwZWtlLnNlcnZpc29mdHMuY29tMScwJQYJKoZIhvcNAQkBFhhyaWNreS5wYXouZC45N0BnbWFpbC5jb20wHhcNMjIwMjA5MjMwNzU3WhcNMjIwMjEwMjMwNzU3WjCBqTELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxDzANBgNVBAsMBnRhcGVrZTEeMBwGA1UEAwwVdGFwZWtlLnNlcnZpc29mdHMuY29tMScwJQYJKoZIhvcNAQkBFhhyaWNreS5wYXouZC45N0BnbWFpbC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCaIRwLARQqohcmnm44B3Qca60sKgo/H6tXeQ7tQyvrMAmNZ2mcod0xDpUFnyEu9Ua+Bb9kF1PCPB0udqLmKG5ZeXoHkSRNF/yM++IxzjUDjNw13hyh/2cfi7GvEC2gUer5TBl0ZJWVGGcXUywlFo5DtH2uAbO8QKnnpqYEqAH9fbiP9P7TqbpkbEcMz8bgsDc8+RJB5nqcc/jdUCRA9n6a1ey3ncH26qtInsp/m0reF+MTJBzMJbYU9erUAP/GKcwmy4NE2UiFwu0QDF6AjuaI3m3FJ5Gp2z59aJeaXdHAx2SiB0wsZuw6Xun29RcGZ2KQk6iIkKg+xFU9E7AnI33BAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAGASGpT2VF+qrPj8cRwMIttnsxT/eOKWjG6gL3RewnBen7bTmAg4qjZ4TYLte6aLbbu6V/WDh52WN5rarLj3/KOHfcKmsKHpjfCuapcGEisRvB9Hpx9sePqxsEm0wjjpyfArX+Yd2E6/hFeeDnWitjgtMe5NvvSDdnVOaUliZPzbMlUT+SB60zZC00PhNCJIr+uKdApVRBabMUMNlZoM5O2fiJ7KlpKnkZWh4Xsgs2cb97pbOYfXo5NU9C+F2tjoAOkBUZVXduKTnYeojvWgyK1YNDzOeX4F3gAXpwkXdH38NtuIpSKDsMmfWRk+YU931YYAck6aBhTSEGvRe3OdQHM=',
    apis: {
        // roles_permisos: 'https://rolespermisos.servisofts.com/http/',
        // empresa: 'https://empresa.servisofts.com/http/',
        // inventario: 'https://inventario.servisofts.com/http/',
    },
    timeReconnect: 5000
}