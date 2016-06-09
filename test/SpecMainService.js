describe('Servicio: MainService', function () {

    var service, $httpBackend, data = {};

    beforeEach(module('app'));

    beforeEach(inject(function (MainService, _$httpBackend_) {
        service = MainService;
        $httpBackend = _$httpBackend_;
    }));

    it('Debe Cargar el Servicio MainService', function () {
        expect(service).toBeDefined();
    });

    it('Debe devolver los datos al llamar a getBuildings', function () {
        var somedata = [{
            _id: "5616d63c97abfb99102a0148",
            name: "Edificio A",
            description: "Edificio de oficinas administrativas",
            longitude: "-90.51423847675323",
            latitude: "14.65833993169169"
        }, {
                _id: "5616d63c97abfb99102a0149",
                name: "Edificio E",
                description: "Edificio de E de Ingeniería",
                longitude: -90.5125379562378,
                latitude: 14.658936
            }, {
                _id: "5616d63c97abfb99102a014a",
                name: "Edificio I",
                description: "Edificio de Ingenieria en Sistemas",
                longitude: "-90.51393270492554",
                latitude: "14.658936"
            }, {
                _id: "5616d63c97abfb99102a014b",
                name: "Edificio O",
                description: "Edificio de O",
                longitude: "-90.513411",
                latitude: "14.658936"
            }];

        $httpBackend.whenGET('/api/buildings/').respond(somedata);

        service.getBuildings()
            .then(function (result) {
                data = result;
            });

        $httpBackend.flush();

        expect(data).toEqual(somedata);
    });


    it('Debe devolver los datos al llamar a getBuilding', function () {
        var somedata = {
            _id: "5616d63c97abfb99102a0148",
            name: "Edificio A",
            description: "Edificio de oficinas administrativas",
            longitude: "-90.51423847675323",
            latitude: "14.65833993169169"
        };
        var id = "5616d63c97abfb99102a0148";

        $httpBackend.whenGET('/api/buildings/?id=' + id).respond(somedata);

        service.getBuilding(id)
            .then(function (result) {
                data = result;
            });

        $httpBackend.flush();

        expect(data).toEqual(somedata);
    });

    it('Debe devolver los datos al llamar a getRooms', function () {
        var somedata = [{
            _id: "561d13d397abb57df4d907db",
            name: "Laboratorio E",
            description: "Salon de Fisica",
            floor: "3",
            number: "320",
            type: "Salon de Clase",
            building_id: "5616d63c97abfb99102a0149"
        }, {
                _id: "561d147c97abb57df4d907dd",
                name: "Laboratorio A",
                description: "Salon de Electronica",
                floor: "3",
                number: "320",
                type: "Salon de Clase",
                building_id: "5616d63c97abfb99102a0148"
            }, {
                _id: "561d149197abb57df4d907df",
                name: "Laboratorio I",
                description: "Laboratorio de Computación",
                floor: "3",
                number: "320",
                type: "Salon de Clase",
                building_id: "5616d63c97abfb99102a014a"
            }, {
                _id: "561d14a197abb57df4d907e1",
                name: "Laboratorio O",
                description: "Laboratorio de Operaciones",
                floor: "2",
                number: "220",
                type: "Salon de Clase",
                building_id: "5616d63c97abfb99102a014b"
            }];

        $httpBackend.whenGET('/api/rooms/').respond(somedata);

        service.getRooms()
            .then(function (result) {
                data = result;
            });

        $httpBackend.flush();

        expect(data).toEqual(somedata);
    });

    it('Debe devolver los datos al llamar a getRoomTypes', function () {
        var somedata = [
            {
                "name": "Oficina Administrativa"
            },
            {
                "name": "Salon de Clase"
            },
            {
                "name": "Otro"
            }
        ];

        $httpBackend.whenGET('/admin/test/json/roomTypes.json').respond(somedata);

        service.getRoomTypes()
            .then(function (result) {
                data = result;
            });

        $httpBackend.flush();

        expect(data).toEqual(somedata);
    });

    it('Debe devolver los datos al llamar a getProcedures', function () {
        var somedata = [{
            _id: "561d3e7597abbb96fa06847d",
            name: "Inscripción",
            description: "Inscripcion de primer ingreso",
            status: true,
            steps: [{
                number: 1,
                name: "Entregar Papeleria",
                description: "Entregar papeleria Inscripción",
                room_id: "561d147c97abb57df4d907dd",
                building_id: "5616d63c97abfb99102a0148"
            }, {
                    number: 2,
                    name: "Pagar Boleta ",
                    description: "Pagar Boleta Inscripción",
                    room_id: "561d147c97abb57df4d907dd",
                    building_id: "5616d63c97abfb99102a0148"
                }]
        }];

        $httpBackend.whenGET('/api/procedures/').respond(somedata);

        service.getProcedures()
            .then(function (result) {
                data = result;
            });

        $httpBackend.flush();

        expect(data).toEqual(somedata);
    });

    it('Debe devolver los datos al llamar a getUsers', function () {
        var somedata = [{
            _id: "5615a23397abfb99102a0145",
            name: "Gabriela Recinos",
            email: "recinos.gabriela@gmail.com",
            password: "123456",
            role: {
                role_name: "Catedratico",
                permissions: [
                    "write",
                    "read"
                ]
            }
        }, {
                _id: "561ea778ff697be8175efb2e",
                name: "Jose",
                email: "jose@gmail.com",
                password: "123456",
                role: {
                    role_name: "Administrador",
                    permissions: [
                        "write",
                        "read",
                        "remove"
                    ]
                }
            }];

        $httpBackend.whenGET('/api/users/').respond(somedata);

        service.getUsers()
            .then(function (result) {
                data = result;
            });

        $httpBackend.flush();

        expect(data).toEqual(somedata);
    });


    it('Debe devolver los datos al llamar a getCourses', function () {
        var somedata = [{
            _id: "561d87da97ab560d31404664",
            name: "Fisica I",
            description: "Curso de Fisica basica I",
            user_id: "5615a23397abfb99102a0145",
            activities: [{
                name: "Laboratorio Practico",
                number: 1,
                description: "Laboratorio practico de fisica",
                begin: "08/09/2015",
                end: "30/09/2015",
                room_id: "561d149197abb57df4d907df"
            }],
            status: true,
            documents: [{
                number: 1,
                name: "Practica.PDF"
            }]
        }];

        $httpBackend.whenGET('/api/courses/').respond(somedata);

        service.getCourses()
            .then(function (result) {
                data = result;
            });

        $httpBackend.flush();

        expect(data).toEqual(somedata);
    });

    it('Debe manejdar error al buscar edificio con identificador incorrectos getBuilding', function () {
        var somedata = {
            statusCode: 500,
            error: "Internal Server Error",
            message: "An internal server error occurred"
        };
        var id = "5616d63c97abfb99102a0148MAS";

        $httpBackend.whenGET('/api/buildings/?id=' + id).respond(somedata);

        service.getBuilding(id)
            .then(function (result) {
                data = result;
            });

        $httpBackend.flush();

        expect(data).toEqual(somedata);
    });

    afterEach(function () {
        // make sure all requests where handled as expected.
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });
});
