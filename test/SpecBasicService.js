describe('Servicio: BasicService', function() {

    var service, $httpBackend, data = {};

    beforeEach(module('app'));

    beforeEach(inject(function(BasicService, _$httpBackend_) {
        service = BasicService;
        $httpBackend = _$httpBackend_;
    }));

    it('Debe Cargar el Servicio BasicService', function() {
        expect(service).toBeDefined();
    });

    it('Debe devolver los datos al llamar a findBasicInfo', function() {
        var somedata = {
            _id: "5616d63c97abfb99102a0149",
            name: "Edificio E",
            description: "Edificio de E de Ingeniería",
            longitude: -90.5125379562378,
            latitude: 14.658936
        };


        $httpBackend.whenGET('/api/buildings/search/?text=Edificio+E').respond(somedata);

        service.findBasicInfo('buildings', 'Edificio E')
            .then(function(result) {
                data = result;
            });

        $httpBackend.flush();

        expect(data).toEqual(somedata);
    });

    it('Debe devolver data vacia', function() {
        var somedata = [];

        $httpBackend.whenGET('/api/buildings/search/?text=Edificio+U').respond(somedata);

        service.findBasicInfo('buildings', 'Edificio U')
            .then(function(result) {
                data = result;
            });

        $httpBackend.flush();
        expect(data).toEqual([]);;
    });

    it('Debe manejar error al buscar usuario jose@gmail.com en servicio findBasicInfo', function() {
        var somedata = {
            statusCode: 404,
            error: "Not Found"
        };


        $httpBackend.whenGET('/api/users/search/?text=jose@gmail.com').respond(somedata);

        service.findBasicInfo('users', 'jose@gmail.com')
            .then(function(result) {
                data = result;
            });

        $httpBackend.flush();

        expect(data.error).toEqual('Not Found');
    });

    afterEach(function() {
        // make sure all requests where handled as expected.
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });
});
