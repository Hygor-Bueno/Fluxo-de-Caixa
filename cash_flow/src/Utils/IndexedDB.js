export class IndexedDB {
    outDB;
    db;
    database = {
        name: "mercuriusDB",
        storeName: "cash_flow"
    };
    dataList =[];
    createDB() {
        if (window.indexedDB) {
            const request = window.indexedDB.open(this.database.name, 1); //Cria o banco de dados.

            request.onsuccess = (event) => {
                console.log("sucsess", request.result, event);
                this.db = request.result;
                this.outDB = 'Successed request';
            } //Retorna se ouver sucesso na conexão

            request.onerror = (event) => {
                console.log("error", event);
                this.outDB = 'Errr request';
            } //Retorna se ouver erro na conexão

            request.onupgradeneeded = (event) => {
                this.db = event.target.result;

                const objectStorage = this.db.createObjectStore(this.database.storeName, {
                    keyPath: 'id',
                    autoIncrement: true
                }); //objectStorage - "Tabela"

                objectStorage.createIndex("date", "date", { unique: false }) // Cria os index - "colunas"
                objectStorage.createIndex("description", "description", { unique: false })
                objectStorage.createIndex("Prohibited", "Prohibited", { unique: false })
                objectStorage.createIndex("exit", "exit", { unique: false })
                objectStorage.createIndex("Cashier", "Cashier", { unique: false })

                console.log("upgrade", event);
                this.outDB = 'Upgraded request';
            } //Retorna se ouver atualização na conexão
        } else {
            console.log("no support")
        }
    }
    addData() {
        const transactionAdd = this.db.transaction([this.database.storeName], 'readwrite');
        const objectStorage = transactionAdd.objectStore(this.database.storeName);

        const newMoviment = {
            date: '22/07/2022',
            description: "Agua",
            Prohibited: "100",
            exit: "",
            Cashier: ""
        };
        objectStorage.add(newMoviment);

        transactionAdd.oncomplete = (event) => {
            console.log("Transaction completed", event);
        }

        transactionAdd.onerror = (event) => {
            console.log("Transaction error", event);
        }
    }
    getAllData(){
        this.dataList = [];
        const objectStorage = this.db.transaction(this.database.storeName).objectStore(this.database.storeName);

        objectStorage.openCursor().onsuccess = (event) =>{
            const cursor = event.target.result;
            if(cursor){
                this.dataList.push(cursor.value)
                cursor.continue();
            }
        }
        console.log(this.dataList)
    }
    getData(id){
        this.dataList = [];
        const objectStorage = this.db.transaction(this.database.storeName).objectStore(this.database.storeName);
        const request = objectStorage.get(id);

        request.onsuccess = () =>{
            console.log("Sucesso")
        }
    }
    deleteData(event){
        const locationId = parseInt(event);
        const transaction = this.db.transaction([this.database.storeName], 'readwrite');
        const objectStorage = transaction.objectStore(this.database.storeName);

        objectStorage.delete(event);

        transaction.oncomplete = (event) => {
            console.log("Transaction completed id "+locationId, event);
            this.getData();
        }
    
        transaction.onerror = (event) => {
            console.log("Transaction error", event);
        }
    }
}
