const bodyParser = require("../utils/bodyParser");
const fs = require("fs");
const crypto = require("crypto");

const postRequest = async (req, res) => {
  if (req.url === "/api/movies") {
    //*İsteğin body kısmına eriş
    const body = await bodyParser(req);

    // todo gelen veriyi kontrol et
    const keys = [
      "title",
      "year",
      "rating",
      "description",
      "language",
      "director",
    ];

    if (
      keys.some((key) => !body[key]) ||
      !body.genre.length > 0 ||
      !body.cast.length > 0
    ) {
      res.writeHead(404);
      return res.end("Lütfen zorunlu olan bütün alanları tanımlayın");
    }

    //*Kaydedilecek filme id ekle
    body.id = crypto.randomUUID();


    //*Json dosyasından verileri al
   let data = fs.readFileSync("./data/movies.json","utf-8");
    data = JSON.parse(data);


    //* Mevcut filmlerin üzerine yeni film ekle
    data.push(body);

    //* Json dosyasını güncelle
    fs.writeFileSync("./data/movies.json",JSON.stringify(data));

    //*Client' a cevap gönder
    res.writeHead(201);
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404);
    res.end("Geçersiz yola istek atildi !!!");
  }
};

//*Nodejs export etmek

module.exports = postRequest;
