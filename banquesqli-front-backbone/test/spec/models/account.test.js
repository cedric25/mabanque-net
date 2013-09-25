define([
    '../../../app/scripts/models/account-model'

], function(AccountModel) {

    describe('Account Model', function(){

        beforeEach(function(done) {

            this.account = new AccountModel({
                number: 1,
                ownerLogin: 1234,
                balance: 50,
                name: 'Compte épargne'
            });
            done();
        });

        afterEach(function(done){

            done();
        });

        it('should have 1 as number', function(){
            this.account.getNumber().should.equal(1);
        });

        it('should have Compte épargne as name', function(){
            this.account.getName().should.equal('Compte épargne');
        });

        it("should have 50 as balance", function() {
            this.account.getBalance().should.equal(50);
        });

        it("should have 20 as a blance after a setBalance", function(){
            this.account.setBalance(20);
            this.account.getBalance().should.equal(20);
        });

        it("should be unsolvable", function() {
            this.account.testSolvency(100).should.equal(false);
        });

        it("should be solvable", function() {
            this.account.testSolvency(10).should.equal(true);
        });

        it("should have 30 as balance after debit 20", function() {
            this.account.debitAccount(20);
            this.account.getBalance().should.equal(30);
        });

        it("should have 70 as balance after credit 20", function() {
            this.account.creditAccount(20);
            this.account.getBalance().should.equal(70);
        });

    });
});