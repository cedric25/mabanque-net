define([
    '../../../app/scripts/models/user-model'

], function(UserModel) {

    describe('User Model', function(){

        beforeEach(function(done) {

            this.user = new UserModel({
                firstName: 'Matthis',
                lastName: 'Duclos',
                login: '1234'
            });
            done();
        });

        afterEach(function(done){

            done();
        });

        it('should have Matthis as firstName', function(){
            this.user.getFirstName().should.equal('Matthis');
        });

        it('should have Duclos as lastName', function(){
            this.user.getLastName().should.equal('Duclos');
        });

        it('should be changed and have Matt as firstName', function(){
            this.user.setFirstName('Matt');

            this.user.getFirstName().should.equal('Matt');
        });

        it('should be changed and have Teste as lastName', function(){
            this.user.setLastName('Teste');

            this.user.getLastName().should.equal('Teste');
        });

    });
});