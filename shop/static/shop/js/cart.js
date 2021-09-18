function add_cart(id, nme, prc){
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
                store.put({id: id, name: nme, price: prc, amount: b});
                document.getElementById('amount-'+id).innerHTML = b;
                header_qty = parseInt(document.getElementById("header-qty").innerHTML);
                document.getElementById("header-qty").innerHTML = header_qty+=1;
            }else{
                // Add some data
                // store.put({id: 12345, name: {first: "John", last: "Doe"}, age: 42});
                store.put({id: id, name: nme, price: prc, amount: 1});
                document.getElementById('amount-'+id).innerHTML = 1;
                a = parseInt(document.getElementById("header-qty").innerHTML);
                document.getElementById("header-qty").innerHTML = a+=1;
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


function remove_cart(id, nme, prc){
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
                    header_qty = parseInt(document.getElementById("header-qty").innerHTML);
                    document.getElementById("header-qty").innerHTML -= 1;
                }else{
                    store.put({id: id, name: nme, price: prc, amount: b});
                    document.getElementById('amount-'+id).innerHTML = b;
                    header_qty = parseInt(document.getElementById("header-qty").innerHTML);
                    document.getElementById("header-qty").innerHTML -=1;
                }
            }
        };   
    
        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
    }
};


function product_list() {
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
        store.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
              if (cursor) {
                  const para1 = document.createElement("tr");
                  para1.setAttribute("id", "tr-"+cursor.value.id);
                  const element1 = document.getElementById("dynamic");
                  element1.appendChild(para1);

                  const para2 = document.createElement("td");
                  const node2 = document.createTextNode(cursor.value.name);
                  para2.appendChild(node2);

                  const para3 = document.createElement("td");
                  para3.setAttribute("id", "tp-"+cursor.value.id);
                  var total_prc = parseInt((cursor.value.amount)*(cursor.value.price));
                  var total_tag = parseInt(document.getElementById("total-prc").innerHTML);
                  var my_result = total_tag += total_prc;
                  document.getElementById("total-prc").innerHTML = my_result;
                  const node3 = document.createTextNode((cursor.value.amount)*(cursor.value.price));
                  para3.appendChild(node3);

                  const para4 = document.createElement("td");
                  const node4 = document.createTextNode(cursor.value.amount);
                  para4.setAttribute("id", "amount-"+cursor.value.id);
                  para4.appendChild(node4);

                  const para5 = document.createElement("td");
                  const node5 = document.createTextNode(cursor.value.price);
                  para5.appendChild(node5);

                  const para6 = document.createElement("td");
                  const node6 = document.createElement("img");
                  node6.setAttribute("src", "/static/shop/images/tools/remove.png");
                  node6.setAttribute("width", "20rem");
                  node6.setAttribute("onclick", "remove_product("+cursor.value.id+", '"+cursor.value.name+"', '"+cursor.value.price+"')");
                  para6.appendChild(node6);

                  const para7 = document.createElement("td");
                  const node7 = document.createElement("img");
                  node7.setAttribute("src", "/static/shop/images/tools/add_plus.png");
                  node7.setAttribute("width", "20rem");
                  node7.setAttribute("onclick", "add_product("+cursor.value.id+", '"+cursor.value.name+"', '"+cursor.value.price+"')");
                  para7.appendChild(node7);

                  const myelement = document.getElementById("tr-"+cursor.value.id);
                  myelement.appendChild(para2);
                  myelement.appendChild(para3);
                  myelement.appendChild(para4);
                  myelement.appendChild(para5);
                  myelement.appendChild(para6);
                  myelement.appendChild(para7);
                  //document.write("Name for SSN " + cursor.key + " is " + cursor.value.id);
                  cursor.continue();
              }
              else {
                // console.log("No more entries!");
              }
        }   

        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
    }
};

function remove_product(id, nme, prc){
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
                var a = getId.result.amount
                var b = a-=1
                if (b <= 0) {
                    store.delete(id);
                    document.getElementById('tr-'+id).remove();
                    document.getElementById("header-qty").innerHTML -= 1;
                }else{
                    store.put({id: id, name: nme, price: prc, amount: b});
                    document.getElementById('amount-'+id).innerHTML = b;
                    document.getElementById("header-qty").innerHTML -=1;
                    document.getElementById("tp-"+id).innerHTML = prc*b;
                }
            }
        };   
    
        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
    }
};

function add_product(id, nme, prc){
    // Open (or create) the database
    var open = indexedDB.open("site_data");
    
    // Create the schema
    open.onupgradeneeded = function() {
        var db = open.result;
        var store = db.createObjectStore("cart", {keyPath: "id"});
        var index = store.createIndex("NameIndex", ["id",]);
    }
    
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
                var a = getId.result.amount
                var b = a+=1
                store.put({id: id, name: nme, price: prc, amount: b});
                document.getElementById('amount-'+id).innerHTML = b;
                document.getElementById("header-qty").innerHTML++;
                var new_total = prc*b;
                document.getElementById("tp-"+id).innerHTML = new_total;
            }
        };   
    
        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        }
    }
}

function cart_amount() {
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

        am_ca = 0;

        // Query the data
        store.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
              if (cursor) {
                  am_ca += cursor.value.amount;
                  cursor.continue();
              }
              else {
                // console.log("No more entries!");
                // console.log(am_ca);
                document.getElementById("header-qty").innerHTML = am_ca;
              }
        }
        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
    }
}