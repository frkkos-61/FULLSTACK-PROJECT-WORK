const fs = require("fs");

const getRequest = (req, res) => {
  //bütün cevaplara eklenecek ortak veri tipi header'ı ekleyelim
  res.setHeader("Content-Type", "application/json");

  //Url' in temel adresini değişkene aktar
  const path = req.url.slice(0, 11);

  // Url'in sonundaki id değerini değişkene aktar
  const id = req.url.split("/")[3];

  //*Url' nin sonundaki parametrenin değerini al
  const param = req.url.split("=").pop().toLowerCase().trim();

  //Yola id eklenirse bir filmi gönder
  if (path === "/api/movies" && id) {
    // 1) Json dosyasından filmleri al
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    // 2) Url' deki ide'ye karşılık gelen elemanı dizide ara
    const movie = data.find((i) => i.id === id);

    // 3) Eğerki film bulursa client'a gönder
    if (movie) {
      return res.end(JSON.stringify(movie));
    }

    //4 eğer film bulunamazsa hata gönder
    //res.statusCode = 404;
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "Aranılan Film Bulunamadı" }));
  }

  // temel url'e istek atılırsa bütün filmleri gönder
  if (path === "/api/movies") {
    // 1) json dosyasından filmleri al
    const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    // eğer parametre varsa filtrelenmiş filmleri gönder
    if (param && param !== "/api/movies") {
      const filtred = movies.filter((movie) =>
        movie.title.toLowerCase().includes(param)
      );

      return res.end(JSON.stringify(filtred));
    }

    // eğer parmaetre yoksa bütün fişlmleri gönder
    return res.end(JSON.stringify(movies));
  }
};

//Nodejs export etmek
module.exports = getRequest;
