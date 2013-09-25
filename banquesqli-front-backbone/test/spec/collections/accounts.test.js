define([
    '../../../app/scripts/models/account-model',
    '../../../app/scripts/collections/accounts-collection'

], function(AccountModel, AccountsCollection) {

    describe('Accounts Collection', function(){


        beforeEach(function(done) {

            var accounts =
                [
                    {
                        "name": "Compte chèque",
                        "number": 1,
                        "ownerLogin": 1234,
                        "__v": 0,
                        "_id": "51dd58bb7a06b27c14000002",
                        "balance": 90
                    },
                    {
                        "name": "Compte épargne",
                        "number": 2,
                        "ownerLogin": 1234,
                        "__v": 0,
                        "_id": "51dd58f28b5e856423000001",
                        "balance": 110
                    },
                    {
                        "name": "Compte épargne",
                        "number": 3,
                        "ownerLogin": 12345,
                        "__v": 0,
                        "_id": "51dd59078b5e856423000002",
                        "balance": 1970
                    },
                    {
                        "name": "Compte chèque",
                        "number": 4,
                        "ownerLogin": 12345,
                        "__v": 0,
                        "_id": "51dd59128b5e856423000003",
                        "balance": 50
                    }
                ];

            //Sinon is used to mock
            this.server = sinon.fakeServer.create();
            this.server.respondWith(
                'GET',
                'http://localhost:3000/accounts',
                [200, { "Content-Type": "application/json" , "Access-Control-Allow-Origin": "*"}, JSON.stringify(accounts)]
            );
            this.server.respondWith(
                'PUT',
                'http://localhost:3000/accounts/1',
                [200, { "Content-Type": "application/json" , "Access-Control-Allow-Origin": "*"}, 'ok']
            );


            this.account1 = new AccountModel({
                number: 1,
                ownerLogin: 1234,
                balance: 950,
                name: 'Compte épargne'
            });

            this.account2 = new AccountModel({
                number: 2,
                ownerLogin: 1234,
                balance: 50,
                name: 'Compte chèque'
            });

            this.accounts = new AccountsCollection([this.account1, this.account2]);

            done();
        });

        afterEach(function(done){

            this.server.restore();
            done();
        });

        it('should have 1000 as globalBalance', function(){
            this.accounts.getGlobalBalance().should.equal(1000);
        });

        it("should have -30 as globalBalance", function(){
            this.account1.setBalance(10);
            this.account2.setBalance(-40);
            this.accounts.getGlobalBalance().should.equal(-30);
        });

        it("should be able to fetch server", function() {
            var accountsFromServer = new AccountsCollection();
            accountsFromServer.fetch();

            this.server.respond();

            should.exist(accountsFromServer);

        });

        it("should have 4 accounts as response", function() {
            var accountsFromServer = new AccountsCollection();
            accountsFromServer.fetch();

            this.server.respond();

            accountsFromServer.length.should.equal(4);

        });

        it('should find correct account', function() {

            var accountsFromServer = new AccountsCollection();
            accountsFromServer.fetch();

            this.server.respond();

            var account1 = accountsFromServer.getAccount(1);

            should.exist(account1);
            account1.getNumber().should.equal(1);
            account1.getBalance().should.equal(90);

        });

        it('should save the modified account', function() {

            var accountsFromServer = new AccountsCollection();
            accountsFromServer.fetch();

            this.server.respond();

            var account1 = accountsFromServer.getAccount(1);

            account1.setBalance(30);
            account1.save();
            this.server.respond();

            accountsFromServer.getAccount(1).should.equal(account1);

        });

    });
});