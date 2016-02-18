describe("Unit: Testing Services", function() {
    describe("Search Service:", function() {

        beforeEach(function() {
            angular.module('app');
        });

       
        it('should contain two search options',
            inject(function(BasicService) {
                expect(BasicService.findBasicInfo('buildings','Edificio')).not.toBeNull();
        }));

   });
});