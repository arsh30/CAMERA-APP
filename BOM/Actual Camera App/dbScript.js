let request = indexedDB.open("camera", 2);
let db;
request.onsuccess = function (e) {
  db = request.result; //solve the database in db
  let note = {
    nId: "bhbdsb",
    txt: "Arsh here",
  };

  let tx = db.transaction("gallery", "readwrite");
  console.log(tx);
  let store = tx.objectStore("gallery"); //fetch this
  store.add(note);
};

request.onupgradeneeded = function (e) {
  db = request.result;
  db.createObjectStore("gallery", { keyPath: "nId" });
};
