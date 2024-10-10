const fs = require("fs");

const deleteRequest = (req, res) => {
  //Url' in temel adresini değişkene aktar
  const path = req.url.substring(0, req.url.lastIndexOf("/"));

  // Url'in sonundaki id değerini değişkene aktar
  const id = req.url.split("/")[3];

  if (path === "/api/movies" && id) {
    //*Bütün filmleri al
    const data = JSON.parse(fs.readFileSync("./data/movies.json","utf-8"));

    //*Parametre olarak gelen id'li film dizi var mı ara
    const isFound = data.find((i) => i.id === id);

    //*Yoksa id geçersiz hatası gönder
    if (!isFound) {
      res.writeHead(404);
      return res.end("Gönderilen id'li eleman bulunamadı");
    }

    //*Diziden id'si bilinen filmi kaldır
    const filtred = data.filter((i) => i.id !== id);

    //*Json dosyasına yeni diziyi aktar
    fs.writeFileSync("./data/movies.json", JSON.stringify(filtred));

    //*Clent'a cevap gönder
    res.writeHead(204);
    return res.end();
  }
};

//Nodejs export etmeek

module.exports = deleteRequest;
