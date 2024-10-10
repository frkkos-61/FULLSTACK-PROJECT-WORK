const http = require("http");
const getRequest = require("./methods/get");
const postRequest = require("./methods/post");
const deleteRequest = require("./methods/delete");
const defaultRequset = require("./methods/default");
const optionsRequest = require("./methods/options");

//! 1-) SERVER OLUŞTURMAK
const server = http.createServer((req, res) => {
  console.log(req.method);

  //bütün cevaplara eklenecek ortak veri tipi header'ı ekleyelim
  res.setHeader("Content-Type", "application/json");

  //!Kaynak paylaşımında sorun yaşamamak için (CORS)
  res.setHeader("Access-Control-Allow-Origin", "*");

  // gelen isteğin method türüne göre farklı cevaplar göndereceğiz.
  //Kod kalabalığı olmaması için isteklere cevap gönderen fonksiyonları ayrı        dosyalarda tanımladık.
  switch (req.method) {
    case "GET":
      return getRequest(req, res);
    case "POST":
      return postRequest(req, res);
    case "DELETE":
      return deleteRequest(req, res);

      case "OPTIONS":
        return optionsRequest(req, res);

    default:
      return defaultRequset(req, res);
  }
});

//! 2-) BELİRLİ BİR PORTA GELEN İSTEKLERİ DİNLE
const port = 6154;

server.listen(port, () => {
  console.log(`🎶🥰  Server ${port} gelen istekleri dinlemeye başladı.`);
});
