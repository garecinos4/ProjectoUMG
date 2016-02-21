describe('Controller: Controller', function() {

    beforeEach(module('app'));

    var ctrl;

    beforeEach(inject(function($controller) {
        ctrl = $controller('Controller');
    }));

    it('should have items availabel on load', function() {
        expect(ctrl.items).toEqual([
            { id: 1, label: 'first', done: true },
            { id: 2, label: 'secound', done: false }
        ]);
    });

    it('should highlight items bases on state', function() {
        var item = { id: 1, label: 'first', done: true };
        var actualClass = ctrl.getDoneClass(item);
        expect(actualClass.unfinished).toBeFalsy();
        expect(actualClass.finished).toBeTruthy();

    });


  

});
