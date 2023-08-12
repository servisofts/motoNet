export default {
    debug: true, //para que se vea los returns del server
    name: 'motonet',
    // ssl: true,
    // host: 'motonet.servisofts.com',
    ssl: false,
    host: '192.168.2.1',
    port: {
        native: 10004,
        web: 20004,
        http: 30004
    },
    cert: 'MIID1DCCArygAwIBAgIEX2pTMDANBgkqhkiG9w0BAQsFADCBqzELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxEDAOBgNVBAsMB21vdG9uZXQxHzAdBgNVBAMMFm1vdG9uZXQuc2Vydmlzb2Z0cy5jb20xJzAlBgkqhkiG9w0BCQEWGHJpY2t5LnBhei5kLjk3QGdtYWlsLmNvbTAeFw0yMDA5MjIxOTQwMzJaFw0yMDA5MjMxOTQwMzJaMIGrMQswCQYDVQQGEwJCTzESMBAGA1UECAwJQXYgQmFuemVyMRMwEQYDVQQHDApTYW50YSBDcnV6MRcwFQYDVQQKDA5TZXJ2aXNvZnRzIFNSTDEQMA4GA1UECwwHbW90b25ldDEfMB0GA1UEAwwWbW90b25ldC5zZXJ2aXNvZnRzLmNvbTEnMCUGCSqGSIb3DQEJARYYcmlja3kucGF6LmQuOTdAZ21haWwuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkyUYCVpHjamydpSHo/xKes1O4Hdie8ShKFjxcr8v8cXxs/J9cd++MGvmM+RtHr8bkm7OaD0dN4VnQlm8mULEU8X5Yu2JH5emwZo4GZwp3o51IQfQEUYIRqFx+MaYnACL6REQ7OcXCB0l9zWCBolPN/g9t4Er4txnlecGuTM7QnMoVMg9/emvUhY2Yvu16G4oERT+58iToebfWCWEFTngBZ+UoTdzHe5wUNJqD2bxBgNkI8+BJQ7AQg/O0690bYtU5RwbvSebi2MNFhWJOAE29jtp8ZJE4yeDSkdORZRbopIcG1uqRon/+im21LqCNH50ak5aRQmXfVCwLieTbIE25QIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQA6ww1XO5c6S3BOu02ngZ0MRI558dZSDA7/RGg86MqRz911J5smvd1uvs4Xv9VXHdpKd7Ci2Z16fEpmBWTd+frzQjMq0WufzeGIHNWz0H0C+CJmhi39ujgbPjyICQ/cxhDq5IDG2RcLs0t//EABGulnNAGjaKObaEDI80bhWbrp6tUk4U8o2L93Yp2lNdGWimpsHNrJOjZiq/Zg09ZXMstFnjAK5jA4xVobN8EfbV9TRUmF5xh5Sek2C32eY+BeF55TlYt19VNiGSdRIiDq9w26dvy0QlYlsy9eP3UG/XO1gUB2crQyajRRtC32trY5+44zrU02WI1eSIc8+jlHWPf4',
    apis: {
        // roles_permisos: 'https://rolespermisos.servisofts.com/http/',
        // empresa: 'https://empresa.servisofts.com/http/',
        // inventario: 'https://inventario.servisofts.com/http/',
    },
    timeReconnect: 5000
}