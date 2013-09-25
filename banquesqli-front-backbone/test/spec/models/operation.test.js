define([
    '../../../app/scripts/models/operation-model'

], function(OperationModel) {

    describe('Operation Model', function(){

        beforeEach(function(done) {

            this.operation = new OperationModel({
                reason: 'Virement',
                amount: 100
            });
            done();
        });

        afterEach(function(done){

            done();
        });

        it('should have Virement as reason', function(){
            this.operation.getReason().should.equal('Virement');
        });

        it('should have 100 as amount', function(){
            this.operation.getAmount().should.equal(100);
        });

        it('should be changed and have Virement bancaire as reason', function(){
            this.operation.setReason('Virement bancaire');

            this.operation.getReason().should.equal('Virement bancaire');
        });

        it('should be changed and have 50 as amount', function(){
            this.operation.setAmount(50);

            this.operation.getAmount().should.equal(50);
        });

    });
});