function add_cart(id){
// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("site_data");

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("cart", {keyPath: "id"});
    var index = store.createIndex("NameIndex", ["id",]);
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("cart", "readwrite");
    var store = tx.objectStore("cart");
    var index = store.index("NameIndex");

    // Query the data
    var getId = store.get(id);
    getId.onsuccess = function() {
        if (typeof getId.result !== 'undefined') {
            // console.log(getId.result.amount);  // => "amount"
            var a = getId.result.amount
            var b = a+=1
            store.put({id: id, amount: b});
            document.getElementById('amount-'+id).innerHTML = b;
        }else{
            // Add some data
            // store.put({id: 12345, name: {first: "John", last: "Doe"}, age: 42});
            store.put({id: id, amount: 1});
            document.getElementById('amount-'+id).innerHTML = 1;
        }
    };   

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}
};

function check_cart(id){
    // Open (or create) the database
    var open = indexedDB.open("site_data");
    
    // Create the schema
    open.onupgradeneeded = function() {
        var db = open.result;
        var store = db.createObjectStore("cart", {keyPath: "id"});
        var index = store.createIndex("NameIndex", ["id",]);
    };
    
    open.onsuccess = function() {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("cart", "readwrite");
        var store = tx.objectStore("cart");
        var index = store.index("NameIndex");
    
        // Query the data
        var getId = store.get(id);
        getId.onsuccess = function() {
            if (typeof getId.result !== 'undefined') {
                // console.log(getId.result.amount);  // => "amount"
                var a = getId.result.amount
                document.getElementById('amount-'+id).innerHTML = a;
            }else{
                document.getElementById('amount-'+id).innerHTML = 0;
            }
        };   
    
        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
    }    
};


function remove_cart(id){
    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    
    // Open (or create) the database
    var open = indexedDB.open("site_data");
    
    // Create the schema
    open.onupgradeneeded = function() {
        var db = open.result;
        var store = db.createObjectStore("cart", {keyPath: "id"});
        var index = store.createIndex("NameIndex", ["id",]);
    };
    
    open.onsuccess = function() {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("cart", "readwrite");
        var store = tx.objectStore("cart");
        var index = store.index("NameIndex");
    
        // Query the data
        var getId = store.get(id);
        getId.onsuccess = function() {
            if (typeof getId.result !== 'undefined') {
                // console.log(getId.result.amount);  // => "amount"
                var a = getId.result.amount
                var b = a-=1
                if (b <= 0) {
                    // alert("zero");
                    store.delete(id);
                    document.getElementById('amount-'+id).innerHTML = 0;
                }else{
                store.put({id: id, amount: b});
                document.getElementById('amount-'+id).innerHTML = b;
                }
            }
        };   
    
        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
    }
};